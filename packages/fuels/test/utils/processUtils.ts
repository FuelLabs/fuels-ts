import { sleep } from '@fuel-ts/utils';
import { execSync } from 'child_process';

export function findChildProcessPid(
  parentPid: number,
  childProcessName: string
): number | undefined {
  const childProcesses = execSync(`ps --ppid ${parentPid} -o pid,cmd --no-headers || true`)
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s !== '');

  for (const cp of childProcesses) {
    const [pid, name] = cp.split(' ');
    if (name.indexOf(childProcessName) !== -1) {
      return +pid;
    }
    const childPid = findChildProcessPid(+pid, childProcessName);
    if (childPid) {
      return childPid;
    }
  }

  return undefined;
}

function isProcessRunning(pid: number) {
  try {
    // Check if the process exists
    process.kill(pid, 0);
    return true; // If no error, the process is running
  } catch (e) {
    const error = e as Error & { code: string };
    // Error codes:
    // ESRCH: No such process
    // EPERM: Permission denied (you don't have permissions to check)
    if (error.code === 'ESRCH') {
      return false; // No such process
    }
    if (error.code === 'EPERM') {
      return true; // Process exists, but we don't have permission to send a signal
    }
    throw error; // Some other unexpected error
  }
}

export async function waitProcessEnd(pid: number) {
  while (isProcessRunning(pid)) {
    await sleep(100);
  }
}
