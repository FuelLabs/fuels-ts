/* eslint-disable @typescript-eslint/no-unused-vars */
import { bn } from 'fuels';

import type {
  OptionalContractIdInput,
  OptionalContractIdOutput,
  OptionalU64Input,
  OptionalCallValueOutput,
} from '../example/types/MulticallAbi';

describe('Contract Factory', () => {
  it('compiled and had sound types', async () => {
    const optionU64Some: OptionalU64Input = 11;
    const optionU64None: OptionalU64Input = undefined;
    const optionContractIdSome: OptionalContractIdInput = { value: 'contractId' };
    const optionContractIdNone: OptionalContractIdInput = undefined;
    const optionOutContractIdSome: OptionalContractIdOutput = { value: 'contractId' };
    const optionOutContractIdNone: OptionalContractIdOutput = undefined;
    const optionCallValueSome: OptionalCallValueOutput = {
      Value: bn(23),
      Data: [bn(5000), bn(10000)],
    };
    const optionCallValueNone: OptionalCallValueOutput = undefined;

    expect(1).toEqual(1);
  });
});
