import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { addressify } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/address/configs';
import type { AddressLike, AbstractAddress } from '@fuel-ts/interfaces';
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

import type { CoinTransactionRequestOutput } from '.';
import { NoWitnessAtIndexError, NoWitnessByOwnerError, ChangeOutputCollisionError } from './errors';
import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';
import { inputify } from './input';
import type { TransactionRequestOutput, ChangeTransactionRequestOutput } from './output';
import { outputify } from './output';
import type { TransactionRequestWitness } from './witness';
import { witnessify } from './witness';

export { TransactionType };

export interface BaseTransactionRequestLike {
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

export abstract class BaseTransactionRequest implements BaseTransactionRequestLike {
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
   * Converts the given Resource to a ResourceInput with the appropriate witnessIndex and pushes it along with
   * a change output
   */
  addResourceInputAndOutput(resource: Resource) {
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

    return this;
  }

  addResourceInputsAndOutputs(resources: ReadonlyArray<Resource>) {
    resources.forEach((resource) => this.addResourceInputAndOutput(resource));

    return this;
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

  /**
   * Determines whether the transaction has a predicate input
   */
  hasPredicateInput(): boolean {
    return Boolean(
      this.inputs.find(
        (input) =>
          input.type === InputType.Coin && input.predicate && input.predicate !== arrayify('0x')
      )
    );
  }
}
