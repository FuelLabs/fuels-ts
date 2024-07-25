import { EmptyType } from './EmptyType';

/**
 * @group node
 */
describe('EmptyType.ts', () => {
  test('should properly parse type attributes', () => {
    const emptyType = new EmptyType({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: undefined,
      type: EmptyType.swayType,
    });

    expect(emptyType.attributes.inputLabel).toEqual('never');
    expect(emptyType.attributes.outputLabel).toEqual('void');
  });
});
