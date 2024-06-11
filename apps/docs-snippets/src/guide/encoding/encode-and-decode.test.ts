import { generateTestWallet } from '@fuel-ts/account/test-utils';
import {
  FUEL_NETWORK_URL,
  Provider,
  AbiCoder,
  FunctionInvocationResult,
  Script,
  ReceiptType,
  arrayify,
} from 'fuels';
import type { Account, JsonAbi, JsonAbiArgument, TransactionResultReturnDataReceipt } from 'fuels';

import abiSnippet from '../../../test/fixtures/abi/encode-and-decode.jsonc';
import { SumScriptAbi__factory as factory } from '../../../test/typegen/scripts/factories/SumScriptAbi__factory';

/**
 * @group node
 */
describe('encode and decode', () => {
  let wallet: Account;

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [{ assetId, amount: 500_000 }]);
  });

  it('generates valid ABI', () => {
    expect(abiSnippet).toEqual(factory.abi);
  });

  it('encodes and decodes', async () => {
    // #region encode-and-decode-3
    // #import { JsonAbi, JsonAbiArgument, Script, AbiCoder, FunctionInvocationResult, ReceiptType, TransactionResultReturnDataReceipt, arrayify};
    // #context import { factory } from './sway-programs-api';

    // Retrieve the script ABI and bytecode that we use to inform the encoding
    const abi: JsonAbi = factory.abi;
    const bytecode: string = factory.bin;

    // Create the invocation scope for the script call, passing the initial
    // value for the configurable constant
    const script = new Script(bytecode, abi, wallet);
    const initialValue = 10;
    script.setConfigurableConstants({ AMOUNT: initialValue });
    const invocationScope = script.functions.main(0);

    // Create the transaction request, this can be picked off the invocation
    // scope so the script bytecode is preset on the transaction
    const request = await invocationScope.getTransactionRequest();

    // Encode the argument we want to pass to the function. The argument is required
    // as a function parameter for all `AbiCoder` functions and we can extract it from the ABI itself
    const argument: JsonAbiArgument = abi.functions
      .find((f) => f.name === 'main')
      ?.inputs.find((i) => i.name === 'inputted_amount') as JsonAbiArgument;
    const argumentToAdd = 10;
    // Using the `AbiCoder`, we can now use the argument and the ABI to form it of the
    // encoding that is required for value that we are passing to it. Here we are passing
    // a u32 which takes 4 bytes up of property space
    const encodedArguments = AbiCoder.encode(abi, argument, [argumentToAdd]);
    // Therefore the value of 10 will be encoded to:
    // Uint8Array([0, 0, 0, 10]

    // The encoded value can now be set on the transaction via the script data property
    request.scriptData = encodedArguments;

    // Now we can build out the rest of the transaction and then fund it
    const txCost = await wallet.provider.getTransactionCost(request);
    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;
    await wallet.fund(request, txCost);

    // Submit the built transaction
    const response = await wallet.sendTransaction(request);
    await response.waitForResult();

    // Get result of the transaction, including the contract call result
    const invocationResult = await FunctionInvocationResult.build(
      [invocationScope],
      response,
      false,
      script
    );

    // The decoded value can be destructured from the `invocationResult`
    const { value } = invocationResult;

    // Or we can decode the returned bytes ourselves, by retrieving the return data
    // receipt that contains the returned bytes. We can get this by filtering on
    // the returned receipt types
    const returnDataReceipt = invocationResult.transactionResult.receipts.find(
      (r) => r.type === ReceiptType.ReturnData
    ) as TransactionResultReturnDataReceipt;
    // The data is in hex format so it makes sense to use arrayify so that the data
    // is more human readable
    const returnData = arrayify(returnDataReceipt.data);
    // returnData = new Uint8Array([0, 0, 0, 20]

    // And now we can decode the returned bytes in a similar fashion to how they were
    // encoded
    const [decodedReturnData] = AbiCoder.decode(abi, argument, returnData, 0);
    // 20
    // #endregion encode-and-decode-3

    const totalValue = argumentToAdd + initialValue;
    expect(value).toBe(totalValue);
    expect(decodedReturnData).toBe(totalValue);
    expect(encodedArguments).toStrictEqual(new Uint8Array([0, 0, 0, 10]));
    expect(returnData).toStrictEqual(new Uint8Array([0, 0, 0, 20]));
  });
});
