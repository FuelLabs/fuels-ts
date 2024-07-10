import { Configurable } from '../abi/configurable/Configurable';
import type { JsonAbiConfigurable } from '../types/interfaces/JsonAbi';
import type { IType } from '../types/interfaces/IType';

export function makeConfigurable(params: {
  types: IType[];
  rawAbiConfigurable: JsonAbiConfigurable;
}) {
  const { types, rawAbiConfigurable } = params;
  return new Configurable({ types, rawAbiConfigurable });
}
