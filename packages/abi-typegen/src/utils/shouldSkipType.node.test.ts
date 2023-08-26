import { shouldSkipAbiType } from './shouldSkipAbiType';
import { supportedTypes } from './supportedTypes';

/**
 * @group node
 */
describe('types.ts', () => {
  test('should always skip these types', () => {
    expect(shouldSkipAbiType({ type: '()' })).toEqual(true);
    expect(shouldSkipAbiType({ type: 'struct RawVec' })).toEqual(true);
  });

  test('should never skip known types', () => {
    supportedTypes.forEach((st) => {
      const type = st.swayType;
      const shouldSkip = shouldSkipAbiType({ type });
      expect(shouldSkip).toEqual(false);
    });
  });
});
