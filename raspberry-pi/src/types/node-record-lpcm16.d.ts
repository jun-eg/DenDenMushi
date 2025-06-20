declare module "node-record-lpcm16" {
  import { EventEmitter } from "events";
  interface RecordOptions {
    sampleRate?: number;
    channels?: number;
    thresholdStart?: number;
    thresholdEnd?: number;
    silence?: string;
    device?: string;
    endOnSilence?: boolean;
    recorder?: string;
    audioType?: string;
    verbose?: boolean;
  }
  interface Record {
    start(options?: RecordOptions): EventEmitter;
    stop(): void;
  }
  const record: Record;
  export = record;
}