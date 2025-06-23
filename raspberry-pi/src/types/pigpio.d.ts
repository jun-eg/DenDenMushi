declare module "pigpio" {
  export interface GpioOptions {
    mode?: number;
    pullUpDown?: number;
    edge?: number;
  }

  export class Gpio {
    static readonly INPUT: number;
    static readonly OUTPUT: number;
    static readonly PUD_UP: number;
    static readonly PUD_DOWN: number;
    static readonly PUD_OFF: number;
    static readonly RISING_EDGE: number;
    static readonly FALLING_EDGE: number;
    static readonly EITHER_EDGE: number;

    constructor(gpio: number, options?: GpioOptions);
    
    on(event: 'interrupt', listener: (level: number, tick: number) => void): this;
    removeAllListeners(): this;
    digitalRead(): number;
    digitalWrite(level: number): void;
    mode(): number;
    mode(mode: number): void;
  }

  export function initialize(): void;
  export function terminate(): void;
}