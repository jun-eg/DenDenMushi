import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
import record from "node-record-lpcm16";
import { spawn } from "child_process";
import wrtc from "wrtc";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pigpioClient = require('pigpio-client');

let connected = false;
let debounceLock = false;
let pi: any = null;
let gpio18: any = null;

const SIGNALING_URL = process.env.SIGNALING_URL ?? "http://localhost:5000";
const ID = process.env.ID ?? uuidv4();
const TARGET = process.env.TARGET;

if (!TARGET) {
  console.error("TARGET environment variable is required");
  process.exit(1);
}

async function initGPIO() {
  try {
    pi = pigpioClient.pigpio();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const gpio18Pin = pi.gpio(18);
    await gpio18Pin.modeSet('input'); 
    await gpio18Pin.pullUpDown(2); 
    console.log("GPIO 18 initialized with pigpio-client");
    
    await pi.startNotifications();
    
    gpio18Pin.notify((level: number, tick: number) => {
      if (level === 0 && !debounceLock) { 
        if (!connected) {
          connected = true;
          debounceLock = true;
          console.log("接続を開始します...");
          connect();
        } else {
          connected = false;
          debounceLock = true;
          disconnect();
        }
        
        setTimeout(() => {
          debounceLock = false;
        }, 3000); 
      } 
    });
    
    gpio18 = gpio18Pin;
    
  } catch (error) {
    console.error("GPIO initialization failed:", error);
    console.error("Available methods:", Object.keys(pigpioClient));
    if (pi) {
      console.error("Pi object methods:", Object.keys(pi));
    }
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
    console.log(`サーバに接続完了(ID: ${ID})`);
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
    console.log("P2P音声通話が開始!");
    const recording = record.record({ sampleRate: 48000, channels: 1, thresholdStart: 0,device: 'plughw:3,0' });
    recording.stream().on('data', (chunk) => peer.send(chunk)).on('error', (err) => {
    console.error('録音エラー:', err);});
  });

  peer.on("data", (data: Buffer) => {
    aplay.stdin.write(data);
  });

  peer.on("close", () => {
    console.log("p2p接続が切断されました");
    aplay.stdin.end();
  });
};

const disconnect = () => {
  console.log("サーバー切断完了");
};

process.on('SIGINT', async () => {
  if (pi) {
    await pi.stopNotifications();
    await pi.destroy();
  }
  process.exit();
});

initGPIO().then(() => {
 console.log("ボタンを押すと接続/切断を切り替えられます");
  console.log(`サーバー: ${SIGNALING_URL}`);
  console.log(`ID: ${ID}`);
  console.log(`TARGET: ${TARGET}`);
  console.log("---");
  console.log("現在の状態: 待機中");
});


