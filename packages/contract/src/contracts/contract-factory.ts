import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { randomBytes } from '@fuel-ts/keystore';
import type { CreateTransactionRequestLike, Provider } from '@fuel-ts/providers';
import { CreateTransactionRequest } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { getContractId, getContractStorageRoot, includeHexPrefix } from '../util';

import Contract from './contract';

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
  wallet!: BaseWalletLocked | null;

  constructor(
    bytecode: BytesLike,
    abi: JsonAbi | Interface,
    walletOrProvider: BaseWalletLocked | Provider | null = null
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
      if `walletOrProvider` have a `provider` property inside. If yes,
      than we assume it's a Wallet.

      This approach is safer than using `instanceof` because it
      there might be different versions and bundles of the library.

      The same is done at:
        - ./contract.ts

      @see Contract
    */
    if (walletOrProvider && 'provider' in walletOrProvider) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else {
      this.provider = walletOrProvider;
      this.wallet = null;
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

  async deployContract(deployContractOptions?: DeployContractOptions) {
    if (!this.wallet) {
      return logger.throwArgumentError(
        'Cannot deploy Contract without wallet',
        'wallet',
        this.wallet
      );
    }

    const { contractId, transactionRequest } = this.createTransactionRequest(deployContractOptions);
    await this.wallet.fund(transactionRequest);
    const response = await this.wallet.sendTransaction(transactionRequest);
    await response.wait();

    return new Contract(contractId, this.interface, this.wallet);
  }
}
