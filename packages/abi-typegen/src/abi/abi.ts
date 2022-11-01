import {
  DTS_TEMPLATE_ENCODER,
  DTS_TEMPLATE_DECODER,
  DTS_TEMPLATE_STRUCT,
  DTS_TEMPLATE_ENUM,
  DTS_TEMPLATE,
} from '../templates/dts';
import { FACTORY_TEMPLATE } from '../templates/factory';
import { normalizeName } from '../utils/normalize';

import { parseFunctions } from './functions';
import type { IFunction } from './interfaces/IFunction';
import type { IRawAbi } from './interfaces/IRawAbi';
import type { IType } from './interfaces/IType';
import { parseTypes } from './types';
import type { EnumType } from './types/EnumType';
import type { StructType } from './types/StructType';

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
    const { types, functions } = this;

    /*
      First we format all attributes
    */
    const fnsTypedefs = this.functions.map((f) => f.getDeclaration());

    const fnsFragments = this.functions.map((f) => `${f.attributes.name}: FunctionFragment;`);

    const encoders = functions.map((f) =>
      DTS_TEMPLATE_ENCODER.replace('{NAME}', f.attributes.name).replace(
        '{INPUT}',
        f.attributes.inputs
      )
    );

    const decoders = functions.map((f) =>
      DTS_TEMPLATE_DECODER.replace('{NAME}', f.attributes.name).replace(
        '{INPUT}',
        f.attributes.inputs
      )
    );

    const structs = types
      .filter((t) => t.name === 'struct')
      .map((t) => {
        const st = t as StructType; // only structs here
        const structName = st.getStructName();
        return DTS_TEMPLATE_STRUCT.replace('{NAME}', structName).replace(
          '{VALUES}',
          st.getStructContents({ types })
        );
      });

    const enums = types
      .filter((t) => t.name === 'enum')
      .map((t) => {
        const et = t as EnumType; // only enums here
        const structName = et.getStructName();
        return DTS_TEMPLATE_ENUM.replace('{NAME}', structName).replace(
          '{VALUES}',
          et.getEnumContents({ types })
        );
      });

    /*
      Then we replace them all on the main template
    */
    return DTS_TEMPLATE.replace('{STRUCTS}', structs.join('\n'))
      .replace('{ENUMS}', enums.join('\n'))
      .replace('{FNS_FRAGMENTS}', fnsFragments.join('\n    '))
      .replace('{FNS_TYPEDEFS}', fnsTypedefs.join('\n    '))
      .replace('{ENCODERS}', encoders.join('\n  '))
      .replace('{DECODERS}', decoders.join('\n  '))
      .replace(/\{NAME\}/g, this.name);
  }

  getFactoryDeclaration() {
    return FACTORY_TEMPLATE.replace(/\{NAME\}/g, this.name);
  }
}
