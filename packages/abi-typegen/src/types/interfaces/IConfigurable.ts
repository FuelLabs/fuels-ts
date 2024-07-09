import type { IType } from './IType';
import type { JsonAbiConfigurable } from './JsonAbiNew';

export interface IConfigurable {
  name: string;
  type: IType;
  rawAbiConfigurable: JsonAbiConfigurable;
}
