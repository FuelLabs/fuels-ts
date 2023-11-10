import { Address, addressify, getRandomB256 } from '@fuel-ts/address';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import type { AddressLike, AbstractAddress } from '@fuel-ts/interfaces';
import type { BN, BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { TransactionType, TransactionCoder, InputType, OutputType } from '@fuel-ts/transactions';
import type { BytesLike } from 'ethers';
import { getBytesCopy, hexlify } from 'ethers';

import type { CoinQuantity, CoinQuantityLike } from '../coin-quantity';
import { coinQuantityfy } from '../coin-quantity';
import type { CoinResource, MessageCoinResource, Resource } from '../resource';
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
  private addCoinInput(coin: CoinResource) {
    const { assetId, owner, amount } = coin;

    const input: CoinTransactionRequestInput = {
      ...coin,
      type: InputType.Coin,
      owner: owner.toB256(),
      amount,
      assetId,
      txPointer: '0x00000000000000000000000000000000',
      witnessIndex: 0,
    };

    if ('getPredicateContent' in coin) {
      const { predicate, predicateData } = coin.getPredicateContent();
      input.predicate = predicate;
      input.predicateData = predicateData;
    } else {
      input.witnessIndex = this.getCoinInputWitnessIndexByOwner(owner) ?? this.createWitness();
    }

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
  private addMessageInput(message: MessageCoinResource) {
    const { recipient, sender, amount } = message;

    const assetId = BaseAssetId;

    const input: MessageTransactionRequestInput = {
      ...message,
      type: InputType.Message,
      sender: sender.toB256(),
      recipient: recipient.toB256(),
      amount,
      witnessIndex: 0,
    };

    if ('getPredicateContent' in message) {
      const { predicate, predicateData } = message.getPredicateContent();
      input.predicate = predicate;
      input.predicateData = predicateData;
    } else {
      input.witnessIndex = this.getCoinInputWitnessIndexByOwner(recipient) ?? this.createWitness();
    }

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
  private addResource(resource: Resource) {
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
   * If the added resources are from a predicate, the predicate's bytecode and data is also added.
   * Changing the predicate's data _after_ adding the resource will **not** change the `predicateData` of the added resource.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(resources: readonly Resource[]) {
    resources.forEach((resource) => this.addResource(resource));

    return this;
  }

  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(to: AddressLike, amount: BigNumberish, assetId: BytesLike = BaseAssetId) {
    this.pushOutput({
      type: OutputType.Coin,
      to: addressify(to).toB256(),
      amount,
      assetId,
    });

    return this;
  }

  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(to: AddressLike, quantities: CoinQuantityLike[]) {
    quantities.map(coinQuantityfy).forEach((quantity) => {
      this.pushOutput({
        type: OutputType.Coin,
        to: addressify(to).toB256(),
        amount: quantity.amount,
        assetId: quantity.assetId,
      });
    });

    return this;
  }

  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(to: AddressLike, assetId: BytesLike = BaseAssetId) {
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
  calculateFee(gasPriceFactor: BN): CoinQuantity {
    const gasFee = calculatePriceWithFactor(this.gasLimit, this.gasPrice, gasPriceFactor);

    return {
      assetId: BaseAssetId,
      amount: gasFee.isZero() ? bn(1) : gasFee,
    };
  }

  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   */
  fundWithFakeUtxos(quantities: CoinQuantity[]) {
    const hasBaseAssetId = quantities.some(({ assetId }) => assetId === BaseAssetId);

    if (!hasBaseAssetId) {
      quantities.push({ assetId: BaseAssetId, amount: bn(1) });
    }

    const owner = getRandomB256();

    this.inputs = this.inputs.filter((input) => input.type === InputType.Contract);
    this.outputs = this.outputs.filter((output) => output.type !== OutputType.Change);

    const fakeResources = quantities.map(({ assetId, amount }, idx) => ({
      id: `${ZeroBytes32}0${idx}`,
      amount,
      assetId,
      owner: Address.fromB256(owner),
      maturity: 0,
      blockCreated: bn(1),
      txCreatedIdx: bn(1),
    }));

    this.addResources(fakeResources);
  }

  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities(): CoinQuantity[] {
    const coinsQuantities = this.getCoinOutputs().map(({ amount, assetId }) => ({
      amount: bn(amount),
      assetId: assetId.toString(),
    }));

    return coinsQuantities;
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
        (input) => 'predicate' in input && input.predicate && input.predicate !== getBytesCopy('0x')
      )
    );
  }
}
