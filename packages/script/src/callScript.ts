import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike, TransactionResponse, TransactionResult } from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import type { Script } from './script';

export type ScriptTxParams = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
}>;

export default async function callScript<TData, TResult>(
  wallet: BaseWalletLocked,
  script: Script<TData, TResult>,
  data: TData,
  txParameters: ScriptTxParams = { gasLimit: MAX_GAS_PER_TX }
): Promise<{
  transactionResult: TransactionResult<any>;
  result: TResult;
  response: TransactionResponse;
}> {
  const request = new ScriptTransactionRequest(txParameters);
  request.setScript(script, data);

  // Keep a list of coins we need to input to this transaction
  const requiredCoinQuantities: CoinQuantityLike[] = [];
  requiredCoinQuantities.push(request.calculateFee());

  // Get and add required coins to the transaction
  if (requiredCoinQuantities.length) {
    const resources = await wallet.getResourcesToSpend(requiredCoinQuantities);
    request.addResources(resources);
  }

  const response = await wallet.sendTransaction(request);
  const transactionResult = await response.waitForResult();
  const result = script.decodeCallResult(transactionResult);

  return { transactionResult, result, response };
}
