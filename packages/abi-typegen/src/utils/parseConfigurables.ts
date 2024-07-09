import type { IType } from '../types/interfaces/IType';
import type { JsonAbi } from '../types/interfaces/JsonAbiNew';

import { makeConfigurable } from './makeConfigurable';

export function parseConfigurables(params: {
  types: IType[];
  rawAbiConfigurables: JsonAbi['configurables'];
}) {
  const { types, rawAbiConfigurables } = params;

  const configurables = rawAbiConfigurables.map((rawAbiConfigurable) =>
    makeConfigurable({ types, rawAbiConfigurable })
  );

  return configurables;
}
