import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';
import type { BinaryToTextEncoding } from 'crypto';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

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

describe('fuel-core-schema.graphql', () => {
  it('should not change on schema build', async () => {
    const preSyncSchema = await readFile(FUEL_CORE_SCHEMA_FILE_PATH);

    await safeExec(() => execSync(FUEL_CORE_SCHEMA_SYNC_COMMAND));

    const postSyncSchema = await readFile(FUEL_CORE_SCHEMA_FILE_PATH);

    expect(preSyncSchema.toString()).toEqual(postSyncSchema.toString());
  });
});
