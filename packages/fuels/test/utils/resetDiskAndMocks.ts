import { existsSync, rmSync } from 'fs';

/**
 * Cleanup routine
 */

export function resetDiskAndMocks(dirPath: string) {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true });
  }
  vi.restoreAllMocks();
}
