import { mkdirSync, readFileSync, writeFileSync } from 'fs';

import { getPredicateName } from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

export function savePredicateFiles(predicates: DeployedPredicate[], _config: FuelsConfig) {
  for (const { path, predicateRoot, loaderBytecode, offset } of predicates) {
    const predicateName = getPredicateName(path);
    const buildMode = _config.buildMode;

    const predicateSourceJsonRootPath = `${path}/out/${buildMode}/${predicateName}-abi.json`;
    const abi = JSON.parse(readFileSync(predicateSourceJsonRootPath, 'utf-8'));
    abi.configurables?.forEach((configurable: Record<string, object>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      configurable.offset = offset;
    });

    const loaderPath = `${path}/loader`;
    const dirPath = `${loaderPath}/out/${buildMode}`;
    mkdirSync(dirPath, { recursive: true });

    writeFileSync(`${dirPath}/${predicateName}-abi.json`, JSON.stringify(abi, null, 2));

    const predicateRootPath = `${dirPath}/${predicateName}-bin-root`;
    writeFileSync(predicateRootPath, predicateRoot);

    const loaderBytecodePath = `${dirPath}/${predicateName}.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);
  }
}
