/* eslint-disable max-classes-per-file */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { addressify } from '@fuel-ts/address';
import { ZeroBytes32, NativeAssetId } from '@fuel-ts/address/configs';
import type {
  AddressLike,
  AbstractAddress,
  ContractIdLike,
  AbstractScriptRequest,
} from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { TransactionType, TransactionCoder, InputType, OutputType } from '@fuel-ts/transactions';
import { GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';

import type { CoinQuantity, CoinQuantityLike } from '../coin-quantity';
import { coinQuantityfy } from '../coin-quantity';
import type { Resource } from '../resource';
import { isCoin } from '../resource';
import { calculatePriceWithFactor, normalizeJSON } from '../utils';

import type {
  CoinTransactionRequestOutput,
  ContractCreatedTransactionRequestOutput,
  ContractTransactionRequestOutput,
  VariableTransactionRequestOutput,
} from '.';
import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  ContractTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';
import { inputify } from './input';
import type { TransactionRequestOutput, ChangeTransactionRequestOutput } from './output';
import { outputify } from './output';
import type { TransactionRequestStorageSlot } from './storage-slot';
import { storageSlotify } from './storage-slot';
import type { TransactionRequestWitness } from './witness';
import { witnessify } from './witness';

export { TransactionType };

// We can't import this from `@fuel-ts/script` because it causes
// cyclic dependency errors so we duplicate it here.
export const returnZeroScript: AbstractScriptRequest<void> = {
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: arrayify('0x24000000'),
  encodeScriptData: () => new Uint8Array(0),
};

export const withdrawScript: AbstractScriptRequest<void> = {
  /*
		The following code loads some basic values into registers and calls SMO to create an output message

		5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
		5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
		4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
		24000000	- RET                [return 0]
		00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
		00000000 00000000 [amount value]
	*/
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: arrayify('0x5040C0105D44C0064C40001124000000'),
  encodeScriptData: () => new Uint8Array(0),
};

interface BaseTransactionRequestLike {
  /** Gas price for transaction */
  gasPrice?: BigNumberish;
  /** Gas limit for transaction */
  gasLimit?: BigNumberish;
  /** Block until which tx cannot be included */
  maturity?: number;
  /** List of inputs */
  inputs?: TransactionRequestInput[];
  /** List of outputs */
  outputs?: TransactionRequestOutput[];
  /** List of witnesses */
  witnesses?: TransactionRequestWitness[];
}

export class ChangeOutputCollisionError extends Error {
  name = 'ChangeOutputCollisionError';
  message = 'A ChangeOutput with the same "assetId" already exists for a different "to" address';
}

export class NoWitnessAtIndexError extends Error {
  name = 'NoWitnessAtIndexError';
  constructor(public readonly index: number) {
    super();
    this.message = `Witness at index "${index}" was not found`;
  }
}

export class NoWitnessByOwnerError extends Error {
  name = 'NoWitnessByOwnerError';
  constructor(public readonly owner: AbstractAddress) {
    super();
    this.message = `A witness for the given owner "${owner}" was not found`;
  }
}

abstract class BaseTransactionRequest implements BaseTransactionRequestLike {
  /** Type of the transaction */
  abstract type: TransactionType;
  /** Gas price for transaction */
  gasPrice: BN;
  /** Gas limit for transaction */
  gasLimit: BN;
  /** Block until which tx cannot be included */
  maturity: number;
  /** List of inputs */
  inputs: TransactionRequestInput[] = [];
  /** List of outputs */
  outputs: TransactionRequestOutput[] = [];
  /** List of witnesses */
  witnesses: TransactionRequestWitness[] = [];

  constructor({
    gasPrice,
    gasLimit,
    maturity,
    inputs,
    outputs,
    witnesses,
  }: BaseTransactionRequestLike = {}) {
    this.gasPrice = bn(gasPrice ?? 0);
    this.gasLimit = bn(gasLimit ?? 0);
    this.maturity = maturity ?? 0;
    this.inputs = [...(inputs ?? [])];
    this.outputs = [...(outputs ?? [])];
    this.witnesses = [...(witnesses ?? [])];
  }

  protected getBaseTransaction(): Pick<
    TransactionScript | TransactionCreate,
    keyof BaseTransactionRequestLike | 'inputsCount' | 'outputsCount' | 'witnessesCount'
  > {
    const inputs = this.inputs?.map(inputify) ?? [];
    const outputs = this.outputs?.map(outputify) ?? [];
    const witnesses = this.witnesses?.map(witnessify) ?? [];
    return {
      gasPrice: this.gasPrice,
      gasLimit: this.gasLimit,
      maturity: this.maturity,
      inputs,
      outputs,
      witnesses,
      inputsCount: inputs.length,
      outputsCount: outputs.length,
      witnessesCount: witnesses.length,
    };
  }

  abstract toTransaction(): TransactionCreate | TransactionScript;

  toTransactionBytes(): Uint8Array {
    return new TransactionCoder().encode(this.toTransaction());
  }

  /**
   * Pushes an input to the list without any side effects and returns the index
   */
  protected pushInput(input: TransactionRequestInput): number {
    this.inputs.push(input);
    return this.inputs.length - 1;
  }

  /**
   * Pushes an output to the list without any side effects and returns the index
   */
  protected pushOutput(output: TransactionRequestOutput): number {
    this.outputs.push(output);
    return this.outputs.length - 1;
  }

  /**
   * Creates an empty witness without any side effects and returns the index
   */
  protected createWitness() {
    this.witnesses.push('0x');
    return this.witnesses.length - 1;
  }

  updateWitnessByOwner(address: AbstractAddress, signature: BytesLike) {
    const witnessIndex = this.getCoinInputWitnessIndexByOwner(address);
    if (typeof witnessIndex === 'number') {
      this.updateWitness(witnessIndex, signature);
    }
  }

  /**
   * Updates an existing witness without any side effects
   */
  updateWitness(index: number, witness: TransactionRequestWitness) {
    if (!this.witnesses[index]) {
      throw new NoWitnessAtIndexError(index);
    }
    this.witnesses[index] = witness;
  }

  getCoinInputs(): CoinTransactionRequestInput[] {
    return this.inputs.filter(
      (input): input is CoinTransactionRequestInput => input.type === InputType.Coin
    );
  }

  getCoinOutputs(): CoinTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is CoinTransactionRequestOutput => output.type === OutputType.Coin
    );
  }

  getChangeOutputs(): ChangeTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ChangeTransactionRequestOutput => output.type === OutputType.Change
    );
  }

  /**
   * Returns the witnessIndex of the found CoinInput
   */
  getCoinInputWitnessIndexByOwner(owner: AddressLike): number | null {
    const ownerAddress = addressify(owner);
    return (
      this.inputs.find(
        (input): input is CoinTransactionRequestInput =>
          input.type === InputType.Coin && hexlify(input.owner) === ownerAddress.toB256()
      )?.witnessIndex ??
      this.inputs.find(
        (input): input is MessageTransactionRequestInput =>
          input.type === InputType.Message && hexlify(input.recipient) === ownerAddress.toB256()
      )?.witnessIndex ??
      null
    );
  }

  /**
   * Updates the witness for the given CoinInput owner
   */
  updateWitnessByCoinInputOwner(owner: AddressLike, witness: BytesLike) {
    const witnessIndex = this.getCoinInputWitnessIndexByOwner(owner);

    if (!witnessIndex) {
      throw new NoWitnessByOwnerError(addressify(owner));
    }

    this.updateWitness(witnessIndex, witness);
  }

  /**
   * Converts the given Resource to a ResourceInput with the appropriate witnessIndex and pushes it
   */
  addResource(resource: Resource) {
    const ownerAddress = isCoin(resource) ? resource.owner : resource.recipient;
    const assetId = isCoin(resource) ? resource.assetId : NativeAssetId;
    const type = isCoin(resource) ? InputType.Coin : InputType.Message;
    let witnessIndex = this.getCoinInputWitnessIndexByOwner(ownerAddress);

    // Insert a dummy witness if no witness exists
    if (typeof witnessIndex !== 'number') {
      witnessIndex = this.createWitness();
    }

    // Insert the Input
    this.pushInput(
      isCoin(resource)
        ? ({
            type,
            ...resource,
            owner: resource.owner.toB256(),
            witnessIndex,
            txPointer: '0x00000000000000000000000000000000',
          } as CoinTransactionRequestInput)
        : ({
            type,
            ...resource,
            sender: resource.sender.toB256(),
            recipient: resource.recipient.toB256(),
            witnessIndex,
            txPointer: '0x00000000000000000000000000000000',
          } as MessageTransactionRequestInput)
    );

    // Find the ChangeOutput for the AssetId of the Resource
    const changeOutput = this.getChangeOutputs().find(
      (output) => hexlify(output.assetId) === assetId
    );

    // Throw if the existing ChangeOutput is not for the same owner
    if (changeOutput && hexlify(changeOutput.to) !== ownerAddress.toB256()) {
      throw new ChangeOutputCollisionError();
    }

    // Insert a ChangeOutput if it does not exist
    if (!changeOutput) {
      this.pushOutput({
        type: OutputType.Change,
        to: ownerAddress.toB256(),
        assetId,
      });
    }
  }

  addResources(resources: ReadonlyArray<Resource>) {
    resources.forEach((resource) => this.addResource(resource));
  }

  addCoinOutput(
    /** Address of the destination */
    to: AddressLike,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = NativeAssetId
  ) {
    this.pushOutput({
      type: OutputType.Coin,
      to: addressify(to).toB256(),
      amount,
      assetId,
    });
  }

  addCoinOutputs(
    /** Address of the destination */
    to: AddressLike,
    /** Quantities of coins */
    quantities: CoinQuantityLike[]
  ) {
    quantities.map(coinQuantityfy).forEach((quantity) => {
      this.pushOutput({
        type: OutputType.Coin,
        to: addressify(to).toB256(),
        amount: quantity.amount,
        assetId: quantity.assetId,
      });
    });
  }

  byteSize() {
    return this.toTransactionBytes().length;
  }

  chargeableByteSize() {
    const witnessSize = this.witnesses.reduce((total, w) => total + arrayify(w).length, 0);
    return bn(this.toTransactionBytes().length - witnessSize);
  }

  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * Note: this is required even gasPrice = 0
   */
  calculateFee(): CoinQuantity {
    const gasFee = calculatePriceWithFactor(this.gasLimit, this.gasPrice, GAS_PRICE_FACTOR);

    return {
      assetId: NativeAssetId,
      amount: gasFee.isZero() ? bn(1) : gasFee,
    };
  }

  toJSON() {
    return normalizeJSON(this);
  }
}

export interface ScriptTransactionRequestLike extends BaseTransactionRequestLike {
  /** Script to execute */
  script?: BytesLike;
  /** Script input data (parameters) */
  scriptData?: BytesLike;
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

  constructor({ script, scriptData, ...rest }: ScriptTransactionRequestLike = {}) {
    super(rest);
    this.script = arrayify(script ?? returnZeroScript.bytes);
    this.scriptData = arrayify(scriptData ?? returnZeroScript.encodeScriptData());
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

  addMessageOutputs(numberOfMessages: number = 1) {
    let outputsNumber = numberOfMessages;

    while (outputsNumber) {
      this.pushOutput({
        type: OutputType.Message,
        recipient: '0x0000000000000000000000000000000000000000000000000000000000000000',
        amount: 0,
      });
      outputsNumber -= 1;
    }

    return this.outputs.length - 1;
  }

  addContract(contract: ContractIdLike) {
    const contractAddress = addressify(contract);

    // Add only one input contract per contractId
    if (this.getContractInputs().find((i) => i.contractId === contractAddress.toB256())) {
      return;
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
  }
}

export interface CreateTransactionRequestLike extends BaseTransactionRequestLike {
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex?: number;
  /** Salt */
  salt?: BytesLike;
  /** List of storage slots to initialize */
  storageSlots?: TransactionRequestStorageSlot[];
}

export class CreateTransactionRequest extends BaseTransactionRequest {
  static from(obj: CreateTransactionRequestLike) {
    if (obj instanceof this) {
      return obj;
    }
    return new this(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Create as const;
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex: number;
  /** Salt */
  salt: string;
  /** List of storage slots to initialize */
  storageSlots: TransactionRequestStorageSlot[];

  constructor({
    bytecodeWitnessIndex,
    salt,
    storageSlots,
    ...rest
  }: CreateTransactionRequestLike = {}) {
    super(rest);
    this.bytecodeWitnessIndex = bytecodeWitnessIndex ?? 0;
    this.salt = hexlify(salt ?? ZeroBytes32);
    this.storageSlots = [...(storageSlots ?? [])];
  }

  toTransaction(): TransactionCreate {
    const baseTransaction = this.getBaseTransaction();
    const bytecodeWitnessIndex = this.bytecodeWitnessIndex;
    const storageSlots = this.storageSlots?.map(storageSlotify) ?? [];
    return {
      type: TransactionType.Create,
      ...baseTransaction,
      bytecodeLength: baseTransaction.witnesses[bytecodeWitnessIndex].dataLength / 4,
      bytecodeWitnessIndex,
      storageSlotsCount: storageSlots.length,
      salt: this.salt ? hexlify(this.salt) : ZeroBytes32,
      storageSlots,
    };
  }

  getContractCreatedOutputs(): ContractCreatedTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ContractCreatedTransactionRequestOutput =>
        output.type === OutputType.ContractCreated
    );
  }

  addContractCreatedOutput(
    /** Contract ID */
    contractId: BytesLike,
    /** State Root */
    stateRoot: BytesLike
  ) {
    this.pushOutput({
      type: OutputType.ContractCreated,
      contractId,
      stateRoot,
    });
  }
}

export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;
export type TransactionRequestLike =
  | ({ type: TransactionType.Script } & ScriptTransactionRequestLike)
  | ({ type: TransactionType.Create } & CreateTransactionRequestLike);

export const transactionRequestify = (obj: TransactionRequestLike): TransactionRequest => {
  if (obj instanceof ScriptTransactionRequest || obj instanceof CreateTransactionRequest) {
    return obj;
  }
  switch (obj.type) {
    case TransactionType.Script: {
      return ScriptTransactionRequest.from(obj);
    }
    case TransactionType.Create: {
      return CreateTransactionRequest.from(obj);
    }
    default: {
      throw new Error(
        `Unknown transaction type: ${
          // @ts-expect-error Unreachable code
          obj.type
        }`
      );
    }
  }
};
