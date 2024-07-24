import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { Input, InputCoin, InputContract, InputMessage } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

/** @hidden */
export function getInputsByTypes<T = Input>(inputs: Input[], types: Array<InputType>) {
  return inputs.filter((i) => types.includes(i.type)) as T[];
}

/** @hidden */
export function getInputsByType<T = Input>(inputs: Input[], type: InputType) {
  return inputs.filter((i) => i.type === type) as T[];
}

/** @hidden */
export function getInputsCoin(inputs: Input[]) {
  return getInputsByType<InputCoin>(inputs, InputType.Coin);
}

/** @hidden */
export function getInputsMessage(inputs: Input[]) {
  return getInputsByType<InputMessage>(inputs, InputType.Message);
}

/** @hidden */
export function getInputsCoinAndMessage(inputs: Input[]) {
  return getInputsByTypes<InputCoin | InputMessage>(inputs, [InputType.Coin, InputType.Message]);
}

/** @hidden */
export function getInputsContract(inputs: Input[]) {
  return getInputsByType<InputContract>(inputs, InputType.Contract);
}

/** @hidden */
export function getRelevantInputs(inputs: Input[], assetId: string = ZeroBytes32) {
  const coinInputs = getInputsCoin(inputs);
  const messageInputs = getInputsMessage(inputs);
  let coinInput = coinInputs.find((i) => i.assetId === assetId);
  // #TODO: There are times when the ReceiptCall's baseAssetId doesn't match the CoinInput's assetId
  // In this case, we should return the last input in the CoinInput array
  if (!coinInput && coinInputs.length > 0) {
    coinInput = coinInputs[coinInputs.length - 1];
  }

  const messageInput = messageInputs.find(({ amount }) => !!amount && amount.gt(0));

  if (coinInput) {
    return coinInput;
  }

  return messageInput;
}

/** @hidden */
export function getInputContractFromIndex(
  inputs: Input[],
  inputIndex: number
): InputContract | undefined {
  if (inputIndex == null) {
    return undefined;
  }

  const contractInput = inputs?.[inputIndex];

  if (!contractInput) {
    return undefined;
  }
  if (contractInput.type !== InputType.Contract) {
    throw new FuelError(
      ErrorCode.INVALID_TRANSACTION_INPUT,
      `Contract input should be of type 'contract'.`
    );
  }

  return contractInput as InputContract;
}

/** @hidden */
export function getInputAccountAddress(input: Input) {
  if (input.type === InputType.Coin) {
    return input.owner.toString();
  }

  if (input.type === InputType.Message) {
    return input.recipient.toString();
  }

  return '';
}
