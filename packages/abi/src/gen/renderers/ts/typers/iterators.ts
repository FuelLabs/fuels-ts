import { ARRAY_REGEX } from '../../../../matchers/sway-type-matchers';

import { mapComponents } from './struct';
import type { Typer } from './types';

export const tupleTyper: Typer = ({ abiType }, typer) =>
  mapComponents({ parent: abiType, includeComponentNames: false, typer });

export const arrayTyper: Typer = ({ abiType }, typer) => {
  const length = ARRAY_REGEX.exec(abiType.swayType)?.[2];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { type } = abiType.components![0]!;
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { type } = abiType.components![0]!;
  const mapped = typer({ abiType: type, asReference: true });
  const input = `${mapped.input}[]`;
  const output = `${mapped.output}[]`;
  return {
    ...mapped,
    input,
    output,
  };
};
