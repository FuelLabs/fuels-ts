import { safeExec } from '@fuel-ts/errors/test-utils';

import { readForcToml } from './forcUtils';

describe('forcUtils', () => {
  test('should throw if Toml file is not found', async () => {
    const tomlPath = '/non/existent/path';
    const errorMsg = `Workspace not configured, toml file not found: \n - ${tomlPath}/Forc.toml`;
    const { error, result } = await safeExec(() => readForcToml(tomlPath));
    expect(error?.message).toEqual(errorMsg);
    expect(result).not.toBeTruthy();
  });
});
