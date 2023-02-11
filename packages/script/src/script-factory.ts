import type { BytesLike } from '@ethersproject/bytes';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import type { Provider } from '@fuel-ts/providers';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { Script } from './script';
import type { ScriptRequest } from './script-request';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

export class ScriptFactory<TInput extends Array<any>, TOutput> {
  bytecode: BytesLike;
  script!: ScriptRequest<InputValue<void>[], Result<TOutput>>;
  provider: Provider;
  interface: Interface;
  wallet: BaseWalletLocked | null;

  constructor(bytecode: BytesLike, abi: JsonAbi, walletOrProvider: BaseWalletLocked | Provider) {
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
