import { existsSync, readFileSync } from 'fs';

import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { contractsJsonPath, runBuild, runDeploy, runInit } from '../utils/runCommands';

describe('deploy', () => {
  beforeEach(resetDiskAndMocks);
  afterEach(resetDiskAndMocks);

  it('should run `deploy` command', async () => {
    await runInit();
    await runBuild();
    await runDeploy();

    expect(existsSync(contractsJsonPath)).toBeTruthy();

    const fuelsContents = JSON.parse(readFileSync(contractsJsonPath, 'utf-8'));
    expect(fuelsContents.barFoo).toMatch(/0x/);
    expect(fuelsContents.fooBar).toMatch(/0x/);
  });
});
