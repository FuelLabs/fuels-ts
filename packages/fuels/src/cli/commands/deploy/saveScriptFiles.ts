import { writeFileSync } from 'fs';

import { getScriptName } from '../../config/forcUtils';
import type { DeployedScript, FuelsConfig } from '../../types';

export function saveScriptFiles(scripts: DeployedScript[], _config: FuelsConfig) {
  for (const { path, blobId, loaderBytecode } of scripts) {
    const scriptName = getScriptName(path);
    const buildMode = _config.buildMode;

    const scriptBlobIdPath = `${path}/out/${buildMode}/${scriptName}-deployed-bin-hash`;
    writeFileSync(scriptBlobIdPath, blobId);

    const loaderBytecodePath = `${path}/out/${buildMode}/${scriptName}.deployed.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);
  }
}
