import { safeExec } from '@fuel-ts/errors/test-utils';
import { readFileSync } from 'fs';

import {
  runInit,
  fixtures,
  flagsUseBuiltinBinaries,
  clean,
  fuelsConfig,
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
    await runInit(flagsUseBuiltinBinaries);

    const config = await loadConfig(fixtures);
    const fuelsContents = readFileSync(fuelsConfig, 'utf-8');

    expect(fuelsContents).toMatch(`  // autoStartFuelCore: true,`); // comment
    expect(config.autoStartFuelCore).toEqual(true);
  });

  test(`should auto start fuel core explicitly`, async () => {
    await runInit([flagsUseBuiltinBinaries, '--auto-start-fuel-core'].flat());

    const config = await loadConfig(fixtures);
    const fuelsContents = readFileSync(fuelsConfig, 'utf-8');

    expect(fuelsContents).toMatch(`  autoStartFuelCore: true,`); // not comment
    expect(config.autoStartFuelCore).toEqual(true);
  });
});
