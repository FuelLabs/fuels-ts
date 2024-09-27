import { execSync } from "child_process";
import { join } from "path";

import { setupTestProviderAndWallets } from "../src/test-utils/setup-test-provider-and-wallets";

using launched = await setupTestProviderAndWallets();

const accountPackageDir = join(process.cwd(), "packages/account");
const schemaPath = join(
  accountPackageDir,
  "src/providers/fuel-core-schema.graphql",
);
execSync(
  `cd ${accountPackageDir} && pnpm get-graphql-schema ${launched.provider.url} > ${schemaPath} && prettier --write ${schemaPath}`,
);
