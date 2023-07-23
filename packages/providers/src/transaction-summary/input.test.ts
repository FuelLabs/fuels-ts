import { NativeAssetId } from '@fuel-ts/address/configs';
import type { InputCoin } from '@fuel-ts/transactions';

import {
  MOCK_INPUT_COIN,
  MOCK_INPUT_CONTRACT,
  MOCK_INPUT_MESSAGE,
  MOCK_OUTPUT_CONTRACT,
} from '../../test/fixtures/transaction-summary';

import {
  getInputAccountAddress,
  getInputContractFromIndex,
  getInputFromAssetId,
  getInputsCoin,
  getInputsMessage,
} from './input';

describe('getInputs', () => {
  it('should ensure getInputsCoin return correct inputs', () => {
    const coinInputs = getInputsCoin([MOCK_INPUT_COIN, MOCK_INPUT_CONTRACT, MOCK_INPUT_MESSAGE]);

    expect(coinInputs.length).toEqual(1);
    expect(coinInputs[0]).toStrictEqual(MOCK_INPUT_COIN);

    const emptyInputs = getInputsCoin([MOCK_INPUT_CONTRACT, MOCK_INPUT_MESSAGE]);
    expect(emptyInputs.length).toEqual(0);
  });

  it('should ensure getInputsMessage return correct inputs', () => {
    const messageInputs = getInputsMessage([
      MOCK_INPUT_COIN,
      MOCK_INPUT_CONTRACT,
      MOCK_INPUT_MESSAGE,
    ]);

    expect(messageInputs.length).toEqual(1);
    expect(messageInputs[0]).toStrictEqual(MOCK_INPUT_MESSAGE);

    const emptyInputs = getInputsMessage([MOCK_INPUT_CONTRACT, MOCK_INPUT_COIN]);
    expect(emptyInputs.length).toEqual(0);
  });

  it('should ensure getInputContractFromIndex return correct inputs', () => {
    const contractOutput = MOCK_OUTPUT_CONTRACT;

    const inputContract = getInputContractFromIndex(
      [MOCK_INPUT_CONTRACT],
      contractOutput.inputIndex
    );

    expect(inputContract).toStrictEqual(MOCK_INPUT_CONTRACT);
  });

  it('should ensure getInputContractFromIndex return empty', () => {
    const contractOutput = MOCK_OUTPUT_CONTRACT;

    const emptyInputs = getInputContractFromIndex([], contractOutput.inputIndex);

    expect(emptyInputs).toBeUndefined();
  });

  it('should ensure getInputAccountAddress return correct address of owner of input', () => {
    expect(getInputAccountAddress(MOCK_INPUT_COIN)).toEqual(MOCK_INPUT_COIN.owner);

    expect(getInputAccountAddress(MOCK_INPUT_MESSAGE)).toEqual(MOCK_INPUT_MESSAGE.recipient);

    expect(getInputAccountAddress(MOCK_INPUT_CONTRACT)).toEqual('');
  });

  it('should ensure getInputFromAssetId return correct input to pay for that assetId', () => {
    const nativeAssetId = NativeAssetId;
    const customAssetId = '0x0101010101010101010101010101010101010101010101010101010101010101';

    const inputCoin1: InputCoin = {
      ...MOCK_INPUT_COIN,
      assetId: nativeAssetId,
    };

    const inputCoin2: InputCoin = {
      ...MOCK_INPUT_COIN,
      assetId: customAssetId,
    };

    expect(getInputFromAssetId([inputCoin1, inputCoin2], nativeAssetId)).toStrictEqual(inputCoin1);
    expect(getInputFromAssetId([inputCoin1, inputCoin2], customAssetId)).toStrictEqual(inputCoin2);

    expect(getInputFromAssetId([MOCK_INPUT_MESSAGE], nativeAssetId)).toStrictEqual(
      MOCK_INPUT_MESSAGE
    );
  });
});
