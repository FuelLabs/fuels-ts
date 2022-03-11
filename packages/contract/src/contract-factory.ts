import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { randomBytes } from '@ethersproject/random';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonFragment } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider, OutputType, TransactionType, InputType } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';

import Contract from './contract';
import { getContractId, getContractStorageRoot } from './util';

const logger = new Logger('0.0.1');

export default class ContractFactory {
  bytecode: BytesLike;
  interface: Interface;
  provider!: Provider | null;
  wallet!: Wallet | null;

  constructor(
    bytecode: BytesLike,
    abi: ReadonlyArray<JsonFragment> | Interface,
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

  async deployContract(salt: BytesLike = randomBytes(32)) {
    if (!this.wallet) {
      return logger.throwArgumentError('Cannot deploy without wallet', 'wallet', this.wallet);
    }

    // Collect enough coins to cover the fees
    // TODO: Calculate the correct amount
    const feeAmount = 1;
    const coins = await this.wallet.provider.getCoinsToSpend(this.wallet.address, [
      { assetId: NativeAssetId, amount: feeAmount },
    ]);

    // TODO: Receive this as a parameter
    const storageSlots = [] as [];
    const stateRoot = getContractStorageRoot(storageSlots);
    const contractId = getContractId(this.bytecode, salt, stateRoot);
    const response = await this.wallet.sendTransaction({
      type: TransactionType.Create,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      bytecodeWitnessIndex: 0,
      salt,
      storageSlots,
      inputs: [
        ...coins.map((coin) => ({
          type: InputType.Coin as const,
          ...coin,
          witnessIndex: 1,
        })),
      ],
      outputs: [
        {
          type: OutputType.ContractCreated,
          contractId,
          stateRoot,
        },
        { type: OutputType.Change, assetId: NativeAssetId, to: this.wallet.address },
      ],
      witnesses: [this.bytecode],
    });

    await response.wait();

    return new Contract(contractId, this.interface, this.wallet, response.id, response.request);
  }
}
