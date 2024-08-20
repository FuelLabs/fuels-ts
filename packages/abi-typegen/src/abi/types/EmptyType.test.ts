import { EmptyType } from './EmptyType';

/**
 * @group node
 */
describe('EmptyType.ts', () => {
  test('should properly parse type attributes', () => {
    const emptyType = new EmptyType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 0,
        type: EmptyType.swayType,
      },
    });

    expect(emptyType.attributes.inputLabel).toEqual('undefined');
    expect(emptyType.attributes.outputLabel).toEqual('void');
  });
});
