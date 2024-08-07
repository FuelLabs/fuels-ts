import { safeExec } from '../../test-utils';

import { readForcToml } from './forcUtils';

/**
 * @group node
 */
describe('forcUtils', () => {
  test('should throw if TOML file is not found', async () => {
    const tomlPath = '/non/existent/path';
    const errorMsg = `TOML file not found:\n  ${tomlPath}/Forc.toml`;
    const { error, result } = await safeExec(() => readForcToml(tomlPath));
    expect(error?.message).toEqual(errorMsg);
    expect(result).not.toBeTruthy();
  });
});
