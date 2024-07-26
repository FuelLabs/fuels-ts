import type { IType } from '../../types/interfaces/IType';
import type { Configurable } from '../../types/interfaces/JsonAbi';

export class AbiConfigurable {
  public name: string;
  public type: IType;

  constructor(types: Record<string, IType>, configurable: Configurable) {
    this.name = configurable.name;
    this.type = types[configurable.concreteTypeId];
  }
}
