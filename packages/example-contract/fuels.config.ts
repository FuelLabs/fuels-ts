// On production is possible to import createContractsConfig from fuels
// and use it instead of using the type ContractsConfig
// import { createContractsConfig } from 'fuels';

// On development is necessary to import the type instead of the function
// createContractsConfig because inside workpace using the function
// will import TypeScript files inside the execution environment
import type { FuelsConfig } from 'fuels';

const config: FuelsConfig = {
  privateKey: '0x01',
  providerUrl: 'http://localhost:4000/graphql',
  deployConfig: {
    gasPrice: 1,
  },
  contracts: ['./contract'],
  output: './src/types',
};

export default config;
