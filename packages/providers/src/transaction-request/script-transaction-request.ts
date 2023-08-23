import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { addressify } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import type { AbstractScriptRequest, ContractIdLike } from '@fuel-ts/interfaces';
import type { TransactionScript } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType } from '@fuel-ts/transactions';

import type { ContractTransactionRequestInput } from './input';
import type { ContractTransactionRequestOutput, VariableTransactionRequestOutput } from './output';
import { returnZeroScript } from './scripts';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest } from './transaction-request';

/**
 * @hidden
 */
export interface ScriptTransactionRequestLike extends BaseTransactionRequestLike {
  /** Script to execute */
  script?: BytesLike;
  /** Script input data (parameters) */
  scriptData?: BytesLike;
}

/**
 * `ScriptTransactionRequest` provides functionalities for creating a transaction request that uses a script.
 */
export class ScriptTransactionRequest extends BaseTransactionRequest {
  static from(obj: ScriptTransactionRequestLike) {
    if (obj instanceof this) {
      return obj;
    }
    return new this(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Script as const;
  /** Script to execute */
  script: Uint8Array;
  /** Script input data (parameters) */
  scriptData: Uint8Array;

  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script, scriptData, ...rest }: ScriptTransactionRequestLike = {}) {
    super(rest);
    this.script = arrayify(script ?? returnZeroScript.bytes);
    this.scriptData = arrayify(scriptData ?? returnZeroScript.encodeScriptData());
  }

  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction(): TransactionScript {
    const script = arrayify(this.script ?? '0x');
    const scriptData = arrayify(this.scriptData ?? '0x');
    return {
      type: TransactionType.Script,
      ...super.getBaseTransaction(),
      scriptLength: script.length,
      scriptDataLength: scriptData.length,
      receiptsRoot: ZeroBytes32,
      script: hexlify(script),
      scriptData: hexlify(scriptData),
    };
  }

  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs(): ContractTransactionRequestInput[] {
    return this.inputs.filter(
      (input): input is ContractTransactionRequestInput => input.type === InputType.Contract
    );
  }

  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs(): ContractTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ContractTransactionRequestOutput => output.type === OutputType.Contract
    );
  }

  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs(): VariableTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is VariableTransactionRequestOutput => output.type === OutputType.Variable
    );
  }

  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript<T>(script: AbstractScriptRequest<T>, data: T) {
    this.scriptData = script.encodeScriptData(data);
    this.script = script.bytes;
  }

  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(numberOfVariables: number = 1) {
    let outputsNumber = numberOfVariables;

    while (outputsNumber) {
      this.pushOutput({
        type: OutputType.Variable,
      });
      outputsNumber -= 1;
    }

    return this.outputs.length - 1;
  }

  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(contract: ContractIdLike): ScriptTransactionRequest {
    const contractAddress = addressify(contract);

    // Add only one input contract per contractId
    if (this.getContractInputs().find((i) => i.contractId === contractAddress.toB256())) {
      return this;
    }

    const inputIndex = super.pushInput({
      type: InputType.Contract,
      contractId: contractAddress.toB256(),
      txPointer: '0x00000000000000000000000000000000',
    });

    this.pushOutput({
      type: OutputType.Contract,
      inputIndex,
    });

    return this;
  }

  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(abi: JsonAbi, args: InputValue[]): ScriptTransactionRequest {
    const abiInterface = new Interface(abi);
    this.scriptData = abiInterface.encodeFunctionData('main', args);
    return this;
  }
}
