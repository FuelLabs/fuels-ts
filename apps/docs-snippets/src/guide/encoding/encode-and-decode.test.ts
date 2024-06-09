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
    // #region encode-and-decode-2
    // #import { JsonAbi };

    const ABI: JsonAbi = {
      encoding: '1',
      types: [
        {
          typeId: 0,
          type: 'u32',
          components: null,
          typeParameters: null,
        },
      ],
      functions: [
        {
          inputs: [
            {
              name: 'inputted_amount',
              type: 0,
              typeArguments: null,
            },
          ],
          name: 'main',
          output: {
            name: '',
            type: 0,
            typeArguments: null,
          },
          attributes: null,
        },
      ],
      loggedTypes: [],
      messagesTypes: [],
      configurables: [
        {
          name: 'AMOUNT',
          configurableType: {
            name: '',
            type: 0,
            typeArguments: null,
          },
          offset: 784,
        },
      ],
    };
    // #endregion encode-and-decode-2

    expect(ABI).toEqual(factory.abi);
  });

  it('encodes and decodes', async () => {
    // #region encode-and-decode-3
    // #import { JsonAbi, JsonAbiArgument, Script, AbiCoder, FunctionInvocationResult, ReceiptType, TransactionResultReturnDataReceipt, arrayify};

    const abi: JsonAbi = factory.abi;
    const bin: string = factory.bin;
    const argument: JsonAbiArgument = abi.functions
      .find((f) => f.name === 'main')
      ?.inputs.find((i) => i.name === 'inputted_amount') as JsonAbiArgument;

    // Create the script invocation scope
    const script = new Script(bin, abi, wallet);
    const initialValue = 10;
    script.setConfigurableConstants({ AMOUNT: initialValue });
    const invocationScope = script.functions.main(0);

    // Create the transaction request
    const request = await invocationScope.getTransactionRequest();

    // Encode the argument we want to pass to the function
    const argumentToAdd = 10;
    const encodedArguments = AbiCoder.encode(abi, argument, [argumentToAdd]);
    // encodedArguments = new Uint8Array([0, 0, 0, 10]

    // Set the encoded arguments on the request
    request.scriptData = encodedArguments;

    // Estimate and fund the transaction
    const txCost = await wallet.provider.getTransactionCost(request);
    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;
    await wallet.fund(request, txCost);

    // Submit the transaction
    const response = await wallet.sendTransaction(request);
    await response.waitForResult();

    // Get result of contract call
    const invocationResult = await FunctionInvocationResult.build(
      [invocationScope],
      response,
      false,
      script
    );

    // Get the return data receipt that contains the returned bytes
    const returnDataReceipt = invocationResult.transactionResult.receipts.find(
      (r) => r.type === ReceiptType.ReturnData
    ) as TransactionResultReturnDataReceipt;
    const returnData = arrayify(returnDataReceipt.data);
    // returnData = new Uint8Array([0, 0, 0, 20]

    // Decode the return data
    const [decodedReturnData] = AbiCoder.decode(abi, argument, returnData, 0);
    // 20
    // #endregion encode-and-decode-3

    const totalValue = argumentToAdd + initialValue;
    expect(invocationResult.value).toBe(totalValue);
    expect(decodedReturnData).toBe(totalValue);
    expect(encodedArguments).toStrictEqual(new Uint8Array([0, 0, 0, 10]));
    expect(returnData).toStrictEqual(new Uint8Array([0, 0, 0, 20]));
  });
});
