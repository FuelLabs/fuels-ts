import { safeExec } from '@fuel-ts/errors/test-utils';
import { readFileSync } from 'fs';

import {
  clean,
  runInit,
  fixturesDir,
  fuelsConfigPath,
  initFlagsUseBuiltinBinaries,
  generatedDir,
  initFlagsWorkspace,
} from '../../../test/utils/runCommands';
import * as shouldUseBuiltinForcMod from '../commands/init/shouldUseBuiltinForc';
import * as shouldUseBuiltinFuelCoreMod from '../commands/init/shouldUseBuiltinFuelCore';

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

  test(`should auto start fuel core explicitly`, async () => {
    await runInit(
      [initFlagsWorkspace, initFlagsUseBuiltinBinaries, '--auto-start-fuel-core'].flat()
    );

    const config = await loadConfig(fixturesDir);
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');

    expect(fuelsContents).toMatch(`  autoStartFuelCore: true,`); // not comment
    expect(config.autoStartFuelCore).toEqual(true);
  });

  test(`should resolve individually paths when not using workspaces`, async () => {
    await runInit(
      [
        initFlagsUseBuiltinBinaries,
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

  test(`should resolve only contracts`, async () => {
    await runInit(
      [
        initFlagsUseBuiltinBinaries,
        ['--contracts', 'project/contracts/*'],
        ['-o', generatedDir],
      ].flat()
    );

    const config = await loadConfig(fixturesDir);

    expect(config.contracts.length).toEqual(2);
    expect(config.scripts.length).toEqual(0);
    expect(config.predicates.length).toEqual(0);
  });

  test(`should resolve only scripts`, async () => {
    await runInit(
      [initFlagsUseBuiltinBinaries, ['--scripts', 'project/scripts/*'], ['-o', generatedDir]].flat()
    );

    const config = await loadConfig(fixturesDir);

    expect(config.contracts.length).toEqual(0);
    expect(config.scripts.length).toEqual(1);
    expect(config.predicates.length).toEqual(0);
  });

  test(`should resolve only predicates`, async () => {
    await runInit(
      [
        initFlagsUseBuiltinBinaries,
        ['--predicates', 'project/predicates/*'],
        ['-o', generatedDir],
      ].flat()
    );

    const config = await loadConfig(fixturesDir);

    expect(config.contracts.length).toEqual(0);
    expect(config.scripts.length).toEqual(0);
    expect(config.predicates.length).toEqual(1);
  });

  test(`should smart-set built-in flags`, async () => {
    await runInit(
      [
        ['--predicates', 'project/predicates/*'],
        ['-o', generatedDir],
      ].flat()
    );

    const shouldUseBuiltinForc = jest
      .spyOn(shouldUseBuiltinForcMod, 'shouldUseBuiltinForc')
      .mockImplementation();

    const shouldUseBuiltinFuelCore = jest
      .spyOn(shouldUseBuiltinFuelCoreMod, 'shouldUseBuiltinFuelCore')
      .mockImplementation();

    const config = await loadConfig(fixturesDir);

    expect(config.contracts.length).toEqual(0);
    expect(config.scripts.length).toEqual(0);
    expect(config.predicates.length).toEqual(1);

    expect(shouldUseBuiltinForc).toHaveBeenCalledTimes(1);
    expect(shouldUseBuiltinFuelCore).toHaveBeenCalledTimes(1);
  });
});
