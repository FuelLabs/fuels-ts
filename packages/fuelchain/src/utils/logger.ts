/* eslint-disable @typescript-eslint/no-explicit-any */
export class Logger {
  log(...args: any[]) {
    if (!(global as any).IS_CLI) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log(...args);
  }

  warn(...args: any[]) {
    if (!(global as any).IS_CLI) {
      return;
    }
    // eslint-disable-next-line no-console
    console.warn(...args);
  }

  error(...args: any[]) {
    if (!(global as any).IS_CLI) {
      return;
    }
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

export const logger = new Logger();
