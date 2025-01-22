import type { BinaryVersions } from '@fuel-ts/versions';

import { createMatcher } from '../../../../matchers/sway-type-matchers';
import type { Abi } from '../../../../parser';
import { evaluateFunctionInputsOptionality } from '../../../../utils/evaluate-function-inputs-optionality';
import type { ProgramDetails } from '../../../abi-gen-types';
import typesTemplate from '../templates/types.hbs';
import { generateTsType } from '../typers/generate-ts-type';
import { flattenImports } from '../typers/helpers';
import type { TyperReturn } from '../typers/types';

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
  rawUntypedSlice: false,
});

export function sortAlphabetically(a: TyperReturn, b: TyperReturn) {
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
    const inputs = evaluateFunctionInputsOptionality(fn);

    return {
      name: fn.name,
      inputs: `[${inputs.map((i) => `${i.name}${i.isOptional ? '?' : ''}: ${cTypes[i.type.concreteTypeId].input}`).join(', ')}]`,
      output: cTypes[fn.output.concreteTypeId].output,
    };
  });
}

function mapConfigurables(abi: Abi, cTypes: Record<string, TyperReturn>) {
  return abi.configurables.length > 0
    ? abi.configurables.map(({ name, type }) => ({
        name,
        input: cTypes[type.concreteTypeId].input,
      }))
    : undefined;
}

/**
 * Renders the types file for a program.
 * @returns An object containing the filename and the content of the types file.
 * The type rendering logic is the same for all program types.
 */
export function renderTypes(
  { name: programName, abi }: ProgramDetails,
  versions: BinaryVersions
): string {
  const mTypes = abi.metadataTypes
    .filter(metadataTypeFilter)
    .map((abiType) => generateTsType({ abiType }));

  const cTypes = abi.concreteTypes.reduce<Record<string, TyperReturn>>((res, abiType) => {
    res[abiType.concreteTypeId] = generateTsType({ abiType, asReference: true });
    return res;
  }, {});

  const { fuelsTypeImports, commonTypeImports } = mergeTypeImports(mTypes, cTypes);

  const content = templateRenderer({
    template: typesTemplate,
    versions,
    data: {
      isContract: abi.programType === 'contract',
      name: programName,
      fuelsTypeImports,
      commonTypeImports,
      enums: mTypes.filter(({ tsType }) => tsType === 'enum').sort(sortAlphabetically),
      types: mTypes.filter(({ tsType }) => tsType === 'type').sort(sortAlphabetically),
      functions: mapFunctions(abi, cTypes),
      configurables: mapConfigurables(abi, cTypes),
    },
  });

  return content;
}
