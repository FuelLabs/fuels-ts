import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { Dictionary } from 'ts-essentials';
import { Contract, extractAbi, extractDocumentation, parse } from './parser/abiParser';

import {
  CodegenConfig,
  Config,
  FileDescription,
  getFilename,
  normalizeName,
  TypeChainTarget,
} from 'typechain';

import { codegenAbstractContractFactory, codegenContractTypings } from './codegen';
import { FACTORY_POSTFIX } from './common';

const DEFAULT_OUT_PATH = './types/fuels-contracts/';

export default class Fuels extends TypeChainTarget {
  name = 'Fuels';

  private readonly allContracts: string[];
  private readonly outDirAbs: string;
  private readonly contractCache: Dictionary<
    | {
        abi: any;
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
    const abi = extractAbi(file.contents);

    if (abi.length === 0) {
      return;
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
      const desiredSymbol = fileName + '__factory';

      codegen.push(`export { ${desiredSymbol} } from './factories/${desiredSymbol}'`);
    }

    return codegen.join('\n');
  }
}
