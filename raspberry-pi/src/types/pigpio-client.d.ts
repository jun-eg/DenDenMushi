declare module "pigpio-client" {
  export interface PigpioClient {
    INPUT: number;
    OUTPUT: number;
    PUD_UP: number;
    PUD_DOWN: number;
    PUD_OFF: number;
    RISING_EDGE: number;
    FALLING_EDGE: number;
    EITHER_EDGE: number;

    setMode(gpio: number, mode: number): Promise<void>;
    setPullUpDown(gpio: number, pud: number): Promise<void>;
    callback(gpio: number, edge: number): Promise<any>;
    destroy(): Promise<void>;
  }

  export interface PigpioClientModule {
    connect(host?: string, port?: number): PigpioClient;
  }

  const pigpioClient: PigpioClientModule;
  export default pigpioClient;
}