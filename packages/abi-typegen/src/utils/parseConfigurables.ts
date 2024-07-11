import type { IConfigurable } from '../types/interfaces/IConfigurable';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiConfigurable } from '../types/interfaces/JsonAbi';

import { makeConfigurable } from './makeConfigurable';

export function parseConfigurables(params: {
  types: IType[];
  rawAbiConfigurables: readonly JsonAbiConfigurable[];
}) {
  const { types, rawAbiConfigurables } = params;

  const configurables: IConfigurable[] = rawAbiConfigurables.map((rawAbiConfigurable) =>
    makeConfigurable({ types, rawAbiConfigurable })
  );

  return configurables;
}
