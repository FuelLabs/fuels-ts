import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import type { Account, Provider } from '@fuel-ts/account';
import { WalletLocked, WalletUnlocked, Predicate, Wallet } from '@fuel-ts/account';
import { Contract } from '@fuel-ts/program';
import { Script } from '@fuel-ts/script';

/**
 * Cross-Export
 */
export { Predicate, Script, Contract, WalletUnlocked, WalletLocked };

export const NETWORK_URL = 'asdf';

/**
 * ABI bundles (?)
 */
export type ContractBundle = {
  id: string;
  abi: JsonAbi;
  bytecode: string;
};

export type PredicateBundle = Omit<ContractBundle, 'id'>;

export type ScriptBundle = PredicateBundle;

/**
 * Fuels API
 */
export class Fuels {
  public provider: Provider;

  public readonly Predicate = Predicate;
  public readonly Script = Script;
  public readonly Contract = Contract;
  public readonly WalletUnlocked = WalletUnlocked;
  public readonly WalletLocked = WalletLocked;
  public readonly Wallet = Wallet;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  contract(factory: ContractBundle): Contract {
    const { id, abi } = factory;
    return new Contract(id, abi, this.provider);
  }

  predicate(factory: PredicateBundle): Predicate<InputValue[]> {
    const { bytecode, abi } = factory;
    const { provider } = this;
    return new Predicate({ bytecode, abi, provider });
  }

  script(factory: ScriptBundle, account: Account): Script<unknown[], unknown> {
    const { bytecode, abi } = factory;
    return new Script(bytecode, abi, account);
  }

  wallet(address: string): WalletLocked | WalletUnlocked {
    return Wallet.fromAddress(address, this.provider);
  }
}
