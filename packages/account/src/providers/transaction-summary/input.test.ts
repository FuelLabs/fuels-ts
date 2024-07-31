import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import type { InputCoin, InputMessage } from '@fuel-ts/transactions';
import { ASSET_A } from '@fuel-ts/utils/test-utils';

import {
  MOCK_INPUT_COIN,
  MOCK_INPUT_CONTRACT,
  MOCK_INPUT_MESSAGE,
  MOCK_OUTPUT_CONTRACT,
} from '../../../test/fixtures/transaction-summary';

import {
  getInputAccountAddress,
  getInputContractFromIndex,
  getInputFromAssetId,
  getInputsCoin,
  getInputsContract,
  getInputsMessage,
} from './input';

/**
 * @group node
 */
describe('transaction-summary/input', () => {
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

  it('should ensure getInputsContract return correct inputs', () => {
    const messageInputs = getInputsContract([
      MOCK_INPUT_COIN,
      MOCK_INPUT_CONTRACT,
      MOCK_INPUT_MESSAGE,
    ]);

    expect(messageInputs.length).toEqual(1);
    expect(messageInputs[0]).toStrictEqual(MOCK_INPUT_CONTRACT);

    const emptyInputs = getInputsContract([MOCK_INPUT_COIN, MOCK_INPUT_MESSAGE]);
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
    const emptyInputs = getInputContractFromIndex([], 0);

    expect(emptyInputs).toBeUndefined();
  });

  it('should ensure getInputContractFromIndex throws if input type is not Contract', () => {
    expect(() => getInputContractFromIndex([MOCK_INPUT_COIN], 0)).toThrowError(
      `Contract input should be of type 'contract'.`
    );
  });

  it('should ensure getInputContractFromIndex returns undefined if index is null', () => {
    const res = getInputContractFromIndex([MOCK_INPUT_COIN], null as unknown as number);
    expect(res).toBeUndefined();
  });

  it('should ensure getInputAccountAddress return correct address of owner of input', () => {
    expect(getInputAccountAddress(MOCK_INPUT_COIN)).toEqual(MOCK_INPUT_COIN.owner);

    expect(getInputAccountAddress(MOCK_INPUT_MESSAGE)).toEqual(MOCK_INPUT_MESSAGE.recipient);

    expect(getInputAccountAddress(MOCK_INPUT_CONTRACT)).toEqual('');
  });

  it('should return empty string if input it is not message or coin', () => {
    const address = getInputAccountAddress(MOCK_INPUT_CONTRACT);

    expect(address).toEqual('');
  });

  it('should ensure getInputFromAssetId return correct input to pay for that assetId', () => {
    const inputCoin1: InputCoin = {
      ...MOCK_INPUT_COIN,
      assetId: ZeroBytes32,
    };

    const inputCoin2: InputCoin = {
      ...MOCK_INPUT_COIN,
      assetId: ASSET_A,
    };

    expect(getInputFromAssetId([inputCoin1, inputCoin2], ZeroBytes32)).toStrictEqual(inputCoin1);
    expect(getInputFromAssetId([inputCoin1, inputCoin2], ASSET_A)).toStrictEqual(inputCoin2);

    expect(getInputFromAssetId([MOCK_INPUT_MESSAGE], ZeroBytes32, true)).toStrictEqual(
      MOCK_INPUT_MESSAGE
    );
  });

  it('should ensure getInputFromAssetId returns the correct coinInput thats greater than 0 for default assetId', () => {
    const coinInput1: InputCoin = {
      ...MOCK_INPUT_COIN,
      amount: bn(100),
      assetId: ZeroBytes32,
    };

    const coinInput2: InputCoin = {
      ...MOCK_INPUT_COIN,
      amount: bn(0),
      assetId: ZeroBytes32,
    };

    expect(getInputFromAssetId([coinInput1, coinInput2], ZeroBytes32)).toEqual(coinInput1);
  });

  it('Should return the correct input message for withdrawals', () => {
    const inputMessage: InputMessage = {
      ...MOCK_INPUT_MESSAGE,
      amount: bn(100),
    };

    expect(getInputFromAssetId([inputMessage], ZeroBytes32, true)).toEqual(inputMessage);
  });
});
