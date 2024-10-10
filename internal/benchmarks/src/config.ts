/* eslint-disable import/no-extraneous-dependencies */

import { bench } from 'vitest';

export const isDevnet = process.env.DEVNET_WALLET_PVT_KEY !== undefined;

const iterations = isDevnet ? 1 : 20;

export const runBenchmark = (name: string, benchmarkFn: () => Promise<void>) => {
  bench(
    isDevnet ? name : `${name} (x${iterations} times)`,
    async () => {
      await benchmarkFn();
    },
    { iterations }
  );
};
