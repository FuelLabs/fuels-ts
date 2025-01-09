import { defaultConsensusKey } from '@fuel-ts/utils';

import { launchNode } from '../../../test-utils';
import type { FuelsConfig } from '../../types';
import { log, loggingConfig } from '../../utils/logger';

export type FuelCoreNode = {
  bindIp: string;
  accessIp: string;
  port: number;
  providerUrl: string;
  snapshotDir: string;
  killChildProcess: () => void;
};

export const autoStartFuelCore = async (config: FuelsConfig) => {
  let fuelCore: FuelCoreNode | undefined;

  if (config.autoStartFuelCore) {
    log(`Starting node using: '${config.fuelCorePath}'`);

    const bindIp = '0.0.0.0';
    const accessIp = '127.0.0.1';

    const port = config.fuelCorePort ?? 0;

    const {
      cleanup,
      url: providerUrl,
      snapshotDir,
    } = await launchNode({
      args: [
        ['--snapshot', config.snapshotDir],
        ['--db-type', 'in-memory'],
      ].flat() as string[],
      ip: bindIp,
      port: port.toString(),
      loggingEnabled: loggingConfig.isLoggingEnabled,
      basePath: config.basePath,
      fuelCorePath: config.fuelCorePath,
      includeInitialState: true,
      killProcessOnExit: true,
    });

    fuelCore = {
      bindIp,
      accessIp,
      port,
      providerUrl,
      snapshotDir,
      killChildProcess: cleanup,
    };

    // eslint-disable-next-line no-param-reassign
    config.providerUrl = fuelCore.providerUrl;
    // eslint-disable-next-line no-param-reassign
    config.privateKey = defaultConsensusKey;
  }

  return fuelCore;
};
