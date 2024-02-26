import type {
  Output,
  OutputChange,
  OutputCoin,
  OutputContract,
  OutputContractCreated,
  OutputVariable,
} from '@fuel-ts/transactions';
import { OutputType } from '@fuel-ts/transactions';

/** @hidden */
export function getOutputsByType<T = Output>(outputs: Output[], type: OutputType) {
  return outputs.filter((o) => o.type === type) as T[];
}

/** @hidden */
export function getOutputsContractCreated(outputs: Output[]) {
  return getOutputsByType<OutputContractCreated>(outputs, OutputType.ContractCreated);
}

/** @hidden */
export function getOutputsCoin(outputs: Output[]) {
  return getOutputsByType<OutputCoin>(outputs, OutputType.Coin);
}

/** @hidden */
export function getOutputsChange(outputs: Output[]) {
  return getOutputsByType<OutputChange>(outputs, OutputType.Change);
}

/** @hidden */
export function getOutputsContract(outputs: Output[]) {
  return getOutputsByType<OutputContract>(outputs, OutputType.Contract);
}

/** @hidden */
export function getOutputsVariable(outputs: Output[]) {
  return getOutputsByType<OutputVariable>(outputs, OutputType.Variable);
}
