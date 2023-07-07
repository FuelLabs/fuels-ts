import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { InputValue, JsonFlatAbi } from '@fuel-ts/abi-coder';
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

export interface ScriptTransactionRequestLike extends BaseTransactionRequestLike {
  /** Script to execute */
  script?: BytesLike;
  /** Script input data (parameters) */
  scriptData?: BytesLike;
  /** determined bytes offset for start of script data */
  bytesOffset?: number | undefined;
}

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
  /** determined bytes offset for start of script data */
  bytesOffset: number | undefined;

  constructor({ script, scriptData, bytesOffset, ...rest }: ScriptTransactionRequestLike = {}) {
    super(rest);
    this.script = arrayify(script ?? returnZeroScript.bytes);
    this.scriptData = arrayify(scriptData ?? returnZeroScript.encodeScriptData());
    this.bytesOffset = bytesOffset;
  }

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

  getContractInputs(): ContractTransactionRequestInput[] {
    return this.inputs.filter(
      (input): input is ContractTransactionRequestInput => input.type === InputType.Contract
    );
  }

  getContractOutputs(): ContractTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ContractTransactionRequestOutput => output.type === OutputType.Contract
    );
  }

  getVariableOutputs(): VariableTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is VariableTransactionRequestOutput => output.type === OutputType.Variable
    );
  }

  setScript<T>(script: AbstractScriptRequest<T>, data: T) {
    this.script = script.bytes;
    this.scriptData = script.encodeScriptData(data);

    if (this.bytesOffset === undefined) {
      this.bytesOffset = this.scriptData.byteLength;
    }
  }

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

  setData(abi: JsonFlatAbi, args: InputValue[]): ScriptTransactionRequest {
    const abiInterface = new Interface(abi);
    this.scriptData = abiInterface.functions.main.encodeArguments(args);
    return this;
  }
}
