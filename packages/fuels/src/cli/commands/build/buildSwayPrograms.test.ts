import * as childProcessMod from 'child_process';

import { fuelsConfig } from '../../../../test/fixtures/config/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import { resetDiskAndMocks } from '../../../../test/utils/resetDiskAndMocks';
import { workspaceDir } from '../../../../test/utils/runCommands';
import { configureLogging } from '../../utils/logger';

import * as buildSwayProgramsMod from './buildSwayPrograms';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    // @ts-expect-error spreading module import
    ...mod,
  };
});

/**
 * @group node
 */
describe('buildSwayPrograms', () => {
  const { onForcExit, onForcError } = buildSwayProgramsMod;

  beforeEach(() => {
    mockLogger();
  });
  beforeEach(() => {
    resetDiskAndMocks();
  });

  function mockSpawn(params: { shouldError: boolean } = { shouldError: false }) {
    const spawnMocks = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: vi.fn((eventName: string, fn: (..._: any) => void) => {
        const shouldExit = eventName === 'exit' && !params.shouldError;
        const shouldError = eventName === 'error' && params.shouldError;
        if (shouldExit || shouldError) {
          setTimeout(fn, 10);
        }
      }),
      stderr: {
        pipe: vi.fn(),
      },
      stdout: {
        pipe: vi.fn(),
      },
    };

    const spawn = jest
      .spyOn(childProcessMod, 'spawn')
      .mockImplementation(
        (..._) => spawnMocks as unknown as childProcessMod.ChildProcessWithoutNullStreams
      );

    return {
      spawn,
      spawnMocks,
    };
  }

  function mockBuildSwayProgram() {
    const buildSwayProgram = jest
      .spyOn(buildSwayProgramsMod, 'buildSwayProgram')
      .mockReturnValue(Promise.resolve());

    return {
      buildSwayProgram,
    };
  }

  function customConfig(workspace: undefined | string) {
    return {
      ...structuredClone(fuelsConfig),
      workspace,
    };
  }

  test('building Sway programs using workspace', async () => {
    const config = customConfig(workspaceDir);
    const { buildSwayProgram } = mockBuildSwayProgram();

    await buildSwayProgramsMod.buildSwayPrograms(config);

    expect(buildSwayProgram).toHaveBeenCalledTimes(1);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.workspace);
  });

  test('building Sway programs using individual configs', async () => {
    const { buildSwayProgram } = mockBuildSwayProgram();
    const config = customConfig(undefined);

    await buildSwayProgramsMod.buildSwayPrograms(config);

    expect(buildSwayProgram).toHaveBeenCalledTimes(4);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.contracts[0]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.contracts[1]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.scripts[0]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.predicates[0]);
  });

  test('should pipe stdout', async () => {
    const config = customConfig(workspaceDir);
    const { spawn, spawnMocks } = mockSpawn();

    vi.spyOn(process.stdout, 'write').mockImplementation();
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });

    await buildSwayProgramsMod.buildSwayProgram(config, config.workspace);

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout and stderr', async () => {
    const config = customConfig(workspaceDir);
    const { spawn, spawnMocks } = mockSpawn();

    vi.spyOn(process.stderr, 'write').mockImplementation();
    vi.spyOn(process.stdout, 'write').mockImplementation();
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });

    await buildSwayProgramsMod.buildSwayProgram(config, config.workspace);

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.on).toHaveBeenCalledTimes(2);
  });

  test('should resolve on successful exit', () => {
    const resolve = vi.fn();
    const reject = vi.fn((_reason?: number | Error) => {});
    onForcExit(resolve, reject)(null);
    expect(reject).toHaveBeenCalledTimes(0);
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  test('should reject on failed exit', () => {
    const resolve = vi.fn();
    const reject = vi.fn((_reason?: number | Error) => {});
    onForcExit(resolve, reject)(1);
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledTimes(0);
  });

  test('should reject on error', () => {
    const reject = vi.fn();
    const { error } = mockLogger();
    onForcError(reject)(new Error());
    expect(reject).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
  });
});
