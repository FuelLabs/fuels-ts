import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import type {
  BuildScriptOptions,
  CoinQuantityLike,
  Provider,
  TransactionResponse,
  TransactionResult,
} from '@fuel-ts/providers';
import { getDecodedLogs, ScriptTransactionRequest } from '@fuel-ts/providers';
import { MAX_GAS_PER_TX, ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { Script } from './script';

const logger = new Logger(versions.FUELS);

const FUNCTION_FRAGMENT_NAME = 'main';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

export class ScriptFactory<TInput, TOutput> {
  bytecode: BytesLike;
  script: Script<InputValue<void>[], Result<TOutput>>;
  provider!: Provider | null;
  interface!: Interface;
  wallet!: BaseWalletLocked | null;

  constructor(
    bytecode: BytesLike,
    abi: JsonAbi,
    walletOrProvider: BaseWalletLocked | Provider | null = null
  ) {
    this.bytecode = bytecode;
    this.interface = new Interface(abi);

    if (walletOrProvider && 'provider' in walletOrProvider) {
      this.provider = walletOrProvider.provider;
      this.wallet = walletOrProvider;
    } else {
      this.provider = walletOrProvider;
      this.wallet = null;
    }

    this.script = new Script(
      bytecode,
      (args: InputValue<void>[]) =>
        this.interface.encodeFunctionData(FUNCTION_FRAGMENT_NAME, args, 0, true),
      (scriptResult): Result<TOutput> => {
        const logs = getDecodedLogs(scriptResult.receipts, this.interface);

        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          logger.throwError('Script Reverted', Logger.errors.CALL_EXCEPTION, logs);
        }

        if (
          scriptResult.returnReceipt.type !== ReceiptType.Return &&
          scriptResult.returnReceipt.type !== ReceiptType.ReturnData
        ) {
          logger.throwError(
            `Script Return Type [${scriptResult.returnReceipt.type}] Invalid`,
            Logger.errors.CALL_EXCEPTION,
            {
              logs,
              receipt: scriptResult.returnReceipt,
            }
          );
        }

        let value;
        if (scriptResult.returnReceipt.type === ReceiptType.Return) {
          value = scriptResult.returnReceipt.val;
        }
        if (scriptResult.returnReceipt.type === ReceiptType.ReturnData) {
          const decoded = this.interface.decodeFunctionResult(
            FUNCTION_FRAGMENT_NAME,
            scriptResult.returnReceipt.data
          );
          value = (decoded as [TOutput])[0];
        }

        return {
          value,
          logs,
        };
      }
    );
  }

  async buildScriptTransaction<TData>(
    data: InputValue<TData>[],
    scriptOptions?: BuildScriptOptions
  ): Promise<ScriptTransactionRequest> {
    const options = {
      fundTransaction: true,
      ...scriptOptions,
    };
    const request = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
      ...options,
    });
    request.setScript(this.script, data as InputValue[]);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      requiredCoinQuantities.push(request.calculateFee());
    }

    if (requiredCoinQuantities.length && this.wallet) {
      const resources = await this.wallet.getResourcesToSpend(requiredCoinQuantities);
      request.addResources(resources);
    }

    return request;
  }

  async call(
    data: InputValue<TInput>[],
    options?: BuildScriptOptions
  ): Promise<
    {
      transactionResult: TransactionResult<'success' | 'failure'>;
      response: TransactionResponse;
    } & Result<TOutput>
  > {
    if (!this.provider) {
      throw new Error('Provider is required');
    }

    const request = await this.buildScriptTransaction<TInput>(data, options);
    const response = await this.provider.sendTransaction(request);
    const transactionResult = await response.waitForResult();
    const result = this.script.decodeCallResult(transactionResult);

    return {
      transactionResult,
      response,
      value: result.value,
      logs: result.logs,
    };
  }
}
