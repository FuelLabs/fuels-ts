import chalk from 'chalk';
import * as childProcessMod from 'child_process';

export const mockExecSync = () => {
  vi.spyOn(childProcessMod, 'execSync').mockImplementationOnce((command) => {
    if (command.includes('prebuild')) {
      return chalk('Skipping prebuild command');
    }
    // Allow other execSync calls to proceed normally
    return childProcessMod.execSync(command);
  });
};
