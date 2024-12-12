import type { BinaryVersions } from '@fuel-ts/versions';

import { createMatcher, swayTypeMatchers } from '../../../../matchers/sway-type-matchers';
import type { Abi, AbiFunctionInput } from '../../../../parser';
import type { ProgramDetails } from '../../../abi-gen';
import type { TsAbiGenResult } from '../../types';
import typesTemplate from '../templates/types.hbs';
import { generateTsType } from '../typers/generate-ts-type';
import { flattenImports } from '../typers/helpers';
import type { TyperReturn } from '../typers/types';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { templateRenderer } from './template-renderer';

const metadataTypeFilter = createMatcher<boolean>({
  enum: true,
  struct: true,
  assetId: true,
  string: false,
  void: false,
  bool: false,
  u8: false,
  u16: false,
  u32: false,
  u64: false,
  u256: false,
  b256: false,
  generic: false,
  stdString: false,
  option: false,
  result: false,
  str: false,
  b512: false,
  bytes: false,
  vector: false,
  tuple: false,
  array: false,
  evmAddress: false,
  rawUntypedPtr: false,
  rawUntypedSlice: false,
});

function sortAlphabetically(a: TyperReturn, b: TyperReturn) {
  if (a.input < b.input) {
    return -1;
  }
  if (a.input > b.input) {
    return 1;
  }
  return 0;
}

function mergeTypeImports(mTypes: TyperReturn[], cTypesMap: Record<string, TyperReturn>) {
  const cTypes = Object.values(cTypesMap);

  const imports = flattenImports(mTypes.concat(cTypes));

  const fuelsTypeImports = [...new Set(imports.fuelsTypeImports)].sort().join(', ');

  const commonTypeImports = [...new Set(imports.commonTypeImports)].sort().join(', ');

  return { fuelsTypeImports, commonTypeImports };
}

function mapFunctions(abi: Abi, cTypes: Record<string, TyperReturn>) {
  return abi.functions.map((fn) => {
    let isMandatory = false;
    const inputs = fn.inputs.reduceRight<(AbiFunctionInput & { isOptional: boolean })[]>(
      (result, input) => {
        const isTypeMandatory =
          !swayTypeMatchers.void(input.type.swayType) &&
          !swayTypeMatchers.option(input.type.swayType);

        isMandatory = isMandatory || isTypeMandatory;
        return [{ ...input, isOptional: !isMandatory }, ...result];
      },
      []
    );

    return {
      name: fn.name,
      inputs: `[${inputs.map((i) => `${i.name}${i.isOptional ? '?' : ''}: ${cTypes[i.type.concreteTypeId].input}`).join(', ')}]`,
      output: cTypes[fn.output.concreteTypeId].output,
    };
  });
}

export function renderTypes(
  { name, abi }: ProgramDetails,
  versions: BinaryVersions
): TsAbiGenResult {
  const mTypes = abi.metadataTypes
    .filter(metadataTypeFilter)
    .map((t) => generateTsType({ abiType: t }));

  const cTypes = abi.concreteTypes.reduce<Record<string, TyperReturn>>((res, abiType) => {
    res[abiType.concreteTypeId] = generateTsType({ abiType, asReference: true });
    return res;
  }, {});

  const functions = mapFunctions(abi, cTypes);

  const configurables =
    abi.configurables.length > 0
      ? abi.configurables.map((c) => ({
          name: c.name,
          input: cTypes[c.type.concreteTypeId].input,
        }))
      : undefined;

  const { fuelsTypeImports, commonTypeImports } = mergeTypeImports(mTypes, cTypes);

  const enums = mTypes.filter((t) => t.tsType === 'enum').sort(sortAlphabetically);
  const types = mTypes.filter((t) => t.tsType === 'type').sort(sortAlphabetically);

  const content = templateRenderer({
    template: typesTemplate,
    versions,
    data: {
      name,
      fuelsTypeImports,
      commonTypeImports,
      enums,
      types,
      functions,
      configurables,
    },
  });

  const { withParentDir } = getParentDirWrapper(abi.programType);

  return {
    filename: withParentDir(`${name}Types.ts`),
    content,
  };
}
