import { createConfig } from 'fuels';

export default createConfig({
  contracts: [
        'sway-contracts',
  ],
  output: './src/sway-api',
});

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/guide/cli/config-file
 */
