import * as childProcessMod from 'child_process';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import * as findBinPathMod from '@fuel-ts/wallet/test-utils';
import { configureLogging } from '../../utils/logger';

import { buildSwayProgram } from './buildSwayProgram';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('buildSwayPrograms', () => {
  beforeEach(() => {
    mockLogger();
  });

  function mockAll(params: { shouldError: boolean } = { shouldError: false }) {
    const findBinPath = vi.spyOn(findBinPathMod, 'findBinPath').mockReturnValue('');

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
    } as unknown as childProcessMod.ChildProcessWithoutNullStreams;

    const spawn = vi.spyOn(childProcessMod, 'spawn').mockReturnValue(spawnMocks);

    return {
      spawn,
      spawnMocks,
      findBinPath,
    };
  }

  test('should pipe stdout', async () => {
    const { spawn, spawnMocks } = mockAll();

    vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });

    await buildSwayProgram(fuelsConfig, '/any/workspace/path');

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout and stderr', async () => {
    const { spawn, spawnMocks } = mockAll();

    vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });

    await buildSwayProgram(fuelsConfig, '/any/workspace/path');

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.on).toHaveBeenCalledTimes(2);
  });
});
