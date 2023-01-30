import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import type { TransactionResponse, TransactionResult } from '@fuel-ts/providers';
import { getDecodedLogs } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import type { ScriptTxParams } from './callScript';
import callScript from './callScript';
import { Script } from './script';

const logger = new Logger(versions.FUELS);

const FUNCTION_FRAGMENT_NAME = 'main';

type Result<T> = {
  value: T;
  logs: any[];
};

export default class ScriptFactory<TOutput> {
  bytecode: BytesLike;
  script: Script<InputValue[], Result<TOutput>>;
  interface: Interface;
  wallet: BaseWalletLocked;
  protected txParameters?: ScriptTxParams;

  constructor(bytecode: BytesLike, abi: JsonAbi, wallet: BaseWalletLocked) {
    this.bytecode = bytecode;
    this.wallet = wallet;
    this.interface = new Interface(abi);

    this.script = new Script(
      bytecode,
      (args: InputValue[]) =>
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
          value = (decoded as any)[0];
        }

        return {
          value,
          logs,
        };
      }
    );
  }

  async call(args: InputValue[]): Promise<{
    transactionResult: TransactionResult<any>;
    response: TransactionResponse;
    value: TOutput;
    logs: any[];
  }> {
    if (!this.wallet) {
      return logger.throwArgumentError('Cannot call without wallet', 'wallet', this.wallet);
    }

    const { transactionResult, result, response } = await callScript<InputValue[], Result<TOutput>>(
      this.wallet,
      this.script,
      args,
      this.txParameters
    );

    return {
      transactionResult,
      response,
      value: result.value,
      logs: result.logs,
    };
  }

  txParams(txParams: ScriptTxParams) {
    this.txParameters = txParams;
    return this;
  }
}
