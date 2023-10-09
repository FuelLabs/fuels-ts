import { safeExec } from '@fuel-ts/errors/test-utils';
import { readFileSync } from 'fs';
import { join, relative } from 'path';

import {
  clean,
  runInit,
  fixturesDir,
  fuelsConfigPath,
  initFlagsUseBuiltinBinaries,
  generatedDir,
  workspaceDir,
} from '../../../test/utils/runCommands';

import { loadConfig } from './loadConfig';

describe('loadConfig', () => {
  beforeEach(clean);

  test('should throw if config path is not found', async () => {
    const cwd = '/non/existent/path';
    const errorMsg = `Config file not found!`;
    const { error, result } = await safeExec(() => loadConfig(cwd));
    expect(error?.message).toEqual(errorMsg);
    expect(result).not.toBeTruthy();
  });

  test(`should auto start fuel core by default`, async () => {
    await runInit(initFlagsUseBuiltinBinaries);

    const config = await loadConfig(fixturesDir);
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');

    expect(fuelsContents).toMatch(`  // autoStartFuelCore: true,`); // comment
    expect(config.autoStartFuelCore).toEqual(true);
  });

  test(`should auto start fuel core explicitly`, async () => {
    await runInit([initFlagsUseBuiltinBinaries, '--auto-start-fuel-core'].flat());

    const config = await loadConfig(fixturesDir);
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');

    expect(fuelsContents).toMatch(`  autoStartFuelCore: true,`); // not comment
    expect(config.autoStartFuelCore).toEqual(true);
  });

  test(`should resolve individually paths when not using workspaces`, async () => {
    await runInit(
      [
        ['--contracts', 'project/contracts/*'],
        ['--scripts', 'project/scripts/*'],
        ['--predicates', 'project/predicates/*'],
        ['-o', generatedDir],
      ].flat()
    );

    const config = await loadConfig(fixturesDir);

    expect(config.contracts.length).toEqual(2);
    expect(config.scripts.length).toEqual(1);
    expect(config.predicates.length).toEqual(1);
  });
});
