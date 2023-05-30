import type { IConfigurable } from '../../types/interfaces/IConfigurable';
import type { IRawAbiConfigurable } from '../../types/interfaces/IRawAbiConfigurable';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';

export class Configurable implements IConfigurable {
  public name: string;
  public type: IType;
  public rawAbiConfigurable: IRawAbiConfigurable;

  constructor(params: { types: IType[]; rawAbiConfigurable: IRawAbiConfigurable }) {
    const { types, rawAbiConfigurable } = params;

    this.name = rawAbiConfigurable.name;
    this.rawAbiConfigurable = rawAbiConfigurable;
    this.type = findType({ types, typeId: rawAbiConfigurable.configurableType.type });
  }
}
