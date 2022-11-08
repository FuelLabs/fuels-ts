import { contractPaths } from '../../../test/fixtures';
import { compileSwayToTs } from '../../../test/utils/sway/compileSwayToTs';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('TupleType.ts', () => {
  test('should properly parse type attributes', () => {
    console.log(
      compileSwayToTs({
        contractPath: contractPaths.tupleOnly,
      }).dts
    );
  });

  test('should properly parse type attributes', () => {
    const tuple = new TupleType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: TupleType.swayTypeExample,
      },
    });

    tuple.parseComponentsAttributes({ types: [] });

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayTypeExample });
    const suitableForArrauy = TupleType.isSuitableFor({ type: ArrayType.swayTypeExample });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArrauy).toEqual(false);

    expect(tuple.attributes.inputLabel).toEqual('[]');
    expect(tuple.attributes.outputLabel).toEqual('[]');
  });
});
