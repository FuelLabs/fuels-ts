import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { randomBytes } from '@fuel-ts/keystore';
import { Contract } from '@fuel-ts/program';
import type { CreateTransactionRequestLike, Provider } from '@fuel-ts/providers';
import { CreateTransactionRequest } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions/configs';
import { versions } from '@fuel-ts/versions';
import type { Account } from '@fuel-ts/wallet';

import { getContractId, getContractStorageRoot, includeHexPrefix } from './util';

const logger = new Logger(versions.FUELS);

type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
  configurableConstants?: { [name: string]: unknown };
} & CreateTransactionRequestLike;

export default class ContractFactory {
  bytecode: BytesLike;
  interface: Interface;
  provider!: Provider | null;
  account!: Account | null;

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
      if `accountOrProvider` have a `provider` property inside. If yes,
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

  connect(provider: Provider | null) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

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

        const { offset, fragmentType } = this.interface.configurables[key];

        const coder = this.interface.abiCoder.getCoder(fragmentType);

        const encoded = coder.encode(value, offset);

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
