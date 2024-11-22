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
