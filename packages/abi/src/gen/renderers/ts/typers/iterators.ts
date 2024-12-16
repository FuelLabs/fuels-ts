import { ARRAY_REGEX } from '../../../../matchers/sway-type-matchers';
import type { AbiTypeComponent } from '../../../../parser';

import type { Typer } from './types';
import { mapComponents } from './utils';

export const tupleTyper: Typer = ({ abiType }, typer) =>
  mapComponents({ parent: abiType, includeComponentNames: false, typer });

export const arrayTyper: Typer = ({ abiType }, typer) => {
  const length = ARRAY_REGEX.exec(abiType.swayType)?.[2];

  const { type } = abiType.components?.[0] as AbiTypeComponent;
  const mapped = typer({ abiType: type, asReference: true });

  const input = `ArrayOfLength<${mapped.input}, ${length}>`;
  const output = `ArrayOfLength<${mapped.output}, ${length}>`;

  return {
    input,
    output,
    fuelsTypeImports: mapped.fuelsTypeImports,
    commonTypeImports: ['ArrayOfLength', ...(mapped.commonTypeImports ?? [])],
  };
};

export const vectorTyper: Typer = ({ abiType }, typer) => {
  const { type } = abiType.components?.[0] as AbiTypeComponent;
  const mapped = typer({ abiType: type, asReference: true });
  const input = `${mapped.input}[]`;
  const output = `${mapped.output}[]`;
  return {
    ...mapped,
    input,
    output,
  };
};
