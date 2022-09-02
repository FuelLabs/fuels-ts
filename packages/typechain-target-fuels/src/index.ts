/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'fs';
import type { CodegenConfig, Config, FileDescription } from 'fuelchain';
import { getFilename, TypeChainTarget } from 'fuelchain';
import { join, resolve } from 'path';
import type { Dictionary } from 'ts-essentials';

import { codegenAbstractContractFactory, codegenContractTypings } from './codegen';
import { FACTORY_POSTFIX } from './common';
import { extractAbi as extractFuelAbi, extractDocumentation, parse } from './parser/abiParser';
import type { Contract, RawAbiDefinition } from './parser/abiParser';
import { normalizeName } from './parser/parseSvmTypes';

const DEFAULT_OUT_PATH = './types/fuels-contracts/';

export default class Fuels extends TypeChainTarget {
  name = 'Fuels';

  private readonly allContracts: string[];
  private readonly outDirAbs: string;
  private readonly contractCache: Dictionary<
    | {
        abi: RawAbiDefinition[];
        contract: Contract;
      }
    | undefined
  > = {};

  constructor(config: Config) {
    super(config);

    const { cwd, outDir, allFiles } = config;

    this.outDirAbs = resolve(cwd, outDir || DEFAULT_OUT_PATH);

    this.allContracts = allFiles.map((fp) => normalizeName(getFilename(fp)));
  }

  transformFile(file: FileDescription): FileDescription[] | void {
    const name = getFilename(file.path);
    const abi = extractFuelAbi(file.contents);

    if (abi.length === 0) {
      return undefined;
    }

    const documentation = extractDocumentation(file.contents);
    const contract = parse(abi, name, documentation);

    this.contractCache[name] = { abi, contract };
    return [this.genContractTypingsFile(contract, this.cfg.flags)];
  }

  genContractTypingsFile(contract: Contract, codegenConfig: CodegenConfig): FileDescription {
    return {
      path: join(this.outDirAbs, `${contract.name}.d.ts`),
      contents: codegenContractTypings(contract, codegenConfig),
    };
  }

  afterRun(): FileDescription[] {
    // For each contract that doesn't have bytecode (it's either abstract, or only ABI was provided)
    // generate a simplified factory, that allows to interact with deployed contract instances.
    const abstractFactoryFiles = Object.keys(this.contractCache).map((contractName) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { contract, abi } = this.contractCache[contractName]!;
      return {
        path: join(this.outDirAbs, 'factories', `${contract.name}${FACTORY_POSTFIX}.ts`),
        contents: codegenAbstractContractFactory(contract, abi),
      };
    });

    const allFiles = [
      ...abstractFactoryFiles,
      {
        path: join(this.outDirAbs, 'common.d.ts'),
        contents: readFileSync(join(__dirname, '../static/common.d.ts'), 'utf-8'),
      },
      {
        path: join(this.outDirAbs, 'index.ts'),
        contents: this.genReExports(),
      },
    ].filter(Boolean);
    return allFiles;
  }

  private genReExports(): string {
    const codegen: string[] = [];

    const allContractsNoDuplicates = new Set(this.allContracts);

    for (const fileName of allContractsNoDuplicates) {
      const desiredSymbol = fileName;

      codegen.push(`export type { ${desiredSymbol} } from './${desiredSymbol}'`);
    }

    codegen.push('\n');

    // then generate reexports for TypeChain generated factories
    for (const fileName of allContractsNoDuplicates) {
      const desiredSymbol = `${fileName}__factory`;

      codegen.push(`export { ${desiredSymbol} } from './factories/${desiredSymbol}'`);
    }

    return codegen.join('\n');
  }
}

export const extractAbi = extractFuelAbi;
