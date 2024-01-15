import { defaultChainConfig, defaultConsensusKey } from '@fuel-ts/utils';
import { launchNode } from '@fuel-ts/wallet/test-utils';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { getPortPromise } from 'portfinder';

import type { FuelsConfig } from '../../types';
import { getBinarySource } from '../../utils/getBinarySource';
import { log, loggingConfig } from '../../utils/logger';

export type FuelCoreNode = {
  bindIp: string;
  accessIp: string;
  port: number;
  providerUrl: string;
  chainConfig: string;
  killChildProcess: () => void;
};

export type KillNodeParams = {
  core: ChildProcessWithoutNullStreams;
  killFn: (pid: number) => void;
  state: {
    isDead: boolean;
  };
};

export const createTempChainConfig = (coreDir: string) => {
  const chainConfigPath = join(coreDir, 'chainConfig.json');
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);
  mkdirSync(dirname(chainConfigPath), { recursive: true });
  writeFileSync(chainConfigPath, chainConfigJson);
  return chainConfigPath;
};

export const autoStartFuelCore = async (config: FuelsConfig) => {
  let fuelCore: FuelCoreNode | undefined;

  if (config.autoStartFuelCore) {
    log(`Starting ${getBinarySource(config.useBuiltinFuelCore)} 'fuel-core' node..`);

    const coreDir = join(config.basePath, '.fuels');

    const bindIp = '0.0.0.0';
    const accessIp = '127.0.0.1';

    const chainConfig = config.chainConfig ?? createTempChainConfig(coreDir);
    const port = config.fuelCorePort ?? (await getPortPromise({ port: 4000 }));

    const providerUrl = `http://${accessIp}:${port}/graphql`;

    const { cleanup } = await launchNode({
      chainConfigPath: chainConfig,
      consensusKey: defaultConsensusKey,
      ip: bindIp,
      port: port.toString(),
      loggingEnabled: loggingConfig.isLoggingEnabled,
      debugEnabled: loggingConfig.isDebugEnabled,
      useInMemoryDb: false,
      basePath: config.basePath,
      useSystemFuelCore: !config.useBuiltinFuelCore,
    });

    const fuelCoreNode = {
      bindIp,
      accessIp,
      port,
      providerUrl,
      chainConfig,
      killChildProcess: cleanup,
    };

    fuelCore = fuelCoreNode;

    // eslint-disable-next-line no-param-reassign
    config.providerUrl = fuelCore.providerUrl;
    // eslint-disable-next-line no-param-reassign
    config.privateKey = defaultConsensusKey;
  }

  return fuelCore;
};
