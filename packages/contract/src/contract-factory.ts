import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { randomBytes } from '@ethersproject/random';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonFragment } from '@fuel-ts/abi-coder';
import { Provider, OutputType, TransactionType } from '@fuel-ts/providers';

import Contract from './contract';
import { getContractId, getContractStorageRoot } from './util';

const logger = new Logger('0.0.1');

export default class ContractFactory {
  bytecode: BytesLike;
  interface: Interface;
  provider!: Provider | null;

  constructor(
    bytecode: BytesLike,
    abi: ReadonlyArray<JsonFragment> | Interface,
    signerOrProvider: Provider | null = null
  ) {
    this.bytecode = bytecode;

    if (abi instanceof Interface) {
      this.interface = abi;
    } else {
      this.interface = new Interface(abi);
    }
    if (signerOrProvider === null) {
      this.provider = null;
    } else if (signerOrProvider instanceof Provider) {
      this.provider = signerOrProvider;
    }
  }

  connect(provider: Provider | null) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  async deployContract(salt: BytesLike = randomBytes(32)) {
    if (!(this.provider instanceof Provider)) {
      return logger.throwArgumentError('Cannot deploy without provider', 'provider', this.provider);
    }

    // TODO: Receive this as a parameter
    const storageSlots = [] as [];
    const stateRoot = getContractStorageRoot(storageSlots);
    const contractId = getContractId(this.bytecode, salt, stateRoot);
    const response = await this.provider.sendTransaction({
      type: TransactionType.Create,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      bytecodeWitnessIndex: 0,
      salt,
      storageSlots,
      outputs: [
        {
          type: OutputType.ContractCreated,
          contractId,
          stateRoot,
        },
      ],
      witnesses: [this.bytecode],
    });

    await response.wait();

    return new Contract(contractId, this.interface, this.provider, response.id, response.request);
  }
}
