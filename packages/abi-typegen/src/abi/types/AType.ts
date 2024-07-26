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

  public typeDeclarations: IType['typeDeclarations'] = {
    inputDecl: '',
    outputDecl: '',
  };

  constructor(protected type: ResolvedType | ResolvableType) {}

  public parseTypeDeclarations(supportedTypes: SupportedTypeClass[]) {
    const { typeParamsArgsMap } = this.type;

    if (typeParamsArgsMap && typeParamsArgsMap.length > 0) {
      const args = typeParamsArgsMap.map(([, v]) => {
        const {
          attributes: { inputLabel, outputLabel },
          typeDeclarations: { inputDecl, outputDecl },
        } = makeType(supportedTypes, v);

        return {
          inputLabel: `${inputLabel}${inputDecl}`,
          outputLabel: `${outputLabel}${outputDecl}`,
        };
      });

      this.typeDeclarations = {
        inputDecl: `<${args.map((arg) => arg.inputLabel).join(', ')}>`,
        outputDecl: `<${args.map((arg) => arg.outputLabel).join(', ')}>`,
      };
    }
  }
}
