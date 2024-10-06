import { writeFileSync } from 'fs';

import { getScriptName } from '../../config/forcUtils';
import type { DeployedScript, FuelsConfig } from '../../types';

export function saveScriptFiles(scripts: DeployedScript[], _config: FuelsConfig) {
  for (const { path, loaderBytecode, abi } of scripts) {
    const scriptName = getScriptName(path);
    const buildMode = _config.buildMode;

    const loaderBytecodePath = `${path}/out/${buildMode}/${scriptName}-loader.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);

    const abiPath = `${path}/out/${buildMode}/${scriptName}-abi.json`;
    writeFileSync(abiPath, JSON.stringify(abi, null, 2));
  }
}
