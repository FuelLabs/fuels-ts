import { existsSync, readFileSync } from 'fs';

import { clean, contractsJsonPath, runBuild, runDeploy, runInit } from '../utils/runCommands';

describe('deploy', () => {
  beforeEach(clean);
  afterAll(clean);

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
