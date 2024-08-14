import { execSync } from 'child_process';
import { error, log } from 'console';

import { launchNode } from '../src/test-utils/launchNode';

const schemaSync = async () => {
  const { url, cleanup } = await launchNode({
    loggingEnabled: false,
  });

  const commands = [
    `get-graphql-schema ${url} > src/providers/fuel-core-schema.graphql`,
    `prettier --write src/providers/fuel-core-schema.graphql`,
  ];

  execSync(commands.join(' && '));

  cleanup();
};

schemaSync()
  .then(() => log('fuel-core schema synced successfully'))
  .catch(error);
