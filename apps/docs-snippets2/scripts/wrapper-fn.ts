/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/require-await
export const main = async (passLogsThrough: boolean = false): Promise<any | any[]> => {
  const logs: any[] = [];
  const bkpConsole = console;

  // eslint-disable-next-line no-global-assign
  console = {
    ...console,
    log: (...args: any[]) => {
      if (passLogsThrough) {
        bkpConsole.log.apply(null, args);
      }
      logs.push(args);
    },
  };

  // ———>>>
  // %NODE_LAUNCHER%
  // <<<———

  try {
    // ———>>>
    // %SNIPPET%
    // <<<———
  } catch (error) {
    console.error(error);
    return { error };
  }

  // eslint-disable-next-line no-global-assign
  console = bkpConsole;

  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
};
