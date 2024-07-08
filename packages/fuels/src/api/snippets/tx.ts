/* eslint-disable no-console */
import type { InputValue } from '@fuel-ts/abi-coder';
import type { TransactionResponse, TransactionResult } from '@fuel-ts/account';

import { fuels, TESTNET_NETWORK_URL } from '..';

import { DispatcherScript } from './typegend';

type ResponseCallback = (response: TransactionResponse) => TransactionResponse;

/**
 * Function callbacks for response
 */

const logResponse: ResponseCallback = (response: TransactionResponse): TransactionResponse => {
  console.log('response:', response);
  return response;
};

const waitForResult = (response: TransactionResponse): Promise<TransactionResult<void>> =>
  response.waitForResult();

const getReceipts = (result: TransactionResult<void>) => result.receipts;

const logErrors = (error: Error) => console.error(error);

/**
 * Default
 */
export async function main() {
  const { wallet, script, predicate, tx, bn, baseAssetId, provider } =
    await fuels(TESTNET_NETWORK_URL);
  const vault = wallet('0x..');
  const recipient = wallet('0x..');
  const transferArgs = { to: recipient.address.toB256(), amount: bn(100), assetId: baseAssetId };

  const args: InputValue[] = [];

  const scriptInstance = script(DispatcherScript, vault);
  const predicateInstance = predicate(DispatcherScript);

  /**
   * Removal of `functions` nesting
   */
  const { value } = await script(DispatcherScript, vault).main(args).call();

  /**
   * tx functional
   * chained functions to shape the tx object / response
   */
  tx()
    .script({ script: scriptInstance, args })
    .predicate({ predicate: predicateInstance, args })
    .transfer(transferArgs)
    .submit({ provider })
    .then(logResponse)
    .then(waitForResult)
    .then(getReceipts)
    .catch(logErrors);

  /**
   * tx functional
   * build / submit / view
   */
  tx()
    .build({
      predicate: { predicate: predicateInstance, args },
      script: { script: scriptInstance, args },
      transfer: transferArgs,
    })
    .submit({ provider, someOtherParam: true })
    .then(waitForResult)
    .view({
      status: true,
      logs: true,
      receipts: true,
    })
    .catch(logErrors);
}
