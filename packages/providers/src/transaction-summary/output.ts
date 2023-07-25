import type {
  Output,
  OutputCoin,
  OutputContract,
  OutputContractCreated,
} from '@fuel-ts/transactions';
import { OutputType } from '@fuel-ts/transactions';

export function getOutputsByType<T = Output>(outputs: Output[], type: OutputType) {
  return outputs.filter((o) => o.type === type) as T[];
}

export function getOutputsContractCreated(outputs: Output[]) {
  return getOutputsByType<OutputContractCreated>(outputs, OutputType.ContractCreated);
}

export function getOutputsCoin(outputs: Output[]) {
  return getOutputsByType<OutputCoin>(outputs, OutputType.Coin);
}

export function getOutputsContract(outputs: Output[]) {
  return getOutputsByType<OutputContract>(outputs, OutputType.Contract);
}
