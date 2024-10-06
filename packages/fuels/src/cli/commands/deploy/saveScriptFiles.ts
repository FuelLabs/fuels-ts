import { writeFileSync } from 'fs';

import { getScriptName } from '../../config/forcUtils';
import type { DeployedScript, FuelsConfig } from '../../types';

export function saveScriptFiles(scripts: DeployedScript[], _config: FuelsConfig) {
  for (const { path, loaderBytecode } of scripts) {
    const scriptName = getScriptName(path);
    const buildMode = _config.buildMode;

    const loaderBytecodePath = `${path}/out/${buildMode}/${scriptName}-loader.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);
  }
}
