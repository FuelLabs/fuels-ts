import { Interface, WORD_SIZE } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type {
  Account,
  CreateTransactionRequestLike,
  Provider,
  TransactionRequest,
  TransactionResult,
  TransactionType,
} from '@fuel-ts/account';
import {
  CreateTransactionRequest,
  BlobTransactionRequest,
  TransactionStatus,
} from '@fuel-ts/account';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hash } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import { Contract } from '@fuel-ts/program';
import type { StorageSlot } from '@fuel-ts/transactions';
import { arrayify, isDefined, concat } from '@fuel-ts/utils';

import { getLoaderInstructions } from './loader-script';
import { getContractId, getContractStorageRoot, hexlifyWithPrefix } from './util';

/**
 * Options for deploying a contract.
 */
export type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
  configurableConstants?: { [name: string]: unknown };
} & CreateTransactionRequestLike;

export type DeployContractResult<TContract extends Contract = Contract> = {
  transactionId: string;
  contractId: string;
  waitForResult: () => Promise<{
    contract: TContract;
    transactionResult: TransactionResult<TransactionType.Create>;
  }>;
};

export type ContractChunk = {
  id: number;
  size: number;
  bytecode: Uint8Array;
  blobId?: string;
};

/**
 * `ContractFactory` provides utilities for deploying and configuring contracts.
 */
export default class ContractFactory {
  bytecode: Uint8Array;
  interface: Interface;
  provider!: Provider | null;
  account!: Account | null;

  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(
    bytecode: BytesLike,
    abi: JsonAbi | Interface,
    accountOrProvider: Account | Provider | null = null
  ) {
    // Force the bytecode to be a byte array
    this.bytecode = arrayify(bytecode);

    if (abi instanceof Interface) {
      this.interface = abi;
    } else {
      this.interface = new Interface(abi);
    }

    /**
     Instead of using `instanceof` to compare classes, we instead check
      if `accountOrProvider` has a `provider` property inside. If yes,
      than we assume it's a Wallet.

      This approach is safer than using `instanceof` because it
      there might be different versions and bundles of the library.

      The same is done at:
      - ./contract.ts

      @see Contract
      */
    if (accountOrProvider && 'provider' in accountOrProvider) {
      this.provider = accountOrProvider.provider;
      this.account = accountOrProvider;
    } else {
      this.provider = accountOrProvider;
      this.account = null;
    }
  }

  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(provider: Provider) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(
    deployContractOptions?: DeployContractOptions & { bytecode?: Uint8Array }
  ) {
    const storageSlots = deployContractOptions?.storageSlots
      ?.map(({ key, value }) => ({
        key: hexlifyWithPrefix(key),
        value: hexlifyWithPrefix(value),
      }))
      .sort(({ key: keyA }, { key: keyB }) => keyA.localeCompare(keyB));

    const options = {
      salt: randomBytes(32),
      ...deployContractOptions,
      storageSlots: storageSlots || [],
    };

    if (!this.provider) {
      throw new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      );
    }

    const bytecode = deployContractOptions?.bytecode || this.bytecode;
    const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);
    const contractId = getContractId(bytecode, options.salt, stateRoot);
    const transactionRequest = new CreateTransactionRequest({
      bytecodeWitnessIndex: 0,
      witnesses: [bytecode],
      ...options,
    });
    transactionRequest.addContractCreatedOutput(contractId, stateRoot);

    return {
      contractId,
      transactionRequest,
    };
  }

  /**
   * Create a blob transaction request, used for deploying contract chunks.
   *
   * @param options - options for creating a blob transaction request.
   * @returns a populated BlobTransactionRequest.
   */
  private blobTransactionRequest(options: { blobBytecode: Uint8Array } & DeployContractOptions) {
    const { blobBytecode } = options;
    return new BlobTransactionRequest({
      blobId: hash(blobBytecode),
      witnessIndex: 0,
      witnesses: [blobBytecode],
      ...options,
    });
  }

  /**
   * Takes a transaction request, estimates it and funds it.
   *
   * @param request - the request to fund.
   * @param options - options for funding the request.
   * @returns a funded transaction request.
   */
  private async fundTransactionRequest(
    request: TransactionRequest,
    options: DeployContractOptions = {}
  ) {
    const account = this.getAccount();
    const { maxFee: setMaxFee } = options;

    const txCost = await account.getTransactionCost(request);

    if (isDefined(setMaxFee)) {
      if (txCost.maxFee.gt(setMaxFee)) {
        throw new FuelError(
          ErrorCode.MAX_FEE_TOO_LOW,
          `Max fee '${options.maxFee}' is lower than the required: '${txCost.maxFee}'.`
        );
      }
    } else {
      request.maxFee = txCost.maxFee;
    }

    await account.fund(request, txCost);

    return request;
  }

  /**
   * Deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContract<TContract extends Contract = Contract>(
    deployContractOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();
    const { consensusParameters } = account.provider.getChain();
    const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();

    if (this.bytecode.length > maxContractSize) {
      throw new FuelError(
        ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT,
        'Contract bytecode is too large. Max contract size is 100KB' // change error
      );
    }

    const { contractId, transactionRequest } = await this.prepareDeploy(deployContractOptions);

    const transactionResponse = await account.sendTransaction(transactionRequest);

    const waitForResult = async () => {
      const transactionResult = await transactionResponse.waitForResult<TransactionType.Create>();
      const contract = new Contract(contractId, this.interface, account) as TContract;

      return { contract, transactionResult };
    };

    return { waitForResult, contractId, transactionId: transactionResponse.id };
  }

  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContractLoader<TContract extends Contract = Contract>(
    deployContractOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();
    const { consensusParameters } = account.provider.getChain();
    const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();

    // Ensure the max contract size is byte aligned before chunking
    if (maxContractSize % WORD_SIZE !== 0) {
      throw new FuelError(
        ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT, // Todo: change error
        `Max contract size of ${maxContractSize} bytes is not byte aligned.`
      );
    }

    const { configurableConstants } = deployContractOptions;
    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    // Find the max chunk size (again, ensure is word aligned)
    const baseBlobRequest = this.blobTransactionRequest({ blobBytecode: randomBytes(32) });
    baseBlobRequest.fundWithFakeUtxos([], account.provider.getBaseAssetId());
    const maxChunkSize = maxContractSize - baseBlobRequest.byteLength() - WORD_SIZE;
    const padding = maxChunkSize % WORD_SIZE;
    const chunkSize = padding + ((WORD_SIZE - (padding % WORD_SIZE)) % WORD_SIZE) + maxChunkSize;

    // Chunk the bytecode
    const chunks: ContractChunk[] = [];
    for (let offset = 0, index = 0; offset < this.bytecode.length; offset += chunkSize, index++) {
      const chunk = this.bytecode.slice(offset, offset + chunkSize);

      // Chunks must be byte aligned
      if (chunk.length % WORD_SIZE !== 0) {
        const paddingLength = chunk.length % WORD_SIZE;
        const paddedChunk = concat([chunk, new Uint8Array(paddingLength)]);
        chunks.push({ id: index, size: paddedChunk.length, bytecode: paddedChunk });
        // eslint-disable-next-line no-continue
        continue;
      }
      chunks.push({ id: index, size: chunk.length, bytecode: chunk });
    }

    const uploadedBlobIds: string[] = [];

    // Deploy the chunks as blob txs
    for (const { id, bytecode } of chunks) {
      const blobRequest = this.blobTransactionRequest({
        blobBytecode: bytecode,
        ...deployContractOptions,
      });

      // Store the blobIds for the loader contract
      const { blobId } = blobRequest;
      chunks[id].blobId = blobId;

      // Upload the blob if it hasn't been uploaded yet. Duplicate blob IDs will fail gracefully.
      if (!uploadedBlobIds.includes(blobId)) {
        const fundedBlobRequest = await this.fundTransactionRequest(
          blobRequest,
          deployContractOptions
        );

        let result: TransactionResult<TransactionType.Blob>;

        try {
          const blobTx = await account.sendTransaction(fundedBlobRequest);
          result = await blobTx.waitForResult();
        } catch (err: unknown) {
          // Core will throw for blobs that have already been uploaded, but the blobId
          // is still valid so we can use this for the loader contract
          if ((<FuelError>err).code === ErrorCode.BLOB_ID_ALREADY_UPLOADED) {
            // TODO: We need to unset the cached utxo as it can be reused
            // this.account?.provider.cache?.del(UTXO_ID);
            // eslint-disable-next-line no-continue
            continue;
          }

          throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
        }

        if (!result.status || result.status !== TransactionStatus.success) {
          throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
        }

        uploadedBlobIds.push(blobId);
      }
    }

    // Get the loader bytecode
    const blobIds = chunks.map((c) => c.blobId as string);
    const loaderBytecode = getLoaderInstructions(blobIds);

    // Deploy the loader contract via create tx
    const { contractId, transactionRequest: createRequest } = this.createTransactionRequest({
      bytecode: loaderBytecode,
      ...deployContractOptions,
    });
    const fundedCreateRequest = await this.fundTransactionRequest(
      createRequest,
      deployContractOptions
    );

    const transactionResponse = await account.sendTransaction(fundedCreateRequest);

    const waitForResult = async () => {
      const transactionResult = await transactionResponse.waitForResult<TransactionType.Create>();
      const contract = new Contract(contractId, this.interface, account) as TContract;

      return { contract, transactionResult };
    };

    return { waitForResult, contractId, transactionId: transactionResponse.id };
  }

  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(configurableConstants: { [name: string]: unknown }) {
    try {
      const hasConfigurable = Object.keys(this.interface.configurables).length;

      if (!hasConfigurable) {
        throw new Error('Contract does not have configurables to be set');
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new Error(`Contract does not have a configurable named: '${key}'`);
        }

        const { offset } = this.interface.configurables[key];

        const encoded = this.interface.encodeConfigurable(key, value as InputValue);

        const bytes = arrayify(this.bytecode);

        bytes.set(encoded, offset);

        this.bytecode = bytes;
      });
    } catch (err) {
      throw new FuelError(
        ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${(<Error>err).message}.`
      );
    }
  }

  private getAccount(): Account {
    if (!this.account) {
      throw new FuelError(ErrorCode.ACCOUNT_REQUIRED, 'Account not assigned to contract.');
    }
    return this.account;
  }

  private async prepareDeploy(deployContractOptions: DeployContractOptions) {
    const { configurableConstants } = deployContractOptions;

    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    const { contractId, transactionRequest } = this.createTransactionRequest(deployContractOptions);

    await this.fundTransactionRequest(transactionRequest, deployContractOptions);

    return {
      contractId,
      transactionRequest,
    };
  }
}
