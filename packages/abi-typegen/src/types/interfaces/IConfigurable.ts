import type { IType } from './IType';
import type { JsonAbiConfigurable } from './JsonAbi';

export interface IConfigurable {
  name: string;
  type: IType;
  rawAbiConfigurable: JsonAbiConfigurable;
}
