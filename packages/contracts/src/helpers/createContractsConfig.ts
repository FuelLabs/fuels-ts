import { writeFileSync } from 'fs';
import { join } from 'path';

import { log, logSection } from '../log';
import type { ContractsConfig, Event } from '../types';

export const createContractsConfig = (event: Event, config: ContractsConfig) => {
  if (event.type === 'deploy' || event.type === 'run') {
    logSection('🟦 Save contract ids...');
    const configPath = join(config.types.output, 'contracts.json');
    log('save file at:');
    log(configPath);
    const contractsConfig: { [key: string]: string } = {};
    event.data.forEach(({ name, contractId }) => {
      contractsConfig[name] = contractId;
    });
    writeFileSync(configPath, JSON.stringify(contractsConfig, null, 2));
  }
};
