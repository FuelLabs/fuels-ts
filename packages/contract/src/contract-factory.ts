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
  calculateGasFee,
} from '@fuel-ts/account';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hash } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import { Contract } from '@fuel-ts/program';
import type { StorageSlot } from '@fuel-ts/transactions';
import { arrayify, isDefined, hexlify } from '@fuel-ts/utils';

import {
  getLoaderInstructions,
  getPredicateScriptLoaderInstructions,
  getContractChunks,
  getDataOffset,
} from './loader';
import { getContractId, getContractStorageRoot, hexlifyWithPrefix } from './util';

/** Amount of percentage override for chunk sizes in blob transactions */
const CHUNK_SIZE_MULTIPLIER = 0.95;

/**
 * Options for deploying a contract.
 */
export type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
  configurableConstants?: { [name: string]: unknown };
  chunkSizeMultiplier?: number;
} & CreateTransactionRequestLike;

export type DeployContractResult<TContract extends Contract = Contract> = {
  contractId: string;
  waitForTransactionId: () => Promise<string>;
  waitForResult: () => Promise<{
    contract: TContract;
    transactionResult: TransactionResult<TransactionType.Create>;
  }>;
};

/**
 * `ContractFactory` provides utilities for deploying and configuring contracts.
 */
export default class ContractFactory {
  bytecode: BytesLike;
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
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(deployOptions?: DeployContractOptions & { bytecode?: BytesLike }) {
    const storageSlots = deployOptions?.storageSlots
      ?.map(({ key, value }) => ({
        key: hexlifyWithPrefix(key),
        value: hexlifyWithPrefix(value),
      }))
      .sort(({ key: keyA }, { key: keyB }) => keyA.localeCompare(keyB));

    const options = {
      salt: randomBytes(32),
      ...deployOptions,
      storageSlots: storageSlots || [],
    };

    if (!this.provider) {
      throw new FuelError(
        ErrorCode.MISSING_PROVIDER,
        'Cannot create transaction request without provider'
      );
    }

    const bytecode = deployOptions?.bytecode || this.bytecode;
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
   * Deploy a contract of any length with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy<TContract extends Contract = Contract>(
    deployOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();
    const { consensusParameters } = account.provider.getChain();
    const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();

    return this.bytecode.length > maxContractSize
      ? this.deployAsBlobTx(deployOptions)
      : this.deployAsCreateTx(deployOptions);
  }

  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx<TContract extends Contract = Contract>(
    deployOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();
    const { consensusParameters } = account.provider.getChain();
    const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();

    if (this.bytecode.length > maxContractSize) {
      throw new FuelError(
        ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT,
        'Contract bytecode is too large. Please use `deployAsBlobTx` instead.'
      );
    }

    const { contractId, transactionRequest } = await this.prepareDeploy(deployOptions);

    const transactionResponse = await account.sendTransaction(transactionRequest);

    const waitForResult = async () => {
      const transactionResult = await transactionResponse.waitForResult<TransactionType.Create>();
      const contract = new Contract(contractId, this.interface, account) as TContract;

      return { contract, transactionResult };
    };

    return {
      contractId,
      waitForTransactionId: () => Promise.resolve(transactionResponse.id),
      waitForResult,
    };
  }

  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsBlobTx<TContract extends Contract = Contract>(
    deployOptions: DeployContractOptions = {
      chunkSizeMultiplier: CHUNK_SIZE_MULTIPLIER,
    }
  ): Promise<DeployContractResult<TContract>> {
    const account = this.getAccount();
    const { configurableConstants, chunkSizeMultiplier } = deployOptions;
    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    // Generate the chunks based on the maximum chunk size and create blob txs
    const chunkSize = this.getMaxChunkSize(deployOptions, chunkSizeMultiplier);
    const chunks = getContractChunks(arrayify(this.bytecode), chunkSize).map((c) => {
      const transactionRequest = this.blobTransactionRequest({
        ...deployOptions,
        bytecode: c.bytecode,
      });
      return {
        ...c,
        transactionRequest,
        blobId: transactionRequest.blobId,
      };
    });

    // Generate the associated create tx for the loader contract
    const blobIds = chunks.map(({ blobId }) => blobId);
    const loaderBytecode = getLoaderInstructions(blobIds);
    const { contractId, transactionRequest: createRequest } = this.createTransactionRequest({
      bytecode: loaderBytecode,
      ...deployOptions,
    });

    // BlobIDs only need to be uploaded once and we can check if they exist on chain
    const uniqueBlobIds = [...new Set(blobIds)];
    const uploadedBlobIds = await account.provider.getBlobs(uniqueBlobIds);
    const blobIdsToUpload = uniqueBlobIds.filter((id) => !uploadedBlobIds.includes(id));

    // Check the account can afford to deploy all chunks and loader
    let totalCost = bn(0);
    const chainInfo = account.provider.getChain();
    const gasPrice = await account.provider.estimateGasPrice(10);
    const priceFactor = chainInfo.consensusParameters.feeParameters.gasPriceFactor;

    for (const { transactionRequest, blobId } of chunks) {
      if (blobIdsToUpload.includes(blobId)) {
        const minGas = transactionRequest.calculateMinGas(chainInfo);
        const minFee = calculateGasFee({
          gasPrice,
          gas: minGas,
          priceFactor,
          tip: transactionRequest.tip,
        }).add(1);

        totalCost = totalCost.add(minFee);
      }
      const createMinGas = createRequest.calculateMinGas(chainInfo);
      const createMinFee = calculateGasFee({
        gasPrice,
        gas: createMinGas,
        priceFactor,
        tip: createRequest.tip,
      }).add(1);
      totalCost = totalCost.add(createMinFee);
    }
    if (totalCost.gt(await account.getBalance())) {
      throw new FuelError(ErrorCode.FUNDS_TOO_LOW, 'Insufficient balance to deploy contract.');
    }

    // Transaction id is unset until we have funded the create tx, which is dependent on the blob txs
    let txIdResolver: (value: string | PromiseLike<string>) => void;
    const txIdPromise = new Promise<string>((resolve) => {
      txIdResolver = resolve;
    });

    const waitForResult = async () => {
      // Upload the blob if it hasn't been uploaded yet. Duplicate blob IDs will fail gracefully.
      const uploadedBlobs: string[] = [];
      // Deploy the chunks as blob txs
      for (const { blobId, transactionRequest } of chunks) {
        if (!uploadedBlobs.includes(blobId) && blobIdsToUpload.includes(blobId)) {
          const fundedBlobRequest = await this.fundTransactionRequest(
            transactionRequest,
            deployOptions
          );

          let result: TransactionResult<TransactionType.Blob>;

          try {
            const blobTx = await account.sendTransaction(fundedBlobRequest);
            result = await blobTx.waitForResult();
          } catch (err: unknown) {
            // Core will throw for blobs that have already been uploaded, but the blobId
            // is still valid so we can use this for the loader contract
            if ((<Error>err).message.indexOf(`BlobId is already taken ${blobId}`) > -1) {
              uploadedBlobs.push(blobId);
              continue;
            }

            throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
          }

          if (!result.status || result.status !== TransactionStatus.success) {
            throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
          }

          uploadedBlobs.push(blobId);
        }
      }

      await this.fundTransactionRequest(createRequest, deployOptions);
      txIdResolver(createRequest.getTransactionId(account.provider.getChainId()));
      const transactionResponse = await account.sendTransaction(createRequest);
      const transactionResult = await transactionResponse.waitForResult<TransactionType.Create>();
      const contract = new Contract(contractId, this.interface, account) as TContract;

      return { contract, transactionResult };
    };

    const waitForTransactionId = () => txIdPromise;

    return { waitForResult, contractId, waitForTransactionId };
  }

  async deployAsBlobTxForPredicate(
    configurableConstants: { [name: string]: unknown } = {}
  ): Promise<{
    waitForResult: () => Promise<{
      transactionResult: TransactionResult<TransactionType.Blob>;
      loaderBytecode: string;
    }>;
    predicateRoot: string;
    loaderBytecode: Uint8Array;
    loaderBytecodeHexlified: string;
  }> {
    /** TODO: Implement me */
    // @ts-expect-error lol
    return Promise.resolve({
      waitForResult: () =>
        Promise.resolve({
          transactionResult: {},
          loaderBytecode: '',
          offset: 0,
        }),
      predicateRoot: '',
      loaderBytecode: new Uint8Array(),
      loaderBytecodeHexlified: '',
      offset: 0,
    });
  }

  async deployAsBlobTxForScript(configurableConstants: { [name: string]: unknown } = {}): Promise<{
    waitForResult: () => Promise<{
      loaderBytecode: string;
    }>;
    blobId: string;
    loaderBytecode: Uint8Array;
    loaderBytecodeHexlified: string;
  }> {
    const account = this.getAccount();

    const dataSectionOffset = getDataOffset(arrayify(this.bytecode));

    const byteCodeWithoutDataSection = this.bytecode.slice(0, dataSectionOffset);

    // Generate the associated create tx for the loader contract
    const blobId = hash(byteCodeWithoutDataSection);

    const bloTransactionRequest = this.blobTransactionRequest({
      bytecode: byteCodeWithoutDataSection,
    });

    const loaderBytecode = getPredicateScriptLoaderInstructions(
      arrayify(this.bytecode),
      arrayify(blobId)
    );

    const blobExists = (await account.provider.getBlobs([blobId])).length > 0;
    if (blobExists) {
      return {
        waitForResult: () => Promise.resolve({ loaderBytecode: hexlify(loaderBytecode) }),
        blobId,
        // TODO: Remove the loader from here
        loaderBytecode,
        loaderBytecodeHexlified: hexlify(loaderBytecode),
      };
    }

    // Check the account can afford to deploy all chunks and loader
    let totalCost = bn(0);
    const chainInfo = account.provider.getChain();
    const gasPrice = await account.provider.estimateGasPrice(10);
    const priceFactor = chainInfo.consensusParameters.feeParameters.gasPriceFactor;

    const minGas = bloTransactionRequest.calculateMinGas(chainInfo);
    const minFee = calculateGasFee({
      gasPrice,
      gas: minGas,
      priceFactor,
      tip: bloTransactionRequest.tip,
    }).add(1);

    totalCost = totalCost.add(minFee);

    if (totalCost.gt(await account.getBalance())) {
      throw new FuelError(ErrorCode.FUNDS_TOO_LOW, 'Insufficient balance to deploy contract.');
    }

    // Transaction id is unset until we have funded the create tx, which is dependent on the blob txs
    const waitForResult = async () => {
      // Deploy the chunks as blob txs
      const fundedBlobRequest = await this.fundTransactionRequest(bloTransactionRequest);

      let result: TransactionResult<TransactionType.Blob>;

      try {
        const blobTx = await account.sendTransaction(fundedBlobRequest);
        result = await blobTx.waitForResult();
      } catch (err: unknown) {
        throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
      }

      if (!result.status || result.status !== TransactionStatus.success) {
        throw new FuelError(ErrorCode.TRANSACTION_FAILED, 'Failed to deploy contract chunk');
      }

      return { loaderBytecode: hexlify(loaderBytecode) };
    };

    return {
      waitForResult,
      blobId,
      // TODO: Remove the loader from here
      loaderBytecode,
      loaderBytecodeHexlified: hexlify(loaderBytecode),
    };
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
        throw new FuelError(
          ErrorCode.CONFIGURABLE_NOT_FOUND,
          'Contract does not have configurables to be set'
        );
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new FuelError(
            ErrorCode.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${key}'`
          );
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

  private async prepareDeploy(deployOptions: DeployContractOptions) {
    const { configurableConstants } = deployOptions;

    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    const { contractId, transactionRequest } = this.createTransactionRequest(deployOptions);

    await this.fundTransactionRequest(transactionRequest, deployOptions);

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
  private blobTransactionRequest(options: { bytecode: BytesLike } & DeployContractOptions) {
    const { bytecode } = options;
    return new BlobTransactionRequest({
      blobId: hash(bytecode),
      witnessIndex: 0,
      witnesses: [bytecode],
      ...options,
    });
  }

  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  private getMaxChunkSize(
    deployOptions: DeployContractOptions,
    chunkSizeMultiplier: number = CHUNK_SIZE_MULTIPLIER
  ) {
    if (chunkSizeMultiplier < 0 || chunkSizeMultiplier > 1) {
      throw new FuelError(
        ErrorCode.INVALID_CHUNK_SIZE_MULTIPLIER,
        'Chunk size multiplier must be between 0 and 1'
      );
    }

    const account = this.getAccount();
    const { consensusParameters } = account.provider.getChain();
    const contractSizeLimit = consensusParameters.contractParameters.contractMaxSize.toNumber();
    const transactionSizeLimit = consensusParameters.txParameters.maxSize.toNumber();
    const maxLimit = 64000;
    const chainLimit =
      transactionSizeLimit < contractSizeLimit ? transactionSizeLimit : contractSizeLimit;
    const sizeLimit = chainLimit < maxLimit ? chainLimit : maxLimit;

    // Get an estimate base tx length

    const blobTx = this.blobTransactionRequest({
      ...deployOptions,
      bytecode: randomBytes(32),
    }).addResources(
      account.generateFakeResources([{ assetId: account.provider.getBaseAssetId(), amount: bn(1) }])
    );
    // Given above, calculate the maximum chunk size
    const maxChunkSize = (sizeLimit - blobTx.byteLength() - WORD_SIZE) * chunkSizeMultiplier;

    // Ensure chunksize is byte aligned
    return Math.round(maxChunkSize / WORD_SIZE) * WORD_SIZE;
  }
}
