import { sleep } from '@fuel-ts/utils';
import type { Command, OptionValues } from 'commander';
import os from 'os';

import { error, log } from '../../utils/logger';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';

const startNodeWithoutConfig = async (options: OptionValues) => {
  const { fuelCorePort, fuelCorePath } = options;

  return autoStartFuelCore({
    // This will be overridden by the `autoStartFuelCore` function
    providerUrl: 'http://localhost:4000/v1/graphql',
    // We always want to start the node
    autoStartFuelCore: true,
    // Stores the node data in a temporary directory
    basePath: os.tmpdir(),
    // These options can be overridden
    fuelCorePath: fuelCorePath ?? 'fuel-core',
    fuelCorePort: fuelCorePort ?? undefined,
  });
};

export const node = async (program: Command) => {
  const options = program.opts();

  try {
    const fuelCore = await startNodeWithoutConfig(options);
    if (!fuelCore) {
      throw new Error('Failed to start fuel-core');
    }

    // Sleep to ensure the message is logged at the end of the fuel-core output
    await sleep(100);

    log(`Started fuel core on ${fuelCore.providerUrl}`);
  } catch (err: unknown) {
    error((err as Error).message);
    throw err;
  }
};
