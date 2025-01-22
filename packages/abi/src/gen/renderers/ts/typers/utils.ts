import { assertUnreachable } from '@fuel-ts/utils';

import { ENUM_REGEX, TUPLE_REGEX } from '../../../../matchers/sway-type-matchers';
import type { AbiTypeComponent } from '../../../../parser';

import { flattenImports } from './helpers';
import type { TyperAbiType, GlobalTyper, TyperReturn } from './types';

function componentMapper(
  c: AbiTypeComponent,
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

/**
 * This function maps components for a given parent type
 * which can be a tuple or struct (and enum).
 */
export function mapComponents(params: {
  parent: TyperAbiType;
  /**
   * Component names are included for structs and enums,
   * but they're not included for tuples (we ignore the `__tuple_element` name).
   */
  includeComponentNames: boolean;
  typer: GlobalTyper;
}) {
  const { parent, includeComponentNames, typer } = params;
  const components = parent.components as AbiTypeComponent[];
  const mapped = components.map((c) => componentMapper(c, includeComponentNames, typer));

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
