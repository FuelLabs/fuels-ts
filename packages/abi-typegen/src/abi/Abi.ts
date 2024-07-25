import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { normalizeString } from '@fuel-ts/utils';

import type { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbi } from '../types/interfaces/JsonAbi';
import { makeType } from '../utils/makeType';
import { shouldSkipAbiType } from '../utils/shouldSkipAbiType';
import { supportedTypes } from '../utils/supportedTypes';

import { ResolvableMetadataType } from './ResolvableMetadataType';
import { AbiConfigurable } from './configurable/AbiConfigurable';
import { AbiFunction } from './functions/AbiFunction';
import { makeResolvedType } from './makeResolvedType';

/*
  Manages many instances of Types and Functions
*/
export class Abi {
  public name: string;
  public programType: ProgramTypeEnum;

  public filepath: string;
  public outputDir: string;

  public commonTypesInUse: string[] = [];

  public rawContents: JsonAbi;
  public hexlifiedBinContents?: string;
  public storageSlotsContents?: string;

  public metadataTypes: IType[];
  public concreteTypes: IType[];
  public functions: AbiFunction[];
  public configurables: AbiConfigurable[];

  constructor(params: {
    filepath: string;
    programType: ProgramTypeEnum;
    rawContents: JsonAbi;
    hexlifiedBinContents?: string;
    storageSlotsContents?: string;
    outputDir: string;
  }) {
    const {
      filepath,
      outputDir,
      rawContents,
      hexlifiedBinContents,
      programType,
      storageSlotsContents,
    } = params;

    const abiNameRegex = /([^/]+)-abi\.json$/m;
    const abiName = filepath.match(abiNameRegex);

    const couldNotParseName = !abiName || abiName.length === 0;

    if (couldNotParseName) {
      throw new FuelError(
        ErrorCode.PARSE_FAILED,
        `Could not parse name from ABI file: ${filepath}.`
      );
    }

    const name = `${normalizeString(abiName[1])}Abi`;

    this.name = name;
    this.programType = programType;

    this.filepath = filepath;
    this.rawContents = rawContents;
    this.hexlifiedBinContents = hexlifiedBinContents;
    this.storageSlotsContents = storageSlotsContents;
    this.outputDir = outputDir;

    const { metadataTypes, concreteTypes, functions, configurables } = this.parse();

    this.metadataTypes = metadataTypes;
    this.concreteTypes = concreteTypes;
    this.functions = functions;
    this.configurables = configurables;

    this.computeCommonTypesInUse();
  }

  parse() {
    const resolvableMetadataTypes = this.rawContents.metadataTypes.map((tm) => ({
      typeId: tm.metadataTypeId,
      type: new ResolvableMetadataType(this.rawContents, tm.metadataTypeId, undefined),
    }));

    const resolvedConcreteTypes = this.rawContents.concreteTypes.map((ct) => ({
      typeId: ct.concreteTypeId,
      type: makeResolvedType(
        this.rawContents,
        resolvableMetadataTypes.map((t) => t.type),
        ct.concreteTypeId
      ),
    }));

    const types = [...resolvableMetadataTypes, ...resolvedConcreteTypes]
      .filter((t) => !shouldSkipAbiType(t.type))
      .map(({ typeId, type }) => ({
        typeId,
        type: makeType(supportedTypes, type),
      }))
      .reduce(
        (obj, { typeId, type }) => ({ ...obj, [typeId]: type }),
        {} satisfies Record<string | number, IType>
      );

    const functions = this.rawContents.functions.map((fn) => new AbiFunction(types, fn));
    const configurables = this.rawContents.configurables.map((c) => new AbiConfigurable(types, c));

    const metadataTypes = Object.entries(types)
      .filter(([typeId]) => !Number.isNaN(+typeId))
      .map(([, type]) => type) as IType[];

    const concreteTypes = Object.entries(types)
      .filter(([typeId]) => Number.isNaN(+typeId))
      .map(([, type]) => type) as IType[];
    return {
      metadataTypes,
      concreteTypes,
      functions,
      configurables,
    };
  }

  computeCommonTypesInUse() {
    const customTypesTable: Record<string, string> = {
      option: 'Option',
      enum: 'Enum',
      vector: 'Vec',
      result: 'Result',
    };

    this.commonTypesInUse = [];

    Object.keys(customTypesTable).forEach((typeName) => {
      const isInUse = !!this.metadataTypes.find((t) => t.name === typeName);

      if (isInUse) {
        const commonTypeLabel: string = customTypesTable[typeName];
        this.commonTypesInUse.push(commonTypeLabel);
      }
    });
  }
}
