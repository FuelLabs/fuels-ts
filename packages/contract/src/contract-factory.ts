import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonFragment } from '@fuel-ts/abi-coder';
import { Provider } from '@fuel-ts/providers';

import Contract from './contract';

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

  get genBytes32() {
    return hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));
  }

  connect(provider: Provider | null) {
    return new ContractFactory(this.bytecode, this.interface, provider);
  }

  async deployContract() {
    if (!(this.provider instanceof Provider)) {
      return logger.throwArgumentError('Cannot deploy without provider', 'provider', this.provider);
    }
    const salt = this.genBytes32;
    const { contractId, transactionId, request } = await this.provider.submitContract(
      this.bytecode,
      salt
    );

    return new Contract(contractId, this.interface, this.provider, transactionId, request);
  }
}
