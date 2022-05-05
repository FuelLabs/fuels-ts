/* eslint-disable @typescript-eslint/no-use-before-define */
import type { CodegenConfig } from 'typechain';

import { FACTORY_POSTFIX } from '../common';
import type { Contract, RawAbiDefinition } from '../parser/abiParser';

import {
  codegenFunctions,
  generateDecodeFunctionDataOverload,
  generateEncodeFunctionDataOverload,
  generateInterfaceFunctionDescription,
} from './functions';
import { reservedKeywords } from './reserved-keywords';
import generateStruct from './structs';

/**
 * Generate the contract as TS code
 */
export function codegenContractTypings(contract: Contract, codegenConfig: CodegenConfig): string {
  const template = `
  import type { Interface, FunctionFragment, DecodedValue, Contract, Overrides, BigNumberish, BytesLike, BigNumber } from 'fuels';
  
  ${Object.values(contract.structs)
    .map((v) => generateStruct(v[0]))
    .join('\n')}

  interface ${contract.name}Interface extends Interface {
    functions: {
      ${Object.values(contract.functions)
        .map((v) => v[0])
        .map(generateInterfaceFunctionDescription)
        .join('\n')}
    };

    ${Object.values(contract.functions)
      .map((v) => v[0])
      .map(generateEncodeFunctionDataOverload)
      .join('\n')}

    ${Object.values(contract.functions)
      .map((v) => v[0])
      .map(generateDecodeFunctionDataOverload)
      .join('\n')}
  }

  export class ${contract.name} extends Contract {
    interface: ${contract.name}Interface;
    functions: {
      ${Object.values(contract.functions)
        .map(codegenFunctions.bind(null, { returnResultObject: true, codegenConfig }))
        .join('\n')}
    };
    callStatic: {
      ${Object.values(contract.functions)
        .map(codegenFunctions.bind(null, { returnResultObject: true, codegenConfig }))
        .join('\n')}
    };

    ${Object.values(contract.functions)
      .filter((f) => !reservedKeywords.has(f[0].name))
      .map(codegenFunctions.bind(null, { codegenConfig }))
      .join('\n')}
  }`;

  return template;
}

/**
 * Generate the contract factory as TS code
 */
export function codegenAbstractContractFactory(
  contract: Contract,
  abi: RawAbiDefinition[]
): string {
  const { body, header } = codegenCommonContractFactory(contract, abi);
  return `
  ${header}

  export class ${contract.name}${FACTORY_POSTFIX} {
    ${body}
  }
  `;
}

/**
 * Generate the common contract factory as TS code
 */
function codegenCommonContractFactory(
  contract: Contract,
  abi: RawAbiDefinition[]
): { header: string; body: string } {
  const header = `
  import type { Provider, Wallet } from "fuels";
  import { Interface, Contract } from "fuels";
  import type { ${contract.name}, ${contract.name}Interface } from "../${contract.name}";
  const _abi = ${JSON.stringify(abi, null, 2)};
  `.trim();

  const body = `
    static readonly abi = _abi;
    static createInterface(): ${contract.name}Interface {
      return new Interface(_abi) as ${contract.name}Interface;
    }
    static connect(id: string, walletOrProvider: Wallet | Provider): ${contract.name} {
      return new Contract(id, _abi, walletOrProvider) as ${contract.name};
    }
  `.trim();

  return { header, body };
}
