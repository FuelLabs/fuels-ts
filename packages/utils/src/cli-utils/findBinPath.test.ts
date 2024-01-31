import { safeExec } from '@fuel-ts/errors/test-utils';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { findBinPath } from './findBinPath';

/**
 * @group node
 */
describe('findBinPath', () => {
  const bootstrap = (dir: string) => {
    const cmdName = 'my-cmd';
    const mods = join(dir, 'node_modules');
    const bin = join(mods, '.bin');
    const cmdPath = join(bin, cmdName);

    const resetDisk = (params?: { cmdOnly: boolean }) => {
      if (params?.cmdOnly) {
        rmSync(cmdPath);
      } else {
        rmSync(mods, { recursive: true });
      }
    };

    mkdirSync(bin, { recursive: true });
    writeFileSync(cmdPath, '');

    return { resetDisk, mods, cmdName, cmdPath };
  };

  it('should find bin path in current dir', () => {
    const base = __dirname; // current dir
    const { cmdName, cmdPath, resetDisk } = bootstrap(base);
    const binPath = findBinPath(cmdName, base);

    resetDisk();
    expect(binPath).toEqual(cmdPath);
  });

  it('should find bin path one dir up', () => {
    const base = join(__dirname, '..'); // one dir up
    const { cmdName, cmdPath, resetDisk } = bootstrap(base);
    const binPath = findBinPath(cmdName, base);

    resetDisk();
    expect(binPath).toEqual(cmdPath);
  });

  it('should find bin path two dir up', () => {
    const base = join(__dirname, '..', '..'); // two dirs up
    const { cmdName, cmdPath, resetDisk } = bootstrap(base);
    const binPath = findBinPath(cmdName, base);

    resetDisk({ cmdOnly: true });
    expect(binPath).toEqual(cmdPath);
  });

  it('should throw for bin path not found', async () => {
    const cmdName = 'non-existent';
    const { error } = await safeExec(() => findBinPath(cmdName, __dirname));
    expect(error?.message).toEqual(`Command not found: ${cmdName}`);
  });
});
