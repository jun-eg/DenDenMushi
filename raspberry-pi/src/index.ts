import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
import record from "node-record-lpcm16";
import { spawn } from "child_process";
import wrtc from "wrtc";
import { requestGPIOAccess } from "node-web-gpio";

let connected = false;
let gpioAccess: any = null;
let port17: any = null;

const SIGNALING_URL = process.env.SIGNALING_URL ?? "http://localhost:5000";
const ID = process.env.ID ?? uuidv4();
const TARGET = process.env.TARGET;

if (!TARGET) {
  console.error("TARGET environment variable is required");
  process.exit(1);
}

// GPIO初期化
async function initGPIO() {
  try {
    gpioAccess = await requestGPIOAccess();
    port17 = gpioAccess.ports.get(17);
    await port17.export("in");
    
    console.log("GPIO 17 initialized");
    
    // ボタン押下のイベントリスナー
    port17.onchange = (event: any) => {
      if (event.value === 1 && !connected) { // ボタンが押された
        connected = true;
        console.log("Button pressed, starting signaling...");
        connect();
      }
    };
  } catch (error) {
    console.error("GPIO initialization failed:", error);
    process.exit(1);
  }
}

const connect = () => {
  const socket = io(SIGNALING_URL);

  const peer = new SimplePeer({
    initiator: ID === "ras-1",
    trickle: false,
    wrtc,
  });

  socket.on("connect", () => {
    console.log(`connected to signaling server as ${ID}`);
    socket.emit("register", { id: ID });
  });

  socket.on("signal", (msg: { from: string; payload: any }) => {
    if (msg.from === TARGET) {
      peer.signal(msg.payload);
    }
  });

  peer.on("signal", (data: RTCSessionDescriptionInit | RTCIceCandidateInit) => {
    socket.emit("signal", { target: TARGET, type: "signal", payload: data });
  });

  const aplay = spawn("aplay", ["-f", "S16_LE", "-r", "48000", "-c", "1"]);

  peer.on("connect", () => {
    console.log("peer connection established");
    const recording = record.record({ sampleRate: 48000, channels: 1, thresholdStart: 0 });
    recording.stream().on('data', (chunk: Buffer) => peer.send(chunk));
  });

  peer.on("data", (data: Buffer) => {
    aplay.stdin.write(data);
  });

  peer.on("close", () => {
    aplay.stdin.end();
  });
};

// プロセス終了時のクリーンアップ
process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  if (port17) {
    await port17.unexport();
  }
  process.exit();
});

// GPIO初期化を実行
initGPIO().then(() => {
  console.log("Ready! Press the button to start signaling...");
});


