import { writeFileSync } from 'fs';

import { getPredicateName } from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

export function savePredicateFiles(predicates: DeployedPredicate[], _config: FuelsConfig) {
  for (const { path, predicateRoot, loaderBytecode, abi } of predicates) {
    const predicateName = getPredicateName(path);

    const predicateRootPath = `${path}/out/${predicateName}-loader-bin-root`;
    writeFileSync(predicateRootPath, predicateRoot);

    const loaderBytecodePath = `${path}/out/${predicateName}-loader.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);

    const abiPath = `${path}/out/${predicateName}-loader-abi.json`;
    writeFileSync(abiPath, JSON.stringify(abi, null, 2));
  }
}
