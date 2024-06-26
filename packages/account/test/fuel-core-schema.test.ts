import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';
import { readFile } from 'fs/promises';

const FUEL_CORE_SCHEMA_FILE_PATH = 'packages/account/src/providers/fuel-core-schema.graphql';
const FUEL_CORE_SCHEMA_SYNC_COMMAND = 'pnpm --filter @fuel-ts/account build:schema';

describe('fuel-core-schema.graphql', () => {
  it('should not change on schema build', async () => {
    const preSyncSchema = await readFile(FUEL_CORE_SCHEMA_FILE_PATH);

    await safeExec(() => execSync(FUEL_CORE_SCHEMA_SYNC_COMMAND));

    const postSyncSchema = await readFile(FUEL_CORE_SCHEMA_FILE_PATH);

    expect(preSyncSchema.toString()).toEqual(postSyncSchema.toString());
  });
});
