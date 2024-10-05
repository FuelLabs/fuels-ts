import type { DeployedScript, FuelsConfig } from '../../types';

export async function saveScriptFiles(scripts: DeployedScript[], _config: FuelsConfig) {
  for (const { path, blobId, loaderBytecode } of scripts) {
    // TODO: Implement me
    /**
     * - Write loader binary to disk (side-by-side with original binary)
     * - Write extra text files to disk (side-by-side with original binary)
     *    - Hash file for scripts
     *    - Root file for predicates
     */
    await Promise.resolve({ path, blobId, loaderBytecode });
  }
}
