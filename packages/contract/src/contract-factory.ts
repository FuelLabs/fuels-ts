import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type {
  Account,
  CreateTransactionRequestLike,
  Provider,
  TransactionResult,
  TransactionType,
} from '@fuel-ts/account';
import { CreateTransactionRequest } from '@fuel-ts/account';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { Contract } from '@fuel-ts/program';
import type { StorageSlot } from '@fuel-ts/transactions';
import { arrayify, isDefined } from '@fuel-ts/utils';

import {
  MAX_CONTRACT_SIZE,
  getContractId,
  getContractStorageRoot,
  hexlifyWithPrefix,
} from './util';

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
  createTransactionRequest(deployOptions?: DeployContractOptions) {
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

    const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);
    const contractId = getContractId(this.bytecode, options.salt, stateRoot);
    const transactionRequest = new CreateTransactionRequest({
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...options,
    });
    transactionRequest.addContractCreatedOutput(contractId, stateRoot);

    return {
      contractId,
      transactionRequest,
    };
  }

  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy<TContract extends Contract = Contract>(
    deployOptions: DeployContractOptions = {}
  ): Promise<DeployContractResult<TContract>> {
    if (this.bytecode.length > MAX_CONTRACT_SIZE) {
      throw new FuelError(
        ErrorCode.CONTRACT_SIZE_EXCEEDS_LIMIT,
        'Contract bytecode is too large. Max contract size is 100KB'
      );
    }

    const { contractId, transactionRequest } = await this.prepareDeploy(deployOptions);

    const account = this.getAccount();

    const transactionResponse = await account.sendTransaction(transactionRequest);

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

    const account = this.getAccount();

    const txCost = await account.getTransactionCost(transactionRequest);

    const { maxFee: setMaxFee } = deployOptions;

    if (isDefined(setMaxFee)) {
      if (txCost.maxFee.gt(setMaxFee)) {
        throw new FuelError(
          ErrorCode.MAX_FEE_TOO_LOW,
          `Max fee '${deployOptions.maxFee}' is lower than the required: '${txCost.maxFee}'.`
        );
      }
    } else {
      transactionRequest.maxFee = txCost.maxFee;
    }

    await account.fund(transactionRequest, txCost);

    return {
      contractId,
      transactionRequest,
    };
  }
}
