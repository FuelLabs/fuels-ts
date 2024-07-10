import type { JsonAbiConfigurable } from './IRawAbiConfigurable';
import type { IType } from './IType';

export interface IConfigurable {
  name: string;
  type: IType;
  rawAbiConfigurable: JsonAbiConfigurable;
}
