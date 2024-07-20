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

  // TEST NODE LAUNCHER ———>>>
  // %NODE_LAUNCHER%
  // <<<——— TEST NODE LAUNCHER

  try {
    // SNIPPET ———>>>
    // %SNIPPET%
    // <<<——— SNIPPET
  } catch (error) {
    console.error(error);
    return { error };
  }

  // eslint-disable-next-line no-global-assign
  console = bkpConsole;

  return logs;
};
