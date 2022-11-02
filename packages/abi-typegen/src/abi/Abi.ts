import type { IFunction } from 'src/interfaces/IFunction';
import type { IRawAbi } from 'src/interfaces/IRawAbi';
import type { IType } from 'src/interfaces/IType';
import { renderDtsTemplate } from 'src/templates/dts';
import { renderFactoryTemplate } from 'src/templates/factory';
import { normalizeName } from 'src/utils/normalize';

import { parseFunctions } from './helpers/functions';
import { parseTypes } from './helpers/types';

export class Abi {
  public name: string;
  public filepath: string;
  public outputDir: string;

  public dtsFilepath: string;
  public factoryFilepath: string;

  public usesEnum: boolean;

  public rawContents: IRawAbi;
  public types: IType[];
  public functions: IFunction[];

  constructor(params: { filepath: string; outputDir: string; rawContents: IRawAbi }) {
    const { filepath, outputDir, rawContents } = params;

    const abiNameRegex = /([^/]+)-abi\.json$/m;
    const abiName = filepath.match(abiNameRegex);

    if (!abiName || abiName.length === 0) {
      throw new Error(`Could not parse name from abi file: ${filepath}`);
    }

    const name = normalizeName(abiName[1]);

    this.dtsFilepath = `${outputDir}/${name}Abi.d.ts`;
    this.factoryFilepath = `${outputDir}/factories/${name}__factory.d.ts`;

    this.name = name;
    this.filepath = filepath;
    this.rawContents = rawContents;
    this.outputDir = outputDir;

    const { types, functions } = this.parse();

    this.types = types;
    this.functions = functions;
    this.usesEnum = !!types.find((t) => t.name === 'enum');
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
}
