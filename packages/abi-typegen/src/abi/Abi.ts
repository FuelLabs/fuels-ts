import { normalizeString } from '@fuel-ts/utils';

import type { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IFunction } from '../types/interfaces/IFunction';
import type { IRawAbi } from '../types/interfaces/IRawAbi';
import type { IType } from '../types/interfaces/IType';
import { parseFunctions } from '../utils/parseFunctions';
import { parseTypes } from '../utils/parseTypes';

/*
  Manages many instances of Types and Functions
*/
export class Abi {
  public name: string;
  public programType: ProgramTypeEnum;

  public filepath: string;
  public outputDir: string;

  public commonTypesInUse: string[] = [];

  public rawContents: IRawAbi;
  public hexlifiedBinContents?: string;

  public types: IType[];
  public functions: IFunction[];

  constructor(params: {
    filepath: string;
    programType: ProgramTypeEnum;
    rawContents: IRawAbi;
    hexlifiedBinContents?: string;
    outputDir: string;
  }) {
    const { filepath, outputDir, rawContents, hexlifiedBinContents, programType } = params;

    const abiNameRegex = /([^/]+)-abi\.json$/m;
    const abiName = filepath.match(abiNameRegex);

    const couldNotParseName = !abiName || abiName.length === 0;

    if (couldNotParseName) {
      throw new Error(`Could not parse name from abi file: ${filepath}`);
    }

    const name = `${normalizeString(abiName[1])}Abi`;

    this.name = name;
    this.programType = programType;

    this.filepath = filepath;
    this.rawContents = rawContents;
    this.hexlifiedBinContents = hexlifiedBinContents;
    this.outputDir = outputDir;

    const { types, functions } = this.parse();

    this.types = types;
    this.functions = functions;

    this.computeCommonTypesInUse();
  }

  parse() {
    const { types: rawAbiTypes, functions: rawAbiFunctions } = this.rawContents;

    const types = parseTypes({ rawAbiTypes });
    const functions = parseFunctions({ rawAbiFunctions, types });

    return {
      types,
      functions,
    };
  }

  computeCommonTypesInUse() {
    const customTypesTable: Record<string, string> = {
      option: 'Option',
      enum: 'Enum',
      vector: 'Vec',
    };

    this.commonTypesInUse = [];

    Object.keys(customTypesTable).forEach((typeName) => {
      const isInUse = !!this.types.find((t) => t.name === typeName);

      if (isInUse) {
        const commonTypeLabel: string = customTypesTable[typeName];
        this.commonTypesInUse.push(commonTypeLabel);
      }
    });
  }
}
