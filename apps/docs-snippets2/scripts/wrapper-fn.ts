/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-global-assign */

export const main = async (url?: string): Promise<any | any[]> => {
  const logs: any[] = [];
  console = {
    ...console,
    log: (...args: any[]) => logs.push(args),
  };
  if (url) {
    const LOCAL_NETWORK_URL = url;
  }
  // ———>>>
  // %SNIPPET%
  // <<<———
  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
};
