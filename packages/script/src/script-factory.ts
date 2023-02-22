import type { BytesLike } from '@ethersproject/bytes';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import { Script } from './script';

export class ScriptFactory<TInput extends Array<any>, TOutput> {
  bytecode: BytesLike;
  provider: Provider;
  interface: Interface;
  wallet: Account | null;

  constructor(bytecode: BytesLike, abi: JsonAbi, walletOrProvider: Account | Provider) {
    this.bytecode = bytecode;
    this.interface = new Interface(abi);

    if (walletOrProvider && 'provider' in walletOrProvider) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else {
      this.provider = walletOrProvider;
      this.wallet = null;
    }
  }

  prepareScript(): Script<TInput, TOutput> {
    return new Script<TInput, TOutput>(this.bytecode, this.interface, this.provider, this.wallet);
  }
}
