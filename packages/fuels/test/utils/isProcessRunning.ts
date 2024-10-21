export function isProcessRunning(pid: number) {
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
