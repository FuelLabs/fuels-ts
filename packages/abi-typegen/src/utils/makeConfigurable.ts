import { Configurable } from '../abi/configurable/Configurable';
import type { IRawAbiConfigurable } from '../types/interfaces/IRawAbiConfigurable';
import type { IType } from '../types/interfaces/IType';

export function makeConfigurable(params: {
  types: IType[];
  rawAbiConfigurable: IRawAbiConfigurable;
}) {
  const { types, rawAbiConfigurable } = params;
  return new Configurable({ types, rawAbiConfigurable });
}
