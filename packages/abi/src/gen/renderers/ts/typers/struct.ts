import { assertUnreachable } from '@fuel-ts/utils';

import { ENUM_REGEX, STRUCT_REGEX, TUPLE_REGEX } from '../../../../matchers/sway-type-matchers';
import type { AbiConcreteType, AbiTypeComponent, AbiMetadataType } from '../../../../parser';

import { flattenImports } from './helpers';
import type { TyperReturn, Typer, GlobalTyper, TyperAbiType } from './types';

function wrapStructContent(text: string, wrap: '{}' | '[]' | 'Enum'): string {
  switch (wrap) {
    case '{}':
      return `{ ${text} }`;
    case '[]':
      return `[${text}]`;
    case 'Enum': {
      const wrappedAsObj = wrapStructContent(text, '{}');
      return `Enum<${wrappedAsObj}>`;
    }
    default:
      return assertUnreachable(wrap);
  }
}

function componentMapper(
  c: AbiTypeComponent | { name: string; type: AbiConcreteType | AbiMetadataType },
  includeName: boolean,
  generateTsType: GlobalTyper
): TyperReturn {
  const mapped = generateTsType({ abiType: c.type, asReference: true });

  if (!includeName) {
    return mapped;
  }

  return {
    ...mapped,
    input: `${c.name}: ${mapped.input}`,
    output: `${c.name}: ${mapped.output}`,
  };
}

export function mapComponents(params: {
  parent: TyperAbiType;
  includeComponentNames: boolean;
  typer: GlobalTyper;
}) {
  const { parent, includeComponentNames, typer } = params;
  const components = parent.components;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mapped = components!.map((c) => componentMapper(c, includeComponentNames, typer));

  // eslint-disable-next-line no-nested-ternary
  const wrap = ENUM_REGEX.test(parent.swayType)
    ? 'Enum'
    : TUPLE_REGEX.test(parent.swayType)
      ? '[]'
      : '{}';

  const input = wrapStructContent(mapped.map((m) => m.input).join(', '), wrap);
  const output = wrapStructContent(mapped.map((m) => m.output).join(', '), wrap);

  const { fuelsTypeImports, commonTypeImports } = flattenImports(mapped);

  if (wrap === 'Enum') {
    commonTypeImports.push('Enum');
  }

  return {
    input,
    output,
    fuelsTypeImports,
    commonTypeImports,
  };
}

function mapGenericTypeParameters(
  typeArgs:
    | AbiMetadataType['typeParameters']
    | NonNullable<AbiConcreteType['metadata']>['typeArguments'],
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
