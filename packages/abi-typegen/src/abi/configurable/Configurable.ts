import type { IConfigurable } from '../../types/interfaces/IConfigurable';
import type { IType } from '../../types/interfaces/IType';
import type { JsonAbiConfigurable } from '../../types/interfaces/JsonAbi';
import { resolveInputLabel } from '../../utils/getTypeDeclaration';

export class Configurable implements IConfigurable {
  public name: string;
  public inputLabel: string;

  constructor(params: { types: IType[]; rawAbiConfigurable: JsonAbiConfigurable }) {
    const {
      types,
      rawAbiConfigurable: {
        name,
        configurableType: { type, typeArguments },
      },
    } = params;

    this.name = name;

    this.inputLabel = resolveInputLabel(types, type, typeArguments);
  }
}
