import { spawnSync } from 'child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { delimiter, join } from 'path';
import { pathToFileURL } from 'url';

/**
 * @group node
 */
describe('buildFromGitBranch', () => {
  let tempDir: string;
  let binaries: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'fuels-core-build-'));
    binaries = join(tempDir, 'fuel-core-binaries');
    mkdirSync(join(tempDir, 'lib'));
    mkdirSync(join(tempDir, 'bin'));
    writeFileSync(join(tempDir, 'package.json'), '{"type":"module"}');
    writeFileSync(join(tempDir, 'VERSION'), 'git:experiment');
    cpSync(join(__dirname, 'shared.js'), join(tempDir, 'lib/shared.js'));

    // Exercise the real build/copy logic without compiling Core or contacting GitHub.
    writeFileSync(
      join(tempDir, 'bin/git'),
      `#!${process.execPath}
import { mkdirSync } from 'fs';
if (process.argv[2] === 'clone') mkdirSync(process.argv.at(-1), { recursive: true });
`,
      { mode: 0o755 }
    );
    writeFileSync(
      join(tempDir, 'bin/cargo'),
      `#!${process.execPath}
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
if (process.env.BUILD_MODE === 'failed') process.exit(1);
const release = join(process.cwd(), 'target/release');
const wasmDir = join(release, 'fuel-core-upgradable-executor-cache/wasm32-unknown-unknown/release');
mkdirSync(wasmDir, { recursive: true });
writeFileSync(join(release, 'fuel-core'), process.env.BUILD_CONTENT);
const wasm = join(wasmDir, 'fuel-core-wasm-executor.wasm');
rmSync(wasm, { force: true });
if (process.env.BUILD_MODE !== 'missing') writeFileSync(wasm, process.env.BUILD_CONTENT);
`,
      { mode: 0o755 }
    );
  });

  afterEach(() => rmSync(tempDir, { recursive: true, force: true }));

  function build(mode = 'success', content = 'first build') {
    const moduleUrl = pathToFileURL(join(tempDir, 'lib/shared.js')).href;
    return spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { buildFromGitBranch } from '${moduleUrl}'; buildFromGitBranch('experiment');`,
      ],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${join(tempDir, 'bin')}${delimiter}${process.env.PATH}`,
          BUILD_MODE: mode,
          BUILD_CONTENT: content,
        },
      }
    );
  }

  it.each([false, true])(
    'copies fresh executor bytes with an existing checkout: %s',
    (existing) => {
      if (existing) {
        mkdirSync(join(tempDir, 'fuel-core-repo'));
      }

      expect(build().status).toBe(0);
      expect(readFileSync(join(binaries, 'fuel-core'), 'utf8')).toBe('first build');
      expect(readFileSync(join(binaries, 'fuel-core-wasm-executor.wasm'), 'utf8')).toBe(
        'first build'
      );
      expect(readFileSync(join(binaries, 'VERSION'), 'utf8')).toBe('git:experiment');

      expect(build('success', 'moving branch').status).toBe(0);
      expect(readFileSync(join(binaries, 'fuel-core-wasm-executor.wasm'), 'utf8')).toBe(
        'moving branch'
      );
    }
  );

  it.each(['missing', 'failed'])(
    'rejects a %s build without replacing installed artifacts',
    (mode) => {
      expect(build().status).toBe(0);
      const result = build(mode, 'bad build');
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain(
        mode === 'missing' ? 'did not produce executor WASM' : 'Fuel Core build command failed'
      );
      expect(readFileSync(join(binaries, 'fuel-core-wasm-executor.wasm'), 'utf8')).toBe(
        'first build'
      );
      expect(readFileSync(join(binaries, 'fuel-core'), 'utf8')).toBe('first build');
    }
  );
});
