import { makeTestType } from '../../../test/utils/makeTestType';

import { EmptyType } from './EmptyType';

/**
 * @group node
 */
describe('EmptyType.ts', () => {
  test('should properly parse type attributes', () => {
    const emptyType = makeTestType(EmptyType.swayType);

    expect(emptyType.attributes.inputLabel).toEqual('never');
    expect(emptyType.attributes.outputLabel).toEqual('void');
  });
});
