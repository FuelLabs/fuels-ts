import type { Input, InputCoin, InputMessage } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

export function getInputsByType<T = Input>(inputs: Input[], type: InputType) {
  return (inputs ?? []).filter((i) => i.type === type) as T[];
}

export function getInputsCoin(inputs: Input[]) {
  return getInputsByType<InputCoin>(inputs, InputType.Coin);
}

export function getInputsMessage(inputs: Input[]) {
  return getInputsByType<InputMessage>(inputs, InputType.Message);
}

export function getInputFromAssetId(inputs: Input[], assetId: string) {
  const coinInputs = getInputsCoin(inputs);
  const messageInputs = getInputsMessage(inputs);
  const coinInput = coinInputs.find((i) => i.assetId === assetId);
  // TODO: should include assetId in InputMessage as well. for now we're mocking ETH
  const messageInput = messageInputs.find(
    (_) => assetId === '0x0000000000000000000000000000000000000000000000000000000000000000'
  );

  return coinInput || messageInput;
}
