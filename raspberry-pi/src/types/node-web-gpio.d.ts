declare module "node-web-gpio" {
  interface GPIOPort {
    export(direction: "in" | "out"): Promise<void>;
    unexport(): Promise<void>;
    read(): Promise<number>;
    write(value: number): Promise<void>;
    onchange: ((event: { value: number }) => void) | null;
  }

  interface GPIOAccess {
    ports: Map<number, GPIOPort>;
  }

  export function requestGPIOAccess(): Promise<GPIOAccess>;
}