import * as childProcessMod from 'child_process';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
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
  const log = 'log';
  const debugLog = 'debug log';
  beforeEach(() => {
    mockLogger();
  });

  function mockAll(params: { shouldError: boolean } = { shouldError: false }) {
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
        on: vi.fn((eventName: string, cb: (...args: unknown[]) => void) => {
          cb(log);
        }),
      },
      stdout: {
        on: vi.fn((eventName: string, cb: (...args: unknown[]) => void) => {
          cb(debugLog);
        }),
      },
    } as unknown as childProcessMod.ChildProcessWithoutNullStreams;

    const spawn = vi.spyOn(childProcessMod, 'spawn').mockReturnValue(spawnMocks);

    return {
      spawn,
      spawnMocks,
    };
  }

  test('logs to console when logging is enabled', async () => {
    const { spawn } = mockAll();
    const logSpy = vi.spyOn(console, 'log');

    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });

    await buildSwayProgram(fuelsConfig, '/any/workspace/path');

    expect(spawn).toHaveBeenCalledTimes(1);

    expect(logSpy).toHaveBeenCalledWith(log);
    expect(logSpy).not.toHaveBeenCalledWith(debugLog);
  });

  test('logs debug to console when debug is enabled', async () => {
    const { spawn } = mockAll();
    const logSpy = vi.spyOn(console, 'log');
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });

    await buildSwayProgram(fuelsConfig, '/any/workspace/path');

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(debugLog);
  });
});
