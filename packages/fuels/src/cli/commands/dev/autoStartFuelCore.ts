import { launchNode } from '@fuel-ts/account/test-utils';
import { defaultConsensusKey } from '@fuel-ts/utils';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { getPortPromise } from 'portfinder';

import type { FuelsConfig } from '../../types';
import { getBinarySource } from '../../utils/getBinarySource';
import { log, loggingConfig } from '../../utils/logger';

export type FuelCoreNode = {
  bindIp: string;
  accessIp: string;
  port: number;
  providerUrl: string;
  chainConfigPath: string;
  killChildProcess: () => void;
};

export type KillNodeParams = {
  core: ChildProcessWithoutNullStreams;
  killFn: (pid: number) => void;
  state: {
    isDead: boolean;
  };
};

export const autoStartFuelCore = async (config: FuelsConfig) => {
  let fuelCore: FuelCoreNode | undefined;

  if (config.autoStartFuelCore) {
    log(`Starting ${getBinarySource(config.useBuiltinFuelCore)} 'fuel-core' node..`);

    const bindIp = '0.0.0.0';
    const accessIp = '127.0.0.1';

    const port = config.fuelCorePort ?? (await getPortPromise({ port: 4000 }));

    const providerUrl = `http://${accessIp}:${port}/v1/graphql`;

    const { cleanup, chainConfigPath } = await launchNode({
      args: [
        ['--snapshot', config.chainConfig],
        ['--db-type', 'rocks-db'],
      ].flat() as string[],
      ip: bindIp,
      port: port.toString(),
      loggingEnabled: loggingConfig.isLoggingEnabled,
      debugEnabled: loggingConfig.isDebugEnabled,
      basePath: config.basePath,
      useSystemFuelCore: !config.useBuiltinFuelCore,
    });

    fuelCore = {
      bindIp,
      accessIp,
      port,
      providerUrl,
      chainConfigPath,
      killChildProcess: cleanup,
    };

    // eslint-disable-next-line no-param-reassign
    config.providerUrl = fuelCore.providerUrl;
    // eslint-disable-next-line no-param-reassign
    config.privateKey = defaultConsensusKey;
  }

  return fuelCore;
};
