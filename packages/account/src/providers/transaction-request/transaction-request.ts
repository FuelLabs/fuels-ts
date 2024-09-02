import { UTXO_ID_LEN } from '@fuel-ts/abi-coder';
import { Address, addressify } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import type { AddressLike, AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BN, BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionScript,
  Policy,
  TransactionCreate,
  TransactionBlob,
} from '@fuel-ts/transactions';
import {
  PolicyType,
  TransactionCoder,
  InputType,
  OutputType,
  TransactionType,
} from '@fuel-ts/transactions';
import { concat, hexlify, isDefined } from '@fuel-ts/utils';

import type { Account } from '../../account';
import type { Coin } from '../coin';
import type { CoinQuantity, CoinQuantityLike } from '../coin-quantity';
import { coinQuantityfy } from '../coin-quantity';
import { isMessageCoin, type Message, type MessageCoin } from '../message';
import type { ChainInfo, GasCosts } from '../provider';
import type { Resource } from '../resource';
import { isCoin } from '../resource';
import { normalizeJSON } from '../utils';
import { getMaxGas, getMinGas } from '../utils/gas';

import { NoWitnessAtIndexError } from './errors';
import {
  getRequestInputResourceOwner,
  isRequestInputCoinOrMessage,
  isRequestInputResource,
  isRequestInputResourceFromOwner,
} from './helpers';
import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';
import { inputify } from './input';
import type {
  TransactionRequestOutput,
  ChangeTransactionRequestOutput,
  CoinTransactionRequestOutput,
} from './output';
import { outputify } from './output';
import type { TransactionRequestLike } from './types';
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
  tip?: BigNumberish;
  /** Block until which tx cannot be included */
  maturity?: number;
  /** The maximum fee payable by this transaction using BASE_ASSET. */
  maxFee?: BigNumberish;
  /** The maximum amount of witness data allowed for the transaction */
  witnessLimit?: BigNumberish;
  /** List of inputs */
  inputs?: TransactionRequestInput[];
  /** List of outputs */
  outputs?: TransactionRequestOutput[];
  /** List of witnesses */
  witnesses?: TransactionRequestWitness[];
}

type ToBaseTransactionResponse = Pick<
  TransactionScript,
  | 'inputs'
  | 'inputsCount'
  | 'outputs'
  | 'outputsCount'
  | 'witnesses'
  | 'witnessesCount'
  | 'policies'
  | 'policyTypes'
>;

/**
 * Abstract class to define the functionalities of a transaction request transaction request.
 */
export abstract class BaseTransactionRequest implements BaseTransactionRequestLike {
  /** Type of the transaction */
  abstract type: TransactionType;
  /** Gas price for transaction */
  tip?: BN;
  /** Block until which tx cannot be included */
  maturity?: number;
  /** The maximum fee payable by this transaction using BASE_ASSET. */
  maxFee: BN;
  /** The maximum amount of witness data allowed for the transaction */
  witnessLimit?: BN | undefined;
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
    tip,
    maturity,
    maxFee,
    witnessLimit,
    inputs,
    outputs,
    witnesses,
  }: BaseTransactionRequestLike = {}) {
    this.tip = tip ? bn(tip) : undefined;
    this.maturity = maturity && maturity > 0 ? maturity : undefined;
    this.witnessLimit = isDefined(witnessLimit) ? bn(witnessLimit) : undefined;
    this.maxFee = bn(maxFee);
    this.inputs = inputs ?? [];
    this.outputs = outputs ?? [];
    this.witnesses = witnesses ?? [];
  }

  static getPolicyMeta(req: BaseTransactionRequest) {
    let policyTypes = 0;
    const policies: Policy[] = [];

    const { tip, witnessLimit, maturity } = req;

    if (bn(tip).gt(0)) {
      policyTypes += PolicyType.Tip;
      policies.push({ data: bn(tip), type: PolicyType.Tip });
    }
    if (isDefined(witnessLimit) && bn(witnessLimit).gte(0)) {
      policyTypes += PolicyType.WitnessLimit;
      policies.push({ data: bn(witnessLimit), type: PolicyType.WitnessLimit });
    }
    if (maturity && maturity > 0) {
      policyTypes += PolicyType.Maturity;
      policies.push({ data: maturity, type: PolicyType.Maturity });
    }

    policyTypes += PolicyType.MaxFee;
    policies.push({ data: req.maxFee, type: PolicyType.MaxFee });

    return {
      policyTypes,
      policies,
    };
  }

  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */

  protected getBaseTransaction(): ToBaseTransactionResponse {
    const inputs = this.inputs?.map(inputify) ?? [];
    const outputs = this.outputs?.map(outputify) ?? [];
    const witnesses = this.witnesses?.map(witnessify) ?? [];

    const { policyTypes, policies } = BaseTransactionRequest.getPolicyMeta(this);

    return {
      policyTypes,
      inputs,
      outputs,
      policies,
      witnesses,
      inputsCount: inputs.length,
      outputsCount: outputs.length,
      witnessesCount: witnesses.length,
    };
  }

  abstract toTransaction(): TransactionCreate | TransactionScript | TransactionBlob;

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
   * Pushes a witness to the list and returns the index
   *
   * @param signature - The signature to add to the witness.
   * @returns The index of the created witness.
   */
  addWitness(signature: BytesLike) {
    this.witnesses.push(signature);
    return this.witnesses.length - 1;
  }

  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   *
   * @returns The index of the created witness.
   */
  addEmptyWitness(): number {
    // Push a dummy witness with same byte size as a real witness signature
    this.addWitness(concat([ZeroBytes32, ZeroBytes32]));
    return this.witnesses.length - 1;
  }

  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(address: string | AbstractAddress, signature: BytesLike) {
    const ownerAddress = Address.fromAddressOrString(address);
    const witnessIndex = this.getCoinInputWitnessIndexByOwner(ownerAddress);
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
   * Helper function to add an external signature to the transaction.
   *
   * @param account - The account/s to sign to the transaction.
   * @returns The transaction with the signature witness added.
   */
  async addAccountWitnesses(account: Account | Account[]) {
    const accounts = Array.isArray(account) ? account : [account];
    await Promise.all(
      accounts.map(async (acc) => {
        this.addWitness(await acc.signTransaction(<TransactionRequestLike>this));
      })
    );

    return this;
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
   */
  addCoinInput(coin: Coin) {
    const { assetId, owner, amount, id, predicate, predicateData } = coin;

    let witnessIndex;

    if (coin.predicate) {
      witnessIndex = 0;
    } else {
      witnessIndex = this.getCoinInputWitnessIndexByOwner(owner);

      // Insert a dummy witness if no witness exists
      if (typeof witnessIndex !== 'number') {
        witnessIndex = this.addEmptyWitness();
      }
    }

    const input: CoinTransactionRequestInput = {
      id,
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
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(message: Message | MessageCoin) {
    const { recipient, sender, amount, predicate, nonce, predicateData } = message;

    let witnessIndex;

    if (message.predicate) {
      witnessIndex = 0;
    } else {
      witnessIndex = this.getCoinInputWitnessIndexByOwner(recipient);

      // Insert a dummy witness if no witness exists
      if (typeof witnessIndex !== 'number') {
        witnessIndex = this.addEmptyWitness();
      }
    }

    const input: MessageTransactionRequestInput = {
      nonce,
      type: InputType.Message,
      sender: sender.toB256(),
      recipient: recipient.toB256(),
      data: isMessageCoin(message) ? '0x' : message.data,
      amount,
      witnessIndex,
      predicate,
      predicateData,
    };

    // Insert the Input
    this.pushInput(input);

    // Insert a ChangeOutput if it does not exist
    if (isMessageCoin(message)) {
      this.addChangeOutput(recipient, message.assetId);
    }
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
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(to: AddressLike, amount: BigNumberish, assetId: BytesLike) {
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
  addChangeOutput(to: AddressLike, assetId: BytesLike) {
    // Find the ChangeOutput for the AssetId of the Resource
    const changeOutput = this.getChangeOutputs().find(
      (output) => hexlify(output.assetId) === assetId
    );

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
   * @hidden
   */
  metadataGas(_gasCosts: GasCosts): BN {
    throw new FuelError(FuelError.CODES.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * @hidden
   */
  calculateMinGas(chainInfo: ChainInfo): BN {
    const { consensusParameters } = chainInfo;
    const {
      gasCosts,
      feeParameters: { gasPerByte },
    } = consensusParameters;
    return getMinGas({
      gasPerByte,
      gasCosts,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(gasCosts),
    });
  }

  calculateMaxGas(chainInfo: ChainInfo, minGas: BN): BN {
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
      maxGasPerTx,
    });
  }

  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   * @param baseAssetId - The base asset to fund the transaction.
   */
  fundWithFakeUtxos(
    quantities: CoinQuantity[],
    baseAssetId: string,
    resourcesOwner?: AbstractAddress
  ) {
    const findAssetInput = (assetId: string) =>
      this.inputs.find((input) => {
        if ('assetId' in input) {
          return input.assetId === assetId;
        }
        return false;
      });

    const updateAssetInput = (assetId: string, quantity: BN) => {
      const assetInput = findAssetInput(assetId);

      let usedQuantity = quantity;

      if (assetId === baseAssetId) {
        usedQuantity = bn('1000000000000000000');
      }

      if (assetInput && 'assetId' in assetInput) {
        assetInput.id = hexlify(randomBytes(UTXO_ID_LEN));
        assetInput.amount = usedQuantity;
      } else {
        this.addResources([
          {
            id: hexlify(randomBytes(UTXO_ID_LEN)),
            amount: usedQuantity,
            assetId,
            owner: resourcesOwner || Address.fromRandom(),
            blockCreated: bn(1),
            txCreatedIdx: bn(1),
          },
        ]);
      }
    };

    updateAssetInput(baseAssetId, bn(100_000_000_000));
    quantities.forEach((q) => updateAssetInput(q.assetId, q.amount));

    return this;
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
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  abstract getTransactionId(chainId: number): string;

  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return normalizeJSON(this);
  }

  removeWitness(index: number) {
    this.witnesses.splice(index, 1);
    this.adjustWitnessIndexes(index);
  }

  private adjustWitnessIndexes(removedIndex: number) {
    this.inputs.filter(isRequestInputResource).forEach((input) => {
      if (input.witnessIndex > removedIndex) {
        // eslint-disable-next-line no-param-reassign
        input.witnessIndex -= 1;
      }
    });
  }

  updatePredicateGasUsed(inputs: TransactionRequestInput[]) {
    const inputsToExtractGasUsed = inputs.filter(isRequestInputCoinOrMessage);

    this.inputs.filter(isRequestInputResource).forEach((i) => {
      const owner = getRequestInputResourceOwner(i);
      const correspondingInput = inputsToExtractGasUsed.find((x) =>
        isRequestInputResourceFromOwner(x, Address.fromString(String(owner)))
      );

      if (
        correspondingInput &&
        'predicateGasUsed' in correspondingInput &&
        bn(correspondingInput.predicateGasUsed).gt(0)
      ) {
        // eslint-disable-next-line no-param-reassign
        i.predicateGasUsed = correspondingInput.predicateGasUsed;
      }
    });
  }

  byteLength(): number {
    return this.toTransactionBytes().byteLength;
  }
}
