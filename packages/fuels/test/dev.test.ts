import { existsSync, readFileSync, statSync, writeFileSync } from 'fs';

import type { FuelsConfig } from '../src';
import { fileHandlers } from '../src/cli/commands/dev';
import * as startCoreMod from '../src/cli/commands/dev/startFuelCore';

import {
  clean,
  contractsJson,
  fooContractSway,
  fooContractTs,
  runDev,
  runInit,
} from './utils/runCommands';

describe('dev', () => {
  let fooContractSwayContentsBefore: string;

  async function ensureFileChanged(path: string, mtime: Date) {
    let output: boolean;

    const stat = statSync(path);

    if (stat.mtime.getTime() > mtime.getTime()) {
      output = true;
    } else {
      output = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(ensureFileChanged(path, mtime));
        }, 100);
      });
    }

    return output;
  }

  beforeEach(clean);

  afterAll(async () => {
    // Close file-watching handlers
    await fileHandlers.watcher?.close();

    // Restore original Sway contract contents
    writeFileSync(fooContractSway, fooContractSwayContentsBefore);

    // Clean generated files
    clean();
  });

  it('should run `dev` command', async () => {
    const startFuelCore = jest
      .spyOn(startCoreMod, 'startFuelCore')
      .mockImplementation((_config: FuelsConfig) =>
        Promise.resolve({
          bindIp: '0.0.0.0',
          accessIp: '127.0.0.1',
          port: 4000,
          providerUrl: `http://127.0.0.1:4000/graphql`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          childProcess: {} as any,
        })
      );

    await runInit();
    await runDev();

    // Validates if fuel-core has been started
    expect(startFuelCore).toHaveBeenCalledTimes(1);

    /**
     * Before editing
     */
    // Caches and double-checks initial contents of Sway contract
    fooContractSwayContentsBefore = readFileSync(fooContractSway, 'utf-8');
    expect(fooContractSwayContentsBefore).toMatch('fn foo() -> u64');
    expect(fooContractSwayContentsBefore).toMatch('fn foo() -> u64 {');
    expect(fooContractSwayContentsBefore).toMatch('12345');

    // Validates contract IDs inside `contracts.json`
    expect(existsSync(contractsJson)).toBeTruthy();
    const contractJsonContentsBefore = JSON.parse(readFileSync(contractsJson, 'utf-8'));
    expect(contractJsonContentsBefore.barFoo).toMatch(/0x/);
    expect(contractJsonContentsBefore.fooBar).toMatch(/0x/);

    // Validates contents of generated TS contract file
    expect(existsSync(fooContractTs)).toBeTruthy();
    const fooContractTsContentsBefore = readFileSync(fooContractTs, 'utf-8');
    expect(fooContractTsContentsBefore).toMatch('"type": "u64",');

    /**
     * Editing Sway Contract (must auto-rebuild everything)
     */
    const mtime = statSync(contractsJson).mtime;

    writeFileSync(
      fooContractSway,
      fooContractSwayContentsBefore.replace(/u64/g, 'u8').replace('12345', '123')
    );

    await ensureFileChanged(contractsJson, mtime);

    /**
     * After editing
     */
    // Validates contract IDs inside `contracts.json`
    const contractJsonContentsAfter = JSON.parse(readFileSync(contractsJson, 'utf-8'));
    expect(contractJsonContentsAfter.barFoo).not.toEqual(contractJsonContentsBefore.barFoo);
    expect(contractJsonContentsAfter.fooBar).not.toEqual(contractJsonContentsBefore.barFoo);

    // Validates modified contents of Sway contract
    const fooContractSwayContentsAfter = readFileSync(fooContractSway, 'utf-8');
    expect(fooContractSwayContentsAfter).toMatch('fn foo() -> u8');
    expect(fooContractSwayContentsAfter).toMatch('fn foo() -> u8 {');
    expect(fooContractSwayContentsAfter).toMatch('123');

    // Validates contents of generated TS contract file
    expect(existsSync(fooContractTs)).toBeTruthy();
    const fooContractTsContentsAfter = readFileSync(fooContractTs, 'utf-8');
    expect(fooContractTsContentsAfter).toMatch('"type": "u8",');
  });
});
