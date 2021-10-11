/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */

import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import Coder from '../abi-coder/coders/abstract-coder';
import ArrayCoder from '../abi-coder/coders/array';
import B256Coder from '../abi-coder/coders/b256';
import NumberCoder from '../abi-coder/coders/number';
import { Input, InputCoder } from './input';
import { Output, OutputCoder } from './output';
import { Witness, WitnessCoder } from './witness';

export enum TransactionType /* u8 */ {
  Script = 0,
  Create = 1,
}

export type Transaction =
  | {
      type: TransactionType.Script;
      data: TransactionScript;
    }
  | {
      type: TransactionType.Create;
      data: TransactionCreate;
    };

export class TransactionCoder extends Coder {
  constructor(localName: string) {
    super('Transaction', 'Transaction', localName);
  }

  encode(value: Transaction): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('type', 'u8').encode(value.type));
    switch (value.type) {
      case TransactionType.Script: {
        parts.push(new TransactionScriptCoder('data').encode(value.data));
        break;
      }
      case TransactionType.Create: {
        parts.push(new TransactionCreateCoder('data').encode(value.data));
        break;
      }
      default: {
        throw new Error('Invalid Transaction type');
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Transaction, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('type', 'u8').decode(data, o);
    const type = decoded.toNumber() as TransactionType;
    switch (type) {
      case TransactionType.Script: {
        [decoded, o] = new TransactionScriptCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case TransactionType.Create: {
        [decoded, o] = new TransactionCreateCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      default: {
        throw new Error('Invalid Input type');
      }
    }
  }
}

type TransactionScript = {
  // Gas price for transaction (u64)
  gasPrice: BigNumber;
  // Gas limit for transaction (u64)
  gasLimit: BigNumber;
  // Block until which tx cannot be included (u32)
  maturity: BigNumber;
  // Script length, in instructions (u16)
  scriptLength: BigNumber;
  // Length of script input data, in bytes (u16)
  scriptDataLength: BigNumber;
  // Number of inputs (u8)
  inputsCount: BigNumber;
  // Number of outputs (u8)
  outputsCount: BigNumber;
  // Number of witnesses (u8)
  witnessesCount: BigNumber;
  // Merkle root of receipts (b256)
  receiptsRoot: string;
  // Script to execute (byte[])
  script: string;
  // Script input data (parameters) (byte[])
  scriptData: string;
  // List of inputs (Input[])
  inputs: Input[];
  // List of outputs (Output[])
  outputs: Output[];
  // List of witnesses (Witness[])
  witnesses: Witness[];
};

export class TransactionScriptCoder extends Coder {
  constructor(localName: string) {
    super('TransactionScript', 'TransactionScript', localName);
  }

  encode(value: TransactionScript): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('gasPrice', 'u64').encode(value.gasPrice));
    parts.push(new NumberCoder('gasLimit', 'u64').encode(value.gasLimit));
    parts.push(new NumberCoder('maturity', 'u32').encode(value.maturity));
    parts.push(new NumberCoder('scriptLength', 'u16').encode(value.scriptLength));
    parts.push(new NumberCoder('scriptDataLength', 'u16').encode(value.scriptDataLength));
    parts.push(new NumberCoder('inputsCount', 'u8').encode(value.inputsCount));
    parts.push(new NumberCoder('outputsCount', 'u8').encode(value.outputsCount));
    parts.push(new NumberCoder('witnessesCount', 'u8').encode(value.witnessesCount));
    parts.push(new B256Coder('receiptsRoot', 'b256').encode(value.receiptsRoot));
    parts.push(arrayify(value.script));
    parts.push(arrayify(value.scriptData));
    parts.push(
      new ArrayCoder(new InputCoder('input'), value.inputsCount.toNumber(), 'inputs').encode(
        value.inputs
      )
    );
    parts.push(
      new ArrayCoder(new OutputCoder('output'), value.outputsCount.toNumber(), 'outputs').encode(
        value.outputs
      )
    );
    parts.push(
      new ArrayCoder(
        new WitnessCoder('witness'),
        value.witnessesCount.toNumber(),
        'witnesses'
      ).encode(value.witnesses)
    );

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionScript, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('gasPrice', 'u64').decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new NumberCoder('gasLimit', 'u64').decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('maturity', 'u32').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('scriptLength', 'u16').decode(data, o);
    const scriptLength = decoded;
    [decoded, o] = new NumberCoder('scriptDataLength', 'u16').decode(data, o);
    const scriptDataLength = decoded;
    [decoded, o] = new NumberCoder('inputsCount', 'u8').decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = new NumberCoder('outputsCount', 'u8').decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = new NumberCoder('witnessesCount', 'u8').decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder('receiptsRoot', 'b256').decode(data, o);
    const receiptsRoot = decoded;
    [decoded, o] = [hexlify(data.slice(o, scriptLength.toNumber())), o + scriptLength.toNumber()];
    const script = decoded;
    [decoded, o] = [
      hexlify(data.slice(o, scriptDataLength.toNumber())),
      o + scriptDataLength.toNumber(),
    ];
    const scriptData = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder('input'), inputsCount.toNumber(), 'inputs').decode(
      data,
      o
    );
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(
      new OutputCoder('output'),
      outputsCount.toNumber(),
      'outputs'
    ).decode(data, o);
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(
      new WitnessCoder('witness'),
      witnessesCount.toNumber(),
      'witnesses'
    ).decode(data, o);
    const witnesses = decoded;

    return [
      {
        gasPrice,
        gasLimit,
        maturity,
        scriptLength,
        scriptDataLength,
        inputsCount,
        outputsCount,
        witnessesCount,
        receiptsRoot,
        script,
        scriptData,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        outputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        witnesses,
      },
      o,
    ];
  }
}

type TransactionCreate = {
  // Gas price for transaction (u64)
  gasPrice: BigNumber;
  // Gas limit for transaction (u64)
  gasLimit: BigNumber;
  // Block until which tx cannot be included (u32)
  maturity: BigNumber;
  // Contract bytecode length, in instructions (u16)
  bytecodeLength: BigNumber;
  // Witness index of contract bytecode to create (u8)
  bytecodeWitnessIndex: BigNumber;
  // Number of static contracts (u8)
  staticContractsCount: BigNumber;
  // Number of inputs (u8)
  inputsCount: BigNumber;
  // Number of outputs (u8)
  outputsCount: BigNumber;
  // Number of witnesses (u8)
  witnessesCount: BigNumber;
  // Salt (b256)
  salt: string;
  // List of static contracts (b256[])
  staticContracts: string[];
  // List of inputs (Input[])
  inputs: Input[];
  // List of outputs (Output[])
  outputs: Output[];
  // List of witnesses (Witness[])
  witnesses: Witness[];
};

export class TransactionCreateCoder extends Coder {
  constructor(localName: string) {
    super('TransactionCreate', 'TransactionCreate', localName);
  }

  encode(value: TransactionCreate): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('gasPrice', 'u64').encode(value.gasPrice));
    parts.push(new NumberCoder('gasLimit', 'u64').encode(value.gasLimit));
    parts.push(new NumberCoder('maturity', 'u32').encode(value.maturity));
    parts.push(new NumberCoder('bytecodeLength', 'u16').encode(value.bytecodeLength));
    parts.push(new NumberCoder('bytecodeWitnessIndex', 'u8').encode(value.bytecodeLength));
    parts.push(new NumberCoder('staticContractsCount', 'u8').encode(value.staticContractsCount));
    parts.push(new NumberCoder('inputsCount', 'u8').encode(value.inputsCount));
    parts.push(new NumberCoder('outputsCount', 'u8').encode(value.outputsCount));
    parts.push(new NumberCoder('witnessesCount', 'u8').encode(value.witnessesCount));
    parts.push(new B256Coder('salt', 'b256').encode(value.salt));
    parts.push(
      new ArrayCoder(
        new B256Coder('staticContract', 'b256'),
        value.staticContractsCount.toNumber(),
        'staticContracts'
      ).encode(value.staticContracts)
    );
    parts.push(
      new ArrayCoder(new InputCoder('input'), value.inputsCount.toNumber(), 'inputs').encode(
        value.inputs
      )
    );
    parts.push(
      new ArrayCoder(new OutputCoder('output'), value.outputsCount.toNumber(), 'outputs').encode(
        value.outputs
      )
    );
    parts.push(
      new ArrayCoder(
        new WitnessCoder('witness'),
        value.witnessesCount.toNumber(),
        'witnesses'
      ).encode(value.witnesses)
    );

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionCreate, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('gasPrice', 'u64').decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new NumberCoder('gasLimit', 'u64').decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('maturity', 'u32').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('bytecodeLength', 'u16').decode(data, o);
    const bytecodeLength = decoded;
    [decoded, o] = new NumberCoder('bytecodeWitnessIndex', 'u8').decode(data, o);
    const bytecodeWitnessIndex = decoded;
    [decoded, o] = new NumberCoder('staticContractsCount', 'u8').decode(data, o);
    const staticContractsCount = decoded;
    [decoded, o] = new NumberCoder('inputsCount', 'u8').decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = new NumberCoder('outputsCount', 'u8').decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = new NumberCoder('witnessesCount', 'u8').decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder('salt', 'b256').decode(data, o);
    const salt = decoded;
    [decoded, o] = new ArrayCoder(
      new B256Coder('staticContract', 'b256'),
      staticContractsCount.toNumber(),
      'staticContracts'
    ).decode(data, o);
    const staticContracts = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder('input'), inputsCount.toNumber(), 'inputs').decode(
      data,
      o
    );
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(
      new OutputCoder('output'),
      outputsCount.toNumber(),
      'outputs'
    ).decode(data, o);
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(
      new WitnessCoder('witness'),
      witnessesCount.toNumber(),
      'witnesses'
    ).decode(data, o);
    const witnesses = decoded;

    return [
      {
        gasPrice,
        gasLimit,
        maturity,
        bytecodeLength,
        bytecodeWitnessIndex,
        staticContractsCount,
        inputsCount,
        outputsCount,
        witnessesCount,
        salt,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignores
        staticContracts,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        outputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        witnesses,
      },
      o,
    ];
  }
}
