import { runTypegen } from '@fuel-ts/abi/cli';

import type { FuelsConfig } from '../types';

export function generateTypes(config: FuelsConfig) {
  const { contracts, scripts, predicates, output } = config;

  const loaderPaths = scripts.concat(predicates).map((path) => `${path}/out`);

  const paths = contracts
    .concat(scripts, predicates)
    .map((path) => `${path}/out/${config.buildMode}`)
    .concat(loaderPaths);

  runTypegen({ inputs: paths, output });
}
