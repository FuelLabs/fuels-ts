import { writeFileSync } from 'fs';

import { createConfig } from '../src';

export default createConfig({
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
    writeFileSync('./contracts.json', JSON.stringify(event));
  },
});
