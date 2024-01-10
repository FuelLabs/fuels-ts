import { hexlify } from 'ethers';

import faucets from './.fuel-core/configs/faucets.json';

/**
 * Gets the private key for the current Vitest worker.
 *
 * The PK is basically the current worker's ID. This allows us to
 * have a unique faucet wallet for each file being tested and prevents
 * tests from trying to access to the same coins and fail.
 *
 * Both `faucets.json` and `initial_state.coins` in `chainConfig.json`
 * were manually generated to support at most 16 workers.
 *
 * For each wallet in `faucets.json`, there are three coins for each
 * of the following Asset IDs:
 *   - 0x0000000000000000000000000000000000000000000000000000000000000000
 *   - 0x0101010101010101010101010101010101010101010101010101010101010101
 *   - 0x0202020202020202020202020202020202020202020202020202020202020202
 *
 * See: https://vitest.dev/config/#setupfiles
 */
const getPrivateKeyForCurrentWorker = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const workerId = Number.parseInt(process.env.VITEST_POOL_ID!, 10) || 1;

  if (workerId > faucets.length) {
    throw new Error(`At most ${faucets.length} workers are supported.`);
  }

  const privateKey = hexlify(Uint8Array.from([workerId]));
  return privateKey;
};

process.env.GENESIS_SECRET =
  process.env.FUEL_NETWORK_GENESIS_KEY || getPrivateKeyForCurrentWorker();
