import type { BNInput } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

import type { GqlDependentCost } from '../__generated__/operations';

export function resolveGasDependentCosts(byteSize: BNInput, gasDependentCost: GqlDependentCost) {
  const base = bn(gasDependentCost.base);
  let dependentValue = bn(0);
  if (gasDependentCost.__typename === 'LightOperation') {
    dependentValue = bn(byteSize).div(bn(gasDependentCost.unitsPerGas));
  }
  if (gasDependentCost.__typename === 'HeavyOperation') {
    dependentValue = bn(byteSize).mul(bn(gasDependentCost.gasPerUnit));
  }
  return base.add(dependentValue);
}
