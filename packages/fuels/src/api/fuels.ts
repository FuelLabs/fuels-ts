/* eslint-disable max-classes-per-file */
import type { InputValue, JsonAbi } from '@fuel-ts/abi-coder';
import type { Account, Provider, TransactionResponse, TransactionResult } from '@fuel-ts/account';
import {
  ScriptTransactionRequest,
  WalletLocked,
  WalletUnlocked,
  Predicate,
  Wallet,
} from '@fuel-ts/account';
import * as configs from '@fuel-ts/account/configs';
import { Address } from '@fuel-ts/address';
import type { BN, BNInput } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { Contract } from '@fuel-ts/program';
import { Script } from '@fuel-ts/script';

/**
 * Cross-Export
 */
export { Predicate, Script, Contract, WalletUnlocked, WalletLocked, JsonAbi };

export const DEVNET_NETWORK_URL = configs.DEVNET_NETWORK_URL;
export const TESTNET_NETWORK_URL = configs.TESTNET_NETWORK_URL;

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

type FuelsTxTransferParams = { to: string; amount: BN; assetId: string };
type FuelsTxScriptParams = { script: Script<unknown[], unknown>; args: InputValue[] };
type FuelsTxPredicateParams = { predicate: Predicate<InputValue[]>; args: InputValue[] };
type FuelsTxBuildParams = {
  transfer?: FuelsTxTransferParams;
  script?: FuelsTxScriptParams;
  predicate?: FuelsTxPredicateParams;
};
type FuelsTxSubmitParams = { provider: Provider; someOtherParam?: boolean };

/**
 * Fuels TX API
 */
export class FuelsTx {
  private transactionRequest: ScriptTransactionRequest;

  constructor() {
    this.transactionRequest = new ScriptTransactionRequest();
  }

  transfer(params: FuelsTxTransferParams): FuelsTx {
    const { to, amount, assetId } = params;
    this.transactionRequest = this.transactionRequest.addCoinOutput(
      Address.fromAddressOrString(to),
      amount,
      assetId
    );

    return this;
  }

  script(params: FuelsTxScriptParams): FuelsTx {
    const { script, args } = params;
    this.transactionRequest.script = script.bytes;
    this.transactionRequest.scriptData = script.interface.functions.main.encodeArguments(args);

    return this;
  }

  predicate(_params: FuelsTxPredicateParams): FuelsTx {
    // Todo: implement
    return this;
  }

  build(params: FuelsTxBuildParams): FuelsTx {
    const { transfer, script, predicate } = params;
    if (transfer) {
      this.transfer(transfer);
    }
    if (script) {
      this.script(script);
    }
    if (predicate) {
      this.predicate(predicate);
    }

    return this;
  }

  submit(params: FuelsTxSubmitParams): Promise<TransactionResponse> {
    const { provider } = params;
    return provider.sendTransaction(this.transactionRequest, { awaitExecution: true });
  }

  waitForResult(val: Promise<TransactionResponse>): Promise<TransactionResult<void>> {
    return val.then((response) => response.waitForResult());
  }

  view(val: Promise<TransactionResult<void>>): Promise<TransactionResult<void>> {
    // todo: implement response formatting
    return val;
  }
}

/**
 * Fuels API
 */
export class Fuels {
  public provider: Provider;
  public baseAssetId: string;

  public readonly Predicate = Predicate;
  public readonly Script = Script;
  public readonly Contract = Contract;
  public readonly WalletUnlocked = WalletUnlocked;
  public readonly WalletLocked = WalletLocked;
  public readonly Wallet = Wallet;

  constructor(provider: Provider) {
    this.provider = provider;
    this.baseAssetId = provider.getBaseAssetId();
  }

  contract = (factory: ContractBundle): Contract => {
    const { id, abi } = factory;
    return new Contract(id, abi, this.provider);
  };

  predicate = (factory: PredicateBundle): Predicate<InputValue[]> => {
    const { bytecode, abi } = factory;
    const { provider } = this;
    return new Predicate({ bytecode, abi, provider });
  };

  script = (factory: ScriptBundle, account: Account): Script<unknown[], unknown> => {
    const { bytecode, abi } = factory;
    return new Script(bytecode, abi, account);
  };

  wallet = (address: string): WalletLocked | WalletUnlocked =>
    Wallet.fromAddress(address, this.provider);

  tx(): FuelsTx {
    return new FuelsTx();
  }

  bn(value: BNInput): BN {
    return bn(value);
  }
}
