import { writeFileSync } from 'fs';
import { join } from 'path';

import type { ContractsConfig, Event } from '../types';

export const createContractsConfig = (event: Event, config: ContractsConfig) => {
  if (event.type === 'deploy' || event.type === 'run') {
    const configPath = join(config.types.output, 'contracts.ts');
    const contractsConfig: { [key: string]: string } = {};
    const appConfig = event.data.forEach(({ name, contractId }) => {
      contractsConfig[name] = contractId;
    });
    writeFileSync(configPath, JSON.stringify(appConfig, null, 2));
  }
};
