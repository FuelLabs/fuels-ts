import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { getEnv } from '@fuel-ts/constants';
import { randomBytes } from '@fuel-ts/keystore';
import { Contract } from '@fuel-ts/program';
import type { CreateTransactionRequestLike, Provider } from '@fuel-ts/providers';
import { CreateTransactionRequest } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import type { Account } from '@fuel-ts/wallet';

import { getContractId, getContractStorageRoot, includeHexPrefix } from './util';

const logger = new Logger(versions.FUELS);

type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
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

  async createTransactionRequest(deployContractOptions?: DeployContractOptions) {
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
    const maxGasPerTx = await getEnv({ provider: this.provider as Provider }).getMaxGasPerTx();
    const contractId = getContractId(this.bytecode, options.salt, stateRoot);
    const transactionRequest = new CreateTransactionRequest({
      gasPrice: 0,
      gasLimit: maxGasPerTx,
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

  async deployContract(deployContractOptions?: DeployContractOptions) {
    if (!this.account) {
      return logger.throwArgumentError(
        'Cannot deploy Contract without account',
        'account',
        this.account
      );
    }

    const { contractId, transactionRequest } = await this.createTransactionRequest(
      deployContractOptions
    );
    await this.account.fund(transactionRequest);
    const response = await this.account.sendTransaction(transactionRequest);
    await response.wait();

    return new Contract(contractId, this.interface, this.account);
  }
}
