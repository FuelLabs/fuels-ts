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

export const killNode = (params: KillNodeParams) => () => {
  const { core, state, killFn } = params;
  if (core.pid && !state.isDead) {
    state.isDead = true;
    killFn(Number(core.pid));
  }
};

export const createTempChainConfig = (coreDir: string) => {
  const chainConfigPath = join(coreDir, 'chainConfig.json');
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);
  mkdirSync(dirname(chainConfigPath), { recursive: true });
  writeFileSync(chainConfigPath, chainConfigJson);
  return chainConfigPath;
};

export const startFuelCore = async (config: FuelsConfig): Promise<FuelCoreNode> => {
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

  return {
    bindIp,
    accessIp,
    port,
    providerUrl,
    chainConfig,
    killChildProcess: cleanup,
  };
};
