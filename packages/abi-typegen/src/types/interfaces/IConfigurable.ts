import type { JsonAbiConfigurable } from './JsonAbiConfigurable';
import type { IType } from './IType';

export interface IConfigurable {
  name: string;
  type: IType;
  rawAbiConfigurable: JsonAbiConfigurable;
}
