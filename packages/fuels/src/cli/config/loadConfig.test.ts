import { safeExec } from '@fuel-ts/errors/test-utils';
import { readFileSync } from 'fs';

import { resetDiskAndMocks } from '../../../test/utils/resetDiskAndMocks';
import {
  runInit,
  fixturesDir,
  fuelsConfigPath,
  initFlagsUseBuiltinBinaries,
  generatedDir,
  initFlagsWorkspace,
} from '../../../test/utils/runCommands';
import * as shouldUseBuiltinForcMod from '../commands/init/shouldUseBuiltinForc';
import * as shouldUseBuiltinFuelCoreMod from '../commands/init/shouldUseBuiltinFuelCore';
import type { FuelsConfig } from '../types';

import { loadConfig } from './loadConfig';

describe('loadConfig', () => {
  beforeEach(resetDiskAndMocks);

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

  test(`should resolve individual paths when not using workspaces`, async () => {
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

  test(`should warn about misconfigured workspace`, async () => {
    await runInit(
      [
        initFlagsUseBuiltinBinaries,
        // passing contract path in workspace config option
        ['--workspace', 'project/contracts/bar'],
        ['--output', generatedDir],
      ].flat()
    );

    const { error, result } = await safeExec<Promise<FuelsConfig>>(() => loadConfig(fixturesDir));

    expect(result).not.toBeTruthy();
    expect(error?.message).toMatch(/forc workspace not detected/i);
    expect(error?.message).toMatch(/try using 'contracts'/i);
  });

  test(`should smart-set built-in flags`, async () => {
    await runInit(initFlagsWorkspace);

    const shouldUseBuiltinForc = vi
      .spyOn(shouldUseBuiltinForcMod, 'shouldUseBuiltinForc')
      .mockReturnValue(false);

    const shouldUseBuiltinFuelCore = vi
      .spyOn(shouldUseBuiltinFuelCoreMod, 'shouldUseBuiltinFuelCore')
      .mockReturnValue(true);

    const config = await loadConfig(fixturesDir);

    expect(config.useBuiltinForc).toEqual(false);
    expect(config.useBuiltinFuelCore).toEqual(true);

    expect(shouldUseBuiltinForc).toHaveBeenCalledTimes(1);
    expect(shouldUseBuiltinFuelCore).toHaveBeenCalledTimes(1);
  });
});
