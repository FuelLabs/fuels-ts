import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/constants';
import { randomBytes } from '@fuel-ts/keystore';
import type { CreateTransactionRequestLike } from '@fuel-ts/providers';
import { Provider, CreateTransactionRequest } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import Contract from './contract-new';
import { getContractId } from './util';

const logger = new Logger(process.env.BUILD_VERSION || '~');

type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: Array<[BytesLike, BytesLike]>;
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
    const options = {
      salt: randomBytes(32),
      storageSlots: [],
      ...deployContractOptions,
    };

    // If storage slot is zero it should return zero and
    // as contract stateRoot is different form the receiptsState Root
    // https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/tx_format.md#transactioncreate
    // const stateRoot = options.stateRoot || getContractStorageRoot(options.storageSlots);
    // TODO: https://github.com/FuelLabs/fuels-ts/issues/334
    const stateRoot = ZeroBytes32;
    const contractId = getContractId(this.bytecode, options.salt, stateRoot);
    const request = new CreateTransactionRequest({
      gasPrice: 0,
      gasLimit: 1_000_000,
      bytePrice: 0,
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...options,
    });
    request.addContractCreatedOutput(contractId, stateRoot);
    await this.wallet.fund(request);
    const response = await this.wallet.sendTransaction(request);

    await response.wait();

    return new Contract(contractId, this.interface, this.wallet, response.id, response.request);
  }
}
