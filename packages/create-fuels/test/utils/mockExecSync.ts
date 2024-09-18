import chalk from 'chalk';
import type * as childProcessMod from 'child_process';

export const mockExecSync = () => {
  vi.mock('child_process', async () => {
    const actualChildProcess = await vi.importActual<typeof childProcessMod>('child_process');

    return {
      ...actualChildProcess, // Preserve other functions in child_process
      execSync: (command: string) => {
        if (command.includes('prebuild')) {
          return chalk('Skipping prebuild command');
        }
        // Allow other execSync calls to proceed normally
        return actualChildProcess.execSync(command);
      },
    };
  });
};
