import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import { randomBytes } from '@fuel-ts/crypto';
import { Contract } from '@fuel-ts/program';
import type { CreateTransactionRequestLike, Provider } from '@fuel-ts/providers';
import { CreateTransactionRequest } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions/configs';
import { versions } from '@fuel-ts/versions';
import type { Account } from '@fuel-ts/wallet';

import { getContractId, getContractStorageRoot, includeHexPrefix } from './util';

const logger = new Logger(versions.FUELS);

/**
 * Options for deploying a contract.
 */
type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
  configurableConstants?: { [name: string]: unknown };
} & CreateTransactionRequestLike;

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
  connect(provider: Provider | null) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(deployContractOptions?: DeployContractOptions) {
    const storageSlots = deployContractOptions?.storageSlots
      ?.map(({ key, value }) => ({
        key: includeHexPrefix(key),
        value: includeHexPrefix(value),
      }))
      .sort(({ key: keyA }, { key: keyB }) => keyA.localeCompare(keyB));

    const options = {
      salt: randomBytes(32),
      ...deployContractOptions,
      storageSlots: storageSlots || [],
    };

    const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);
    const contractId = getContractId(this.bytecode, options.salt, stateRoot);
    const transactionRequest = new CreateTransactionRequest({
      gasPrice: 0,
      gasLimit: MAX_GAS_PER_TX,
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
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContract(deployContractOptions: DeployContractOptions = {}) {
    if (!this.account) {
      return logger.throwArgumentError(
        'Cannot deploy Contract without account',
        'account',
        this.account
      );
    }

    const { configurableConstants } = deployContractOptions;

    if (configurableConstants) {
      this.setConfigurableConstants(configurableConstants);
    }

    const { contractId, transactionRequest } = this.createTransactionRequest(deployContractOptions);
    await this.account.fund(transactionRequest);
    const response = await this.account.sendTransaction(transactionRequest);
    await response.wait();

    return new Contract(contractId, this.interface, this.account);
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
        throw new Error('Contract has no configurables to be set');
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new Error(`Contract has no configurable named: ${key}`);
        }

        const { offset } = this.interface.configurables[key];

        const encoded = this.interface.encodeConfigurable(key, value as InputValue);

        const bytes = arrayify(this.bytecode);

        bytes.set(encoded, offset);

        this.bytecode = bytes;
      });
    } catch (err) {
      logger.throwError('Error setting configurables', Logger.errors.INVALID_ARGUMENT, {
        error: err,
        configurableConstants,
      });
    }
  }
}
