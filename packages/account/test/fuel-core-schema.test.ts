import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';
import type { BinaryToTextEncoding } from 'crypto';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { setupTestProviderAndWallets } from '../src/test-utils';

const FUEL_CORE_SCHEMA_FILE_PATH = 'packages/account/src/providers/fuel-core-schema.graphql';
const FUEL_CORE_SCHEMA_SYNC_COMMAND = 'pnpm --filter @fuel-ts/account build:schema';

function generateChecksum(
  utf8: Buffer,
  algorithm: string = 'md5',
  encoding: BinaryToTextEncoding = 'hex'
) {
  return createHash(algorithm || 'md5')
    .update(utf8.toString(), 'utf8')
    .digest(encoding || 'hex');
}

/**
 * @group node
 */
describe('fuel-core-schema.graphql', () => {
  let destroy: () => void;

  beforeEach(async () => {
    const { cleanup } = await setupTestProviderAndWallets({
      nodeOptions: {
        port: '4000',
      },
    });
    destroy = cleanup;
  });

  afterEach(() => {
    destroy();
  });

  it('should not change on schema build', async () => {
    const preSyncChecksum = await readFile(FUEL_CORE_SCHEMA_FILE_PATH).then(generateChecksum);

    await safeExec(() => execSync(FUEL_CORE_SCHEMA_SYNC_COMMAND));

    const postSyncChecksum = await readFile(FUEL_CORE_SCHEMA_FILE_PATH).then(generateChecksum);

    expect(
      preSyncChecksum,
      `\nThe schema at ${FUEL_CORE_SCHEMA_FILE_PATH} is not in sync with fuel-core.\n\nRun '${FUEL_CORE_SCHEMA_SYNC_COMMAND}' to update it.\n\n`
    ).toEqual(postSyncChecksum);
  });
});
