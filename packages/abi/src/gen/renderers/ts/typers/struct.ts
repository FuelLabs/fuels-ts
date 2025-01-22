import { ENUM_REGEX, STRUCT_REGEX } from '../../../../matchers/sway-type-matchers';
import type { AbiMetadataType, AbiTypeArgument } from '../../../../parser';

import { flattenImports } from './helpers';
import type { TyperReturn, Typer, GlobalTyper, TyperAbiType } from './types';
import { mapComponents } from './utils';

function mapGenericTypeParameters(
  typeArgs: AbiTypeArgument[] | AbiMetadataType['typeParameters'],
  typer: GlobalTyper
): TyperReturn {
  if (!typeArgs) {
    return {
      input: '',
      output: '',
    };
  }
  const mapped = typeArgs.map((ta) => typer({ abiType: ta, asReference: true }));
  const { fuelsTypeImports, commonTypeImports } = flattenImports(mapped);

  const input = mapped.map((r) => r.input).join(', ');
  const output = mapped.map((r) => r.output).join(', ');
  return {
    fuelsTypeImports,
    commonTypeImports,
    input: `<${input}>`,
    output: `<${output}>`,
  };
}

function getTypeNames(abiType: TyperAbiType) {
  const typeName =
    STRUCT_REGEX.exec(abiType.swayType)?.[2] ?? ENUM_REGEX.exec(abiType.swayType)?.[2];
  return {
    inputName: `${typeName}Input`,
    outputName: `${typeName}Output`,
  };
}

function mapStructAsReference(abiType: TyperAbiType, typer: GlobalTyper): TyperReturn {
  const { inputName, outputName } = getTypeNames(abiType);

  const typeArgs = mapGenericTypeParameters(
    'metadata' in abiType
      ? abiType.metadata?.typeArguments
      : (abiType as AbiMetadataType).typeParameters,
    typer
  );

  return {
    ...typeArgs,
    input: `${inputName}${typeArgs.input}`,
    output: `${outputName}${typeArgs.output}`,
  };
}

export const structTyper: Typer = ({ abiType, asReference }, typer) => {
  if ('metadata' in abiType || asReference) {
    return mapStructAsReference(abiType, typer);
  }

  const { inputName, outputName } = getTypeNames(abiType);

  const typeParameters = mapGenericTypeParameters(
    (abiType as AbiMetadataType).typeParameters,
    typer
  );
  const content = mapComponents({ parent: abiType, includeComponentNames: true, typer });

  const inputType = `${inputName}${typeParameters.input}`;
  const outputType = `${outputName}${typeParameters.output}`;

  const input = `${inputType} = ${content.input}`;
  let output = '';
  if (content.input === content.output) {
    output = `${outputType} = ${inputType}`;
  } else {
    output = `${outputType} = ${content.output}`;
  }

  return {
    input,
    output,
    commonTypeImports: content.commonTypeImports,
    fuelsTypeImports: content.fuelsTypeImports,
    tsType: 'type',
  };
};
