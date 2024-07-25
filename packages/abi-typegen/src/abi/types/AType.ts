import type { IType, ITypeAttributes } from '../../types/interfaces/IType';
import { makeType } from '../../utils/makeType';
import type { SupportedTypeClass } from '../../utils/supportedTypes';
import type { ResolvableMetadataType } from '../ResolvableMetadataType';
import type { ResolvedType } from '../ResolvedType';

export class AType {
  public attributes: ITypeAttributes;
  public requiredFuelsMembersImports: string[];

  public typeDeclarations: IType['typeDeclarations'] = {
    input: '',
    output: '',
  };

  constructor(protected type: ResolvedType | ResolvableMetadataType) {
    this.attributes = {
      inputLabel: 'unknown',
      outputLabel: 'unknown',
    };
    this.requiredFuelsMembersImports = [];
  }

  public parseTypeDeclarations(supportedTypes: SupportedTypeClass[]) {
    const { typeParamsArgsMap } = this.type;

    if (typeParamsArgsMap && typeParamsArgsMap.length > 0) {
      const args = typeParamsArgsMap.map(([, v]) => {
        const {
          attributes: { inputLabel, outputLabel },
          typeDeclarations: { input: inputDecl, output: outputDecl },
        } = makeType(supportedTypes, v);

        return {
          inputLabel: `${inputLabel}${inputDecl}`,
          outputLabel: `${outputLabel}${outputDecl}`,
        };
      });

      this.typeDeclarations = {
        input: `<${args.map((arg) => arg.inputLabel).join(', ')}>`,
        output: `<${args.map((arg) => arg.outputLabel).join(', ')}>`,
      };
    }
  }
}
