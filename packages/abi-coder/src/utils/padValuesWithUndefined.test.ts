import type { InputValue } from '../encoding/coders/AbstractCoder';
import type { JsonAbiArgument } from '../types/JsonAbi';

import { padValuesWithUndefined } from './padValuesWithUndefined';

const MOCK_INPUT: JsonAbiArgument = {
  name: 'test',
  type: 0,
  typeArguments: [],
};

/**
 * @group node
 * @group browser
 */
describe('padValuesWithUndefined', () => {
  it('should not pad values if they are already the same length as inputs', () => {
    const values: InputValue[] = [1, 2, 3];
    const inputs: ReadonlyArray<JsonAbiArgument> = [MOCK_INPUT, MOCK_INPUT, MOCK_INPUT];

    const result = padValuesWithUndefined(values, inputs);

    expect(result).toEqual(values);
  });

  it('should not pad values if they are longer than inputs', () => {
    const values: InputValue[] = [1, 2, 3];
    const inputs: ReadonlyArray<JsonAbiArgument> = [MOCK_INPUT, MOCK_INPUT];

    const result = padValuesWithUndefined(values, inputs);

    expect(result).toEqual(values);
  });

  it('should pad values with undefined if they are shorter than inputs', () => {
    const values: InputValue[] = [1, 2];
    const inputs: ReadonlyArray<JsonAbiArgument> = [MOCK_INPUT, MOCK_INPUT, MOCK_INPUT];

    const result = padValuesWithUndefined(values, inputs);

    expect(result).toEqual([1, 2, undefined]);
  });

  it('should pad values with undefined if they are empty', () => {
    const values: InputValue[] = [];
    const inputs: ReadonlyArray<JsonAbiArgument> = [MOCK_INPUT, MOCK_INPUT, MOCK_INPUT];

    const result = padValuesWithUndefined(values, inputs);

    expect(result).toEqual([undefined, undefined, undefined]);
  });
});
