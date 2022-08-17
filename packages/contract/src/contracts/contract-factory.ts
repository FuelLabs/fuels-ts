import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/constants';
import { randomBytes } from '@fuel-ts/keystore';
import type { CreateTransactionRequestLike } from '@fuel-ts/providers';
import { Provider, CreateTransactionRequest } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';
import { Wallet } from '@fuel-ts/wallet';

import { getContractId, getContractStorageRoot, includeHexPrefix } from '../util';

import Contract from './contract';

const logger = new Logger(process.env.BUILD_VERSION || '~');

type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
} & CreateTransactionRequestLike;

export default class ContractFactory {
  bytecode: BytesLike;
  interface: Interface;
  provider!: Provider | null;
  wallet!: Wallet | null;

  constructor(
    bytecode: BytesLike,
    abi: JsonAbi | Interface,
    walletOrProvider: Wallet | Provider | null = null
  ) {
    this.bytecode = bytecode;

    if (abi instanceof Interface) {
      this.interface = abi;
    } else {
      this.interface = new Interface(abi);
    }

    if (walletOrProvider instanceof Wallet) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else if (walletOrProvider instanceof Provider) {
      this.provider = walletOrProvider;
      this.wallet = null;
    } else {
      this.provider = null;
      this.wallet = null;
    }
  }

  connect(provider: Provider | null) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  async deployContract(deployContractOptions?: DeployContractOptions) {
    if (!this.wallet) {
      return logger.throwArgumentError('Cannot deploy without wallet', 'wallet', this.wallet);
    }

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
    const request = new CreateTransactionRequest({
      gasPrice: 0,
      gasLimit: MAX_GAS_PER_TX,
      bytePrice: 0,
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...options,
    });
    request.addContractCreatedOutput(contractId, stateRoot);
    await this.wallet.fund(request);
    const response = await this.wallet.sendTransaction(request);

    await response.wait();

    return new Contract(contractId, this.interface, this.wallet);
  }
}
