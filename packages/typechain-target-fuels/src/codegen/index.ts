/* eslint-disable @typescript-eslint/no-use-before-define */
import type { CodegenConfig } from 'fuelchain';

import { FACTORY_POSTFIX } from '../common';
import type { Contract, RawAbiDefinition } from '../parser/abiParser';

import {
  codegenFunctions,
  generateDecodeFunctionDataOverload,
  generateEncodeFunctionDataOverload,
  generateInterfaceFunctionDescription,
} from './functions';
import generateStruct from './structs';

/**
 * Generate the contract as TS code
 */
export function codegenContractTypings(contract: Contract, codegenConfig: CodegenConfig): string {
  const template = `
  import type {
    Interface,
    FunctionFragment,
    DecodedValue,
    Contract,
    BytesLike,
    BigNumberish,
    InvokeFunction,
    BN,
  } from 'fuels';

  ${Object.values(contract.enums).length ? "import type { Enum, Option } from './common'" : ''}

  ${Object.values(contract.structs)
    .map((v) => generateStruct(v[0]))
    .join('\n')}

  ${Object.values(contract.enums)
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
        .map(codegenFunctions.bind(null, { returnResultObject: undefined, codegenConfig }))
        .join('\n')}
    };
  }`;

  return template;
}

/**
 * Generate the contract factory as TS code
 */
export function codegenAbstractContractFactory(
  contract: Contract,
  abi: RawAbiDefinition[],
  abiRaw: string
): string {
  const { body, header } = codegenCommonContractFactory(contract, abi, abiRaw);
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
  abi: RawAbiDefinition[],
  abiRaw: string
): { header: string; body: string } {
  const header = `
  import type { Provider, BaseWalletLocked, AbstractAddress } from "fuels";
  import { Interface, Contract } from "fuels";
  import type { ${contract.name}, ${contract.name}Interface } from "../${contract.name}";
  const _abi = ${abiRaw};
  `.trim();

  const body = `
    static readonly abi = _abi;
    static createInterface(): ${contract.name}Interface {
      return new Interface(_abi) as unknown as ${contract.name}Interface;
    }
    static connect(id: string | AbstractAddress, walletOrProvider: BaseWalletLocked | Provider): ${contract.name} {
      return new Contract(id, _abi, walletOrProvider) as unknown as ${contract.name};
    }
  `.trim();

  return { header, body };
}
