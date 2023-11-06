import { existsSync, rmSync } from 'fs';

import { fuelsConfigPath, generatedDir } from './runCommands';

/**
 * Cleanup routine
 */
export function deleteGeneratedFiles() {
  if (existsSync(fuelsConfigPath)) {
    rmSync(fuelsConfigPath);
  }
  if (existsSync(generatedDir)) {
    rmSync(generatedDir, { recursive: true });
  }
}

export function resetDiskAndMocks() {
  deleteGeneratedFiles();
  vi.restoreAllMocks();
}
