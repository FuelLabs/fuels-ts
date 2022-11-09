import type { IFunction } from './interfaces/IFunction';
import type { IRawAbi } from './interfaces/IRawAbi';
import type { IType } from './interfaces/IType';
import { renderDtsTemplate } from './templates/dts';
import { renderFactoryTemplate } from './templates/factory';
import { getPackageVersion } from './utils/getPackageVersion';
import { normalizeName } from './utils/normalize';
import { parseFunctions } from './utils/parseFunctions';
import { parseTypes } from './utils/parseTypes';

/*
  Manages many instances of Types and Functions
*/
export class Abi {
  public readonly fuelVersion: string = getPackageVersion().version;

  public name: string;
  public filepath: string;
  public outputDir: string;

  public dtsFilepath: string;
  public factoryFilepath: string;

  public commonTypesInUse: string[] = [];

  public rawContents: IRawAbi;
  public types: IType[];
  public functions: IFunction[];

  constructor(params: { filepath: string; outputDir: string; rawContents: IRawAbi }) {
    const { filepath, outputDir, rawContents } = params;

    // processing abi name
    const abiNameRegex = /([^/]+)-abi\.json$/m;
    const abiName = filepath.match(abiNameRegex);

    if (!abiName || abiName.length === 0) {
      throw new Error(`Could not parse name from abi file: ${filepath}`);
    }

    const name = `${normalizeName(abiName[1])}Abi`;

    // processing output filepaths
    this.dtsFilepath = `${outputDir}/${name}.d.ts`;
    this.factoryFilepath = `${outputDir}/factories/${name}__factory.ts`;

    // saving properties to class scope
    this.name = name;
    this.filepath = filepath;
    this.rawContents = rawContents;
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

  getDtsDeclaration() {
    return renderDtsTemplate({ abi: this });
  }

  getFactoryDeclaration() {
    return renderFactoryTemplate({ abi: this });
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
