import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { AbstractAccount } from '@fuel-ts/interfaces';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionRequestLike,
  CallResult,
  TransactionRequest,
  Coin,
  CoinQuantityLike,
  CoinQuantity,
  Message,
  Resource,
  ExcludeResourcesOption,
  TransactionResponse,
  Provider,
  ScriptTransactionRequestLike,
} from '@fuel-ts/providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  transactionRequestify,
  addAmountToAsset,
} from '@fuel-ts/providers';
import { getBytesCopy } from 'ethers';
import type { BytesLike } from 'ethers';

import {
  composeScriptForTransferringToContract,
  formatScriptDataForTransferringToContract,
} from './utils';

export type TxParamsType = Pick<
  ScriptTransactionRequestLike,
  'gasLimit' | 'gasPrice' | 'maturity' | 'maxFee' | 'witnessLimit'
>;

/**
 * `Account` provides an abstraction for interacting with accounts or wallets on the network.
 */
export class Account extends AbstractAccount {
  /**
   * The address associated with the account.
   */
  readonly address: AbstractAddress;

  /**
   * The provider used to interact with the network.
   */
  provider: Provider;

  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance.
   */
  constructor(address: string | AbstractAddress, provider: Provider) {
    super();
    this.provider = provider;
    this.address = Address.fromDynamicInput(address);
  }

  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(provider: Provider): Provider {
    this.provider = provider;
    return this.provider;
  }

  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[] /** IDs of coins to exclude */,
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    return this.provider.getResourcesToSpend(this.address, quantities, excludedIds);
  }

  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve.
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(assetId?: BytesLike): Promise<Coin[]> {
    const coins = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageCoins = await this.provider.getCoins(this.address, assetId, {
        first: pageSize,
        after: cursor,
      });

      coins.push(...pageCoins);

      const hasNextPage = pageCoins.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} coins exceed the current supported limit.`
      );
    }

    return coins;
  }

  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(): Promise<Message[]> {
    const messages = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageMessages = await this.provider.getMessages(this.address, {
        first: pageSize,
        after: cursor,
      });

      messages.push(...pageMessages);

      const hasNextPage = pageMessages.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} messages exceed the current supported limit.`
      );
    }

    return messages;
  }

  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for.
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(assetId: BytesLike = BaseAssetId): Promise<BN> {
    const amount = await this.provider.getBalance(this.address, assetId);
    return amount;
  }

  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
   */
  async getBalances(): Promise<CoinQuantity[]> {
    const balances = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageBalances = await this.provider.getBalances(this.address, {
        first: pageSize,
        after: cursor,
      });

      balances.push(...pageBalances);

      const hasNextPage = pageBalances.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} balances exceed the current supported limit.`
      );
    }

    return balances;
  }

  /**
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @param coinQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund<T extends TransactionRequest>(
    request: T,
    coinQuantities: CoinQuantity[],
    fee: BN
  ): Promise<void> {
    const updatedQuantities = addAmountToAsset({
      amount: bn(fee),
      assetId: BaseAssetId,
      coinQuantities,
    });

    const quantitiesDict: Record<string, { required: BN; owned: BN }> = {};

    updatedQuantities.forEach(({ amount, assetId }) => {
      quantitiesDict[assetId] = {
        required: amount,
        owned: bn(0),
      };
    });

    const cachedUtxos: BytesLike[] = [];
    const cachedMessages: BytesLike[] = [];

    const owner = this.address.toB256();

    request.inputs.forEach((input) => {
      const isResource = 'amount' in input;

      if (isResource) {
        const isCoin = 'owner' in input;

        if (isCoin) {
          const assetId = String(input.assetId);
          if (input.owner === owner && quantitiesDict[assetId]) {
            const amount = bn(input.amount);
            quantitiesDict[assetId].owned = quantitiesDict[assetId].owned.add(amount);

            // caching this utxo to avoid fetching it again if requests needs to be funded
            cachedUtxos.push(input.id);
          }
        } else if (input.recipient === owner && input.amount && quantitiesDict[BaseAssetId]) {
          quantitiesDict[BaseAssetId].owned = quantitiesDict[BaseAssetId].owned.add(input.amount);

          // caching this message to avoid fetching it again if requests needs to be funded
          cachedMessages.push(input.nonce);
        }
      }
    });

    const missingQuantities: CoinQuantity[] = [];
    Object.entries(quantitiesDict).forEach(([assetId, { owned, required }]) => {
      if (owned.lt(required)) {
        missingQuantities.push({
          assetId,
          amount: required.sub(owned),
        });
      }
    });

    const needsToBeFunded = missingQuantities.length;

    if (needsToBeFunded) {
      const resources = await this.getResourcesToSpend(missingQuantities, {
        messages: cachedMessages,
        utxos: cachedUtxos,
      });
      request.addResources(resources);
    }
  }

  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(
    /** Address of the destination */
    destination: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionRequest> {
    const { minGasPrice } = this.provider.getGasConfig();
    const params = { gasPrice: minGasPrice, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addCoinOutput(Address.fromAddressOrString(destination), amount, assetId);
    const { maxFee, requiredQuantities } = await this.provider.getTransactionCost(request);
    await this.fund(request, requiredQuantities, maxFee);
    return request;
  }

  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(
    /** Address of the destination */
    destination: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const request = await this.createTransfer(destination, amount, assetId, txParams);
    return this.sendTransaction(request);
  }

  /**
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(
    /** Contract address */
    contractId: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const contractAddress = Address.fromAddressOrString(contractId);
    const { minGasPrice } = this.provider.getGasConfig();
    const params = { gasPrice: minGasPrice, ...txParams };

    const script = await composeScriptForTransferringToContract();

    const scriptData = formatScriptDataForTransferringToContract(
      contractAddress.toB256(),
      amount,
      assetId
    );

    const request = new ScriptTransactionRequest({
      ...params,
      script,
      scriptData,
    });

    request.addContractInputAndOutput(contractAddress);

    const { maxFee, requiredQuantities } = await this.provider.getTransactionCost(request, [
      { amount: bn(amount), assetId: String(assetId) },
    ]);

    await this.fund(request, requiredQuantities, maxFee);

    return this.sendTransaction(request);
  }

  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(
    /** Address of the recipient on the base chain */
    recipient: string | AbstractAddress,
    /** Amount of base asset */
    amount: BigNumberish,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const recipientAddress = Address.fromAddressOrString(recipient);
    // add recipient and amount to the transaction script code
    const recipientDataArray = getBytesCopy(
      '0x'.concat(recipientAddress.toHexString().substring(2).padStart(64, '0'))
    );
    const amountDataArray = getBytesCopy(
      '0x'.concat(bn(amount).toHex().substring(2).padStart(16, '0'))
    );
    const script = new Uint8Array([
      ...getBytesCopy(withdrawScript.bytes),
      ...recipientDataArray,
      ...amountDataArray,
    ]);

    const params = { script, ...txParams };
    const request = new ScriptTransactionRequest(params);
    const forwardingQuantities = [{ amount: bn(amount), assetId: BaseAssetId }];

    const { requiredQuantities, maxFee } = await this.provider.getTransactionCost(
      request,
      forwardingQuantities
    );

    await this.fund(request, requiredQuantities, maxFee);

    return this.sendTransaction(request);
  }

  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.sendTransaction(transactionRequest, { estimateTxDependencies: false });
  }

  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.simulate(transactionRequest, { estimateTxDependencies: false });
  }
}
