import { Configurable } from '../abi/configurable/Configurable';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiConfigurable } from '../types/interfaces/JsonAbiNew';

export function makeConfigurable(params: {
  types: IType[];
  rawAbiConfigurable: JsonAbiConfigurable;
}) {
  const { types, rawAbiConfigurable } = params;
  return new Configurable({ types, rawAbiConfigurable });
}
