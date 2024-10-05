import { writeFileSync } from 'fs';

import { getPredicateName } from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

export async function savePredicateFiles(predicates: DeployedPredicate[], _config: FuelsConfig) {
  for (const { path, predicateRoot, loaderBytecode } of predicates) {
    const predicateName = getPredicateName(path);
    const buildMode = _config.buildMode;

    const predicateRootPath = `${path}/out/${buildMode}/${predicateName}-deployed-bin-root`;
    writeFileSync(predicateRootPath, predicateRoot);

    const loaderBytecodePath = `${path}/out/${buildMode}/${predicateName}.deployed.bin`;
    writeFileSync(loaderBytecodePath, loaderBytecode);

    await Promise.resolve({ path, predicateRoot, loaderBytecode });
  }
}
