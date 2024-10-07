import { writeFileSync } from 'fs';

import { getScriptName } from '../../config/forcUtils';
import type { DeployedScript, FuelsConfig } from '../../types';

export function saveScriptFiles(scripts: DeployedScript[], _config: FuelsConfig) {
  for (const { path, loaderBytecode, abi } of scripts) {
    const scriptName = getScriptName(path);

    const loaderBytecodePath = `${path}/out/${scriptName}-loader.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);

    const abiPath = `${path}/out/${scriptName}-loader-abi.json`;
    writeFileSync(abiPath, JSON.stringify(abi, null, 2));
  }
}
