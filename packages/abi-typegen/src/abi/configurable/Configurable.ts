import type { IConfigurable } from '../../types/interfaces/IConfigurable';
import type { IType } from '../../types/interfaces/IType';
import type { JsonAbiConfigurable } from '../../types/interfaces/JsonAbi';
import { findType } from '../../utils/findType';

export class Configurable implements IConfigurable {
  public name: string;
  public type: IType;
  public rawAbiConfigurable: JsonAbiConfigurable;

  constructor(params: { types: IType[]; rawAbiConfigurable: JsonAbiConfigurable }) {
    const { types, rawAbiConfigurable } = params;

    this.name = rawAbiConfigurable.name;
    this.rawAbiConfigurable = rawAbiConfigurable;
    this.type = findType({ types, typeId: rawAbiConfigurable.configurableType.type });
  }
}
