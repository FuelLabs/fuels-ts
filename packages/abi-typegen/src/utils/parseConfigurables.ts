import type { IConfigurable } from '../types/interfaces/IConfigurable';
import type { IRawAbiConfigurable } from '../types/interfaces/IRawAbiConfigurable';
import type { IType } from '../types/interfaces/IType';

import { makeConfigurable } from './makeConfigurable';

export function parseConfigurables(params: {
  types: IType[];
  rawAbiConfigurables: IRawAbiConfigurable[];
}) {
  const { types, rawAbiConfigurables } = params;

  const configurables: IConfigurable[] = rawAbiConfigurables.map((rawAbiConfigurable) =>
    makeConfigurable({ types, rawAbiConfigurable })
  );

  return configurables;
}
