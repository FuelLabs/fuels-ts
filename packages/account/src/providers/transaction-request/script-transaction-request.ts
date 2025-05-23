import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { addressify } from '@fuel-ts/address';
import type { ContractIdLike } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import type { BN, BigNumberish } from '@fuel-ts/math';
import type { TransactionScript } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { Account } from '../../account';
import type { ChainInfo, GasCosts, TransactionCostParams } from '../provider';
import { calculateMetadataGasForTxScript, getMaxGas } from '../utils/gas';

import { hashTransaction } from './hash-transaction';
import type { ContractTransactionRequestInput } from './input';
import type { ContractTransactionRequestOutput, VariableTransactionRequestOutput } from './output';
import { returnZeroScript } from './scripts';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest } from './transaction-request';
import type { AbstractScriptRequest, JsonAbisFromAllCalls } from './types';

/**
 * @hidden
 */
export interface ScriptTransactionRequestLike extends BaseTransactionRequestLike {
  /** Gas limit for transaction */
  gasLimit?: BigNumberish;
  /** Script to execute */
  script?: BytesLike;
  /** Script input data (parameters) */
  scriptData?: BytesLike;

  abis?: JsonAbisFromAllCalls;
}

/**
 * `ScriptTransactionRequest` provides functionalities for creating a transaction request that uses a script.
 */
export class ScriptTransactionRequest extends BaseTransactionRequest {
  static from(obj: ScriptTransactionRequestLike) {
    return new this(clone(obj));
  }

  /** Type of the transaction */
  type = TransactionType.Script as const;
  /** Gas limit for transaction */
  gasLimit: BN;
  /** Script to execute */
  script: Uint8Array;
  /** Script input data (parameters) */
  scriptData: Uint8Array;

  abis?: JsonAbisFromAllCalls;

  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script, scriptData, gasLimit, ...rest }: ScriptTransactionRequestLike = {}) {
    super(rest);
    this.gasLimit = bn(gasLimit);
    this.script = arrayify(script ?? returnZeroScript.bytes);
    this.scriptData = arrayify(scriptData ?? returnZeroScript.encodeScriptData());
    this.abis = rest.abis;
  }

  /**
   * Helper function to estimate and fund the transaction request with a specified account.
   *
   * @param account - The account to fund the transaction.
   * @param params - The parameters for the transaction cost.
   * @returns The current instance of the `ScriptTransactionRequest` funded.
   *
   * @deprecated Use `provider.assembleTx` instead.
   * Check the migration guide https://docs.fuel.network/guide/assembling-transactions/migration-guide.html for more information.
   */
  async estimateAndFund(
    account: Account,
    { signatureCallback, quantities = [] }: TransactionCostParams = {}
  ): Promise<ScriptTransactionRequest> {
    const txCost = await account.getTransactionCost(this, { signatureCallback, quantities });

    this.maxFee = txCost.maxFee;
    this.gasLimit = txCost.gasUsed;

    await account.fund(this, txCost);

    return this;
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
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: bn(script.length),
      scriptDataLength: bn(scriptData.length),
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
   * Adds a variable output to the transaction request.
   *
   * @param to - The recipient address as a BytesLike object. Defaults to ZeroBytes32 if not provided.
   * @param amount - The amount to be transferred as a BigNumberish object. Defaults to 0 if not provided.
   * @param assetId - The asset ID as a BytesLike object. Defaults to ZeroBytes32 if not provided.
   */
  addVariableOutput(to?: BytesLike, amount?: BigNumberish, assetId?: BytesLike) {
    this.pushOutput({
      type: OutputType.Variable,
      to,
      amount,
      assetId,
    });
  }

  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  override calculateMaxGas(chainInfo: ChainInfo, minGas: BN): BN {
    const { consensusParameters } = chainInfo;
    const {
      feeParameters: { gasPerByte },
      txParameters: { maxGasPerTx },
    } = consensusParameters;

    const witnessesLength = this.toTransaction().witnesses.reduce(
      (acc, wit) => acc + wit.dataLength,
      0
    );

    return getMaxGas({
      gasPerByte,
      minGas,
      witnessesLength,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit,
      maxGasPerTx,
    });
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
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
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
    this.scriptData = abiInterface.functions.main.encodeArguments(args);
    return this;
  }

  override metadataGas(gasCosts: GasCosts): BN {
    return calculateMetadataGasForTxScript({
      gasCosts,
      txBytesSize: this.byteSize(),
    });
  }
}
