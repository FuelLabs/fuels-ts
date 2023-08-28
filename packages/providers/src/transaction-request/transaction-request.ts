import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { addressify } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { AddressLike, AbstractAddress } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { TransactionType, TransactionCoder, InputType, OutputType } from '@fuel-ts/transactions';
import { GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';

import type { Coin } from '../coin';
import type { CoinQuantity, CoinQuantityLike } from '../coin-quantity';
import { coinQuantityfy } from '../coin-quantity';
import type { MessageCoin } from '../message';
import type { Resource } from '../resource';
import { isCoin } from '../resource';
import { calculatePriceWithFactor, normalizeJSON } from '../utils';

import type { CoinTransactionRequestOutput } from '.';
import { NoWitnessAtIndexError, ChangeOutputCollisionError } from './errors';
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

export {
  /**
   * @hidden
   */
  TransactionType,
};

/**
 * @hidden
 *
 * Interface defining a like structure for a base transaction request.
 */
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

/**
 * Abstract class to define the functionalities of a transaction request transaction request.
 */
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

  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    gasPrice,
    gasLimit,
    maturity,
    inputs,
    outputs,
    witnesses,
  }: BaseTransactionRequestLike = {}) {
    this.gasPrice = bn(gasPrice);
    this.gasLimit = bn(gasLimit);
    this.maturity = maturity ?? 0;
    this.inputs = inputs ?? [];
    this.outputs = outputs ?? [];
    this.witnesses = witnesses ?? [];
  }

  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
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

  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes(): Uint8Array {
    return new TransactionCoder().encode(this.toTransaction());
  }

  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  protected pushInput(input: TransactionRequestInput): number {
    this.inputs.push(input);
    return this.inputs.length - 1;
  }

  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  protected pushOutput(output: TransactionRequestOutput): number {
    this.outputs.push(output);
    return this.outputs.length - 1;
  }

  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   */
  protected createWitness() {
    this.witnesses.push('0x');
    return this.witnesses.length - 1;
  }

  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(address: AbstractAddress, signature: BytesLike) {
    const witnessIndex = this.getCoinInputWitnessIndexByOwner(address);
    if (typeof witnessIndex === 'number') {
      this.updateWitness(witnessIndex, signature);
    }
  }

  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(index: number, witness: TransactionRequestWitness) {
    if (!this.witnesses[index]) {
      throw new NoWitnessAtIndexError(index);
    }
    this.witnesses[index] = witness;
  }

  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs(): CoinTransactionRequestInput[] {
    return this.inputs.filter(
      (input): input is CoinTransactionRequestInput => input.type === InputType.Coin
    );
  }

  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs(): CoinTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is CoinTransactionRequestOutput => output.type === OutputType.Coin
    );
  }

  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs(): ChangeTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ChangeTransactionRequestOutput => output.type === OutputType.Change
    );
  }

  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(owner: AddressLike): number | undefined {
    const ownerAddress = addressify(owner);

    const found = this.inputs.find((input) => {
      switch (input.type) {
        case InputType.Coin:
          return hexlify((<CoinTransactionRequestInput>input).owner) === ownerAddress.toB256();
        case InputType.Message:
          return (
            hexlify((<MessageTransactionRequestInput>input).recipient) === ownerAddress.toB256()
          );
        default:
          return false;
      }
    });

    return (<CoinTransactionRequestInput>found)?.witnessIndex;
  }

  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addCoinInput(coin: Coin, predicate?: BytesLike, predicateData?: BytesLike) {
    const { assetId, owner, amount } = coin;

    let witnessIndex;

    if (predicate) {
      witnessIndex = 0;
    } else {
      witnessIndex = this.getCoinInputWitnessIndexByOwner(owner);

      // Insert a dummy witness if no witness exists
      if (typeof witnessIndex !== 'number') {
        witnessIndex = this.createWitness();
      }
    }

    const input: CoinTransactionRequestInput = {
      ...coin,
      type: InputType.Coin,
      owner: owner.toB256(),
      amount,
      assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex,
      predicate,
      predicateData,
    };

    // Insert the Input
    this.pushInput(input);

    // Insert a ChangeOutput if it does not exist
    this.addChangeOutput(owner, assetId);
  }

  /**
   * Adds a single message input to the transaction and a change output for the
   * baseAssetId, if one it was not added yet.
   *
   * @param message - Message resource.
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addMessageInput(message: MessageCoin, predicate?: BytesLike, predicateData?: BytesLike) {
    const { recipient, sender, amount } = message;

    const assetId = BaseAssetId;

    let witnessIndex;

    if (predicate) {
      witnessIndex = 0;
    } else {
      witnessIndex = this.getCoinInputWitnessIndexByOwner(recipient);

      // Insert a dummy witness if no witness exists
      if (typeof witnessIndex !== 'number') {
        witnessIndex = this.createWitness();
      }
    }

    const input: MessageTransactionRequestInput = {
      ...message,
      type: InputType.Message,
      sender: sender.toB256(),
      recipient: recipient.toB256(),
      amount,
      witnessIndex,
      predicate,
      predicateData,
    };

    // Insert the Input
    this.pushInput(input);

    // Insert a ChangeOutput if it does not exist
    this.addChangeOutput(recipient, assetId);
  }

  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(resource: Resource) {
    if (isCoin(resource)) {
      this.addCoinInput(resource);
    } else {
      this.addMessageInput(resource);
    }

    return this;
  }

  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(resources: ReadonlyArray<Resource>) {
    resources.forEach((resource) => this.addResource(resource));

    return this;
  }

  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResource(resource: Resource, predicate: BytesLike, predicateData?: BytesLike) {
    if (isCoin(resource)) {
      this.addCoinInput(resource, predicate, predicateData);
    } else {
      this.addMessageInput(resource, predicate, predicateData);
    }

    return this;
  }

  /**
   * Adds multiple predicate coin/message inputs to the transaction and change outputs
   * from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResources(resources: Coin[], predicate: BytesLike, predicateData?: BytesLike) {
    resources.forEach((resource) => this.addPredicateResource(resource, predicate, predicateData));

    return this;
  }

  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(
    /** Address of the destination */
    to: AddressLike,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId
  ) {
    this.pushOutput({
      type: OutputType.Coin,
      to: addressify(to).toB256(),
      amount,
      assetId,
    });
  }

  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
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

  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(
    /** Address of the destination */
    to: AddressLike,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId
  ) {
    // Find the ChangeOutput for the AssetId of the Resource
    const changeOutput = this.getChangeOutputs().find(
      (output) => hexlify(output.assetId) === assetId
    );

    // Throw if the existing ChangeOutput is not for the same owner
    if (changeOutput && hexlify(changeOutput.to) !== addressify(to).toB256()) {
      throw new ChangeOutputCollisionError();
    }

    // Insert a ChangeOutput if it does not exist
    if (!changeOutput) {
      this.pushOutput({
        type: OutputType.Change,
        to: addressify(to).toB256(),
        assetId,
      });
    }
  }

  /**
   * @hidden
   */
  byteSize() {
    return this.toTransactionBytes().length;
  }

  /**
   * Return the minimum amount in native coins required to create
   * a transaction. This is required even if the gasPrice is 0.
   *
   * @returns The minimum amount in coins required to create a transaction.
   */
  calculateFee(): CoinQuantity {
    const gasFee = calculatePriceWithFactor(this.gasLimit, this.gasPrice, GAS_PRICE_FACTOR);

    return {
      assetId: BaseAssetId,
      amount: gasFee.isZero() ? bn(1) : gasFee,
    };
  }

  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return normalizeJSON(this);
  }

  /**
   * @hidden
   *
   * Determines whether the transaction has a predicate input.
   *
   * @returns Whether the transaction has a predicate input.
   */
  hasPredicateInput(): boolean {
    return Boolean(
      this.inputs.find(
        (input) => 'predicate' in input && input.predicate && input.predicate !== arrayify('0x')
      )
    );
  }
}
