import type { JsonAbi, TransactionResultReturnDataReceipt } from 'fuels';
import { buildFunctionResult, ReceiptType, arrayify, Script, Interface } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore JSONC extension requires mapping but behaves fine
import abiSnippet from '../../../test/fixtures/abi/encode-and-decode.jsonc';
import { SumScript as factory } from '../../../test/typegen/scripts/SumScript';

/**
 * @group node
 * @group browser
 */
describe('encode and decode', () => {
  it('generates valid ABI', () => {
    expect(abiSnippet).toEqual(factory.abi);
  });

  it('encodes and decodes', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // #region encode-and-decode-3
    // #import { JsonAbi, Script };
    // #context import { factory } from './sway-programs-api';

    // First we need to build out the transaction via the script that we want to encode.
    // For that we'll need the ABI and the bytecode of the script
    const abi: JsonAbi = factory.abi;
    const bytecode = factory.bytecode;

    // Create the invocation scope for the script call, passing the initial
    // value for the configurable constant
    const script = new Script(bytecode, abi, wallet);
    const initialValue = 10;
    script.setConfigurableConstants({ AMOUNT: initialValue });
    const invocationScope = script.functions.main(0);

    // Create the transaction request, this can be picked off the invocation
    // scope so the script bytecode is preset on the transaction
    const request = await invocationScope.getTransactionRequest();
    // #endregion encode-and-decode-3

    // #region encode-and-decode-4
    // #import { Interface };

    // Now we can encode the argument we want to pass to the function. The argument is required
    // as a function parameter for all abi functions and we can extract it from the ABI itself
    const argument = abi.functions
      .find((f) => f.name === 'main')
      ?.inputs.find((i) => i.name === 'inputted_amount')?.concreteTypeId as string;

    // The `Interface` class is the entry point for encoding and decoding all things abi-related.
    // We will use its `encodeType` method and create the encoding required for
    // a u32 which takes 4 bytes up of property space.

    const abiInterface = new Interface(abi);
    const argumentToAdd = 10;
    const encodedArguments = abiInterface.encodeType(argument, [argumentToAdd]);
    // Therefore the value of 10 will be encoded to:
    // Uint8Array([0, 0, 0, 10]

    // The encoded value can now be set on the transaction via the script data property
    request.scriptData = encodedArguments;

    // Now we can build out the rest of the transaction and then fund it
    const txCost = await wallet.getTransactionCost(request);
    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;
    await wallet.fund(request, txCost);

    // Finally, submit the built transaction
    const response = await wallet.sendTransaction(request);
    await response.waitForResult();
    // #endregion encode-and-decode-4

    // #region encode-and-decode-5
    // #import { ReceiptType, TransactionResultReturnDataReceipt, arrayify, buildFunctionResult };

    // Get result of the transaction, including the contract call result. For this we'll need
    // the previously created invocation scope, the transaction response and the script
    const invocationResult = await buildFunctionResult({
      funcScope: invocationScope,
      isMultiCall: false,
      program: script,
      transactionResponse: response,
    });

    // The decoded value can be destructured from the `FunctionInvocationResult`
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
    // encoded, via the `Interface`
    const [decodedReturnData] = abiInterface.decodeType(argument, returnData);
    // 20
    // #endregion encode-and-decode-5

    const totalValue = argumentToAdd + initialValue;
    expect(value).toBe(totalValue);
    expect(decodedReturnData).toBe(totalValue);
    expect(encodedArguments).toStrictEqual(new Uint8Array([0, 0, 0, 10]));
    expect(returnData).toStrictEqual(new Uint8Array([0, 0, 0, 20]));
  });
});
