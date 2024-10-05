import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { normalizeString } from '@fuel-ts/utils';

import type { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IConfigurable } from '../types/interfaces/IConfigurable';
import type { IFunction } from '../types/interfaces/IFunction';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiOld } from '../types/interfaces/JsonAbi';
import type { JsonAbi } from '../types/interfaces/JsonAbiNew';
import { parseFunctions } from '../utils/parseFunctions';
import { parseTypes } from '../utils/parseTypes';
import { transpileAbi } from '../utils/transpile-abi';

import { Configurable } from './configurable/Configurable';

/*
  Manages many instances of Types and Functions
*/
export class Abi {
  public capitalizedName: string;
  public camelizedName: string;
  public programType: ProgramTypeEnum;

  public filepath: string;
  public outputDir: string;

  public commonTypesInUse: string[] = [];

  public rawContents: JsonAbi;
  public hexlifiedOriginalBinContents?: string;
  public hexlifiedLoaderBinContents?: string;
  public storageSlotsContents?: string;

  public types: IType[];
  public functions: IFunction[];
  public configurables: IConfigurable[];

  constructor(params: {
    filepath: string;
    programType: ProgramTypeEnum;
    rawContents: JsonAbi;
    hexlifiedOriginalBinContents?: string;
    hexlifiedLoaderBinContents?: string;
    storageSlotsContents?: string;
    outputDir: string;
  }) {
    const {
      filepath,
      outputDir,
      rawContents,
      hexlifiedOriginalBinContents,
      hexlifiedLoaderBinContents,
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

    this.programType = programType;
    this.capitalizedName = `${normalizeString(abiName[1])}`;
    this.camelizedName = this.capitalizedName.replace(/^./m, (x) => x.toLowerCase());

    this.filepath = filepath;
    this.rawContents = rawContents;
    this.hexlifiedOriginalBinContents = hexlifiedOriginalBinContents;
    this.hexlifiedLoaderBinContents = hexlifiedLoaderBinContents;
    this.storageSlotsContents = storageSlotsContents;
    this.outputDir = outputDir;

    const { types, functions, configurables } = this.parse();

    this.types = types;
    this.functions = functions;
    this.configurables = configurables;

    this.computeCommonTypesInUse();
  }

  parse() {
    const transpiled = transpileAbi(this.rawContents) as JsonAbiOld;
    const {
      types: rawAbiTypes,
      functions: rawAbiFunctions,
      configurables: rawAbiConfigurables,
    } = transpiled;

    const types = parseTypes({ rawAbiTypes });
    const functions = parseFunctions({ rawAbiFunctions, types });
    const configurables = rawAbiConfigurables.map(
      (rawAbiConfigurable) => new Configurable({ types, rawAbiConfigurable })
    );

    return {
      types,
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
      const isInUse = !!this.types.find((t) => t.name === typeName);

      if (isInUse) {
        const commonTypeLabel: string = customTypesTable[typeName];
        this.commonTypesInUse.push(commonTypeLabel);
      }
    });
  }
}
