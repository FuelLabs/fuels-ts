/* eslint-disable @typescript-eslint/no-explicit-any */

export const main = async (localNetworkUrl?: string): Promise<any | any[]> => {
  const logs: any[] = [];
  // eslint-disable-next-line no-global-assign
  console = {
    ...console,
    log: (...args: any[]) => logs.push(args),
  };
  if (localNetworkUrl) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const LOCAL_NETWORK_URL = localNetworkUrl;
  }
  // ———>>>
  // %SNIPPET%
  // <<<———
  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
};
