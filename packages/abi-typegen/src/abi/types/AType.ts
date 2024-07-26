import type { IType, ITypeAttributes } from '../../types/interfaces/IType';
import { makeType } from '../../utils/makeType';
import type { SupportedTypeClass } from '../../utils/supportedTypes';
import type { ResolvableType } from '../ResolvableType';
import type { ResolvedType } from '../ResolvedType';

export class AType {
  public attributes: ITypeAttributes = {
    inputLabel: 'unknown',
    outputLabel: 'unknown',
  };

  public requiredFuelsMembersImports: string[] = [];

  public structContents: IType['structContents'] = {
    input: '',
    output: '',
  };

  constructor(protected type: ResolvedType | ResolvableType) {}

  public parseTypeDeclarations(supportedTypes: SupportedTypeClass[]) {
    const { typeParamsArgsMap } = this.type;

    if (typeParamsArgsMap && typeParamsArgsMap.length > 0) {
      const args = typeParamsArgsMap.map(([, v]) => {
        const {
          attributes: { inputLabel, outputLabel },
        } = makeType(supportedTypes, v);

        return {
          inputLabel,
          outputLabel,
        };
      });
      const { inputLabel, outputLabel } = this.attributes;

      this.attributes = {
        inputLabel: `${inputLabel}<${args.map((arg) => arg.inputLabel).join(', ')}>`,
        outputLabel: `${outputLabel}<${args.map((arg) => arg.outputLabel).join(', ')}>`,
      };
    }
  }
}
