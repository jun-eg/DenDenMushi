import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
import record from "node-record-lpcm16";
import portAudio from "naudiodon";
import wrtc from "wrtc";

const SIGNALING_URL = process.env.SIGNALING_URL ?? "http://localhost:5000";
const ID = process.env.ID ?? uuidv4();
const TARGET = process.env.TARGET;

if (!TARGET) {
  console.error("TARGET environment variable is required");
  process.exit(1);
}

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

peer.on("signal", (data: any) => {
  socket.emit("signal", { target: TARGET, type: "signal", payload: data });
});

const audioOut = new portAudio.AudioIO({
  outOptions: {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 48000,
    deviceId: -1,
  },
});

audioOut.start();

peer.on("connect", () => {
  console.log("peer connection established");
  const mic = record.start({ sampleRate: 48000, channels: 1, thresholdStart: 0 });
  mic.on("data", (chunk: Buffer) => peer.send(chunk));
});

peer.on("data", (data: Buffer) => {
  audioOut.write(data);
});

