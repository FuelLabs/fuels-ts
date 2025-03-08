import { execSync } from 'child_process';
import { join } from 'path';

import { setupTestProviderAndWallets } from '../src/test-utils/setup-test-provider-and-wallets';

const { error } = console;

const main = async () => {
  process.env.FUEL_CORE_PATH = 'fuels-core';
  using launched = await setupTestProviderAndWallets();

  const schemaPath = join(__dirname, '..', 'src/providers/fuel-core-schema.graphql');

  execSync(
    `pnpm get-graphql-schema ${launched.provider.url} > ${schemaPath} && prettier --write ${schemaPath}`
  );
};

main().catch(error);
