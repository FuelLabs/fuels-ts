import type { BytesLike } from '@ethersproject/bytes';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { Account } from '@fuel-ts/wallet';

import { Script } from './script';

export class ScriptFactory<TInput extends Array<any>, TOutput> {
  bytecode: BytesLike;
  interface: Interface;
  account: Account;

  constructor(bytecode: BytesLike, abi: JsonAbi, account: Account) {
    this.bytecode = bytecode;
    this.interface = new Interface(abi);

    this.account = account;
  }

  prepareScript(): Script<TInput, TOutput> {
    return new Script<TInput, TOutput>(this.bytecode, this.interface, this.account);
  }
}
