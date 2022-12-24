import { writeFileSync } from 'fs';
import { join } from 'path';

import { createConfig } from '../src';

export default createConfig({
  privateKey: process.env.PRIVATE_KEY,
  deployConfig: {
    gasPrice: 1,
  },
  contracts: [
    {
      name: 'CONTRACT_FOO',
      path: './contracts/foo',
    },
    {
      name: 'CONTRACT_BAR',
      path: './contracts/bar',
    },
  ],
  types: {
    output: './types',
  },
  onSuccess: (event) => {
    if (event.type === 'deploy' || event.type === 'run') {
      const filePath = join(event.path.config, './contracts.json');
      const appConfig = event.data.reduce(
        (config, { name, contractId }) => ({
          ...config,
          [name]: contractId,
        }),
        {}
      );
      writeFileSync(filePath, JSON.stringify(appConfig, null, 2));
    }
  },
});
