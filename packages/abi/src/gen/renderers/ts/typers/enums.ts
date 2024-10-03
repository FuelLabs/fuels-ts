import { swayTypeMatchers, ENUM_REGEX } from '../../../../matchers/sway-type-matchers';
import type { AbiType, AbiTypeMetadata } from '../../../../parser';

import { structTyper } from './struct';
import type { Typer } from './types';

function isNativeEnum(abiType: AbiType | AbiTypeMetadata) {
  return abiType.components?.every((t) => swayTypeMatchers.void(t.type.swayType)) === true;
}

export const enumTyper: Typer = (params, typer) => {
  const { abiType } = params;
  if (isNativeEnum(abiType)) {
    const typeName = ENUM_REGEX.exec(abiType.swayType)?.[2] as string;

    if ('concreteTypeId' in abiType) {
      return { input: typeName, output: typeName };
    }

    const enumFields = abiType.components?.map((c) => `${c.name} = '${c.name}'`).join(', ');
    const input = `${typeName} { ${enumFields} }`;
    return {
      input,
      output: input,
      tsType: 'enum',
    };
  }

  return structTyper(params, typer);
};

export const optionTyper: Typer = ({ abiType }, typer) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { type } = abiType.components![1]!;
  const some = typer({ abiType: type, asReference: true });
  const input = `Option<${some.input}>`;
  const output = `Option<${some.output}>`;
  return {
    input,
    output,
    commonTypeImports: ['Option'],
  };
};

export const resultTyper: Typer = ({ abiType }, typer) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ type: ok }, { type: err }] = abiType.components!;
  const mappedOk = typer({ abiType: ok, asReference: true });
  const mappedErr = typer({ abiType: err, asReference: true });

  const input = `Result<${mappedOk.input}, ${mappedErr.input}>`;
  const output = `Result<${mappedOk.output}, ${mappedErr.output}>`;

  const fuelsTypeImports = [
    mappedOk.fuelsTypeImports ?? [],
    mappedErr.fuelsTypeImports ?? [],
  ].flat();
  const commonTypeImports = [
    mappedOk.commonTypeImports ?? [],
    mappedErr.commonTypeImports ?? [],
    ['Result'],
  ].flat();
  return {
    input,
    output,
    fuelsTypeImports,
    commonTypeImports,
  };
};
