import { Interface } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { arrayify, decompressBytecode } from '@fuel-ts/utils';

import { createConfigurables } from './createConfigurables';
import {
  extractBlobIdAndDataOffset,
  getPredicateScriptLoaderInstructions,
  isBytecodeLoader,
} from './predicate-script-loader-instructions';

const abi = {
  programType: 'predicate',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: 'bool',
      concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
    {
      type: 'str',
      concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
    },
    {
      type: 'u8',
      concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
    },
  ],
  metadataTypes: [],
  functions: [
    {
      inputs: [
        {
          name: 'some_bool',
          concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
        },
        {
          name: 'some_u8',
          concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
        },
        {
          name: 'some_str',
          concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
        },
        {
          name: 'some_str_2',
          concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
        },
        {
          name: 'some_str_3',
          concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
        },
        {
          name: 'some_last_u8',
          concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
        },
      ],
      name: 'main',
      output: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [
    {
      name: 'BOOL',
      concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      offset: 2048,
      indirect: false,
    },
    {
      name: 'U8',
      concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
      offset: 2088,
      indirect: false,
    },
    {
      name: 'STR',
      concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
      offset: 2064,
      indirect: true,
    },
    {
      name: 'STR_2',
      concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
      offset: 2072,
      indirect: true,
    },
    {
      name: 'STR_3',
      concreteTypeId: '8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a',
      offset: 2080,
      indirect: true,
    },
    {
      name: 'LAST_U8',
      concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
      offset: 2056,
      indirect: false,
    },
  ],
};

// Predicate with dynamic configurables
const bytecode = decompressBytecode(
  'H4sIAAAAAAAAA5VWTWgTWxQ+k8bXwOvjXUwXffctOkjBCi4G/7a9QzrEmIbcEEXFTHuL6EpR6/9Kl24EFfxZunTnLHXXlbiSbgRFhIh2ITXgwoDFRfzOzYwdJ6loIJxhznfu/c53v3MT+dmjC0R5sp9CPyCGvWVH9Hp0m2i3XvtM+gM5uq3I/bqbjnxr5/S3dh51N5ErxDknk3uDnAjXHpJYe7wMzBgwuQymC8xEBrM1g/kEjJvBbMtg3gMzHfPYlck9lZ8099E+p2hkMchRsSLo0n76a2k/5YrB+PVLs+TsQ9eLfu4A8A7i2EKH/tel6JX8SNmer8nyCg15f0tWV0jXoyuck6teNv9O1lfIdDwBzI1NMK8Yo5uRMA2Le7AJ7oXFHY5cc8gTQ7icliXLxZuvCdKBV5gPXI7ClCOB6JpAcfRMoDmq+YAI/XotH7EceToQhVaA2iqeK65qVVBfjx6ZOuqPRU/MUdQ3o+emoe3+clWQfOeRfGtIvlYkX7pZTs+Y05Qiukv07z1YLT6XCVl6SLJ8i2T1Osl622pr13sfZdcYD7EGzsYB18KQvif4bJAT8z64I8pZQdOVvJJfiO5wft2jB9j7Pjgc+Gq5jCZc+jzAodqmBeghu+Cw7ib40Rj/g3sf3+eb4fEP91qsADdH7LV80Scl5+A71fea7EKrdZHlMrB2iDVY+7BGJGqeWvBR13V/Wfsnml4kmvmVpshPWS/BN7FHfkfTyRQXleXC/t7wzM93CvY7HvPZgr2mse9Egh2msemQYN8a8OK4NEsixU2luE3G3GZS3MwGN2gNjcOaR2GDaOkgFUQjgN6K+XqmQYWFjjdqOtb32qAHxonG7LLFlCLFHEKen2bkgn8eeO5BGF8JE5BgP4GTSXlqJubUG86J9TpLsomZOgxPHIN2LUWt8CwV/S3L7CXoMKKV2sVzW/THrb/w7m+8y5mOK/jc7N5r0TANp1nDuGYMNVuBx92Auwdzbyqo+4gzWh2YZZmp24Y6Ze+UKrTZvG4sVce8nT7vg/C0PS9oYxJtekO8pNPnxWfPfWX22LlxhwrwGPjNmpJNzGZtL76YJY35nKP/+K40NeY9cNduj9dTm6w3ae8cnDk8Mixf4J53NPZo2VXco06df+LJkVSPIpl9218pInjKifURqbkf+c3aRNuB2jLuISf+xRdxjD874rg3jn7yzyB//vLi1eT55Jml4z+eL5449R232/RNTQgAAA=='
);

// TODO: move to more appropriate place
describe('isBytecodeLoader', () => {
  it('should return false for non-loader bytecode', () => {
    const isLoader = isBytecodeLoader(bytecode);
    expect(isLoader).toBe(false);
  });

  it('should return true for loader bytecode', () => {
    const blobId = arrayify(ZeroBytes32);
    const { loaderBytecode } = getPredicateScriptLoaderInstructions(bytecode, blobId);
    const isLoader = isBytecodeLoader(loaderBytecode);
    expect(isLoader).toBe(true);
  });
});

// TODO: move to more appropriate place
describe('extractBlobIdAndDataOffset', () => {
  it('should return the correct blobId and dataOffset [regular]', () => {
    const PredicateWithDynamicConfigurableConfigurables = {
      bytecode: decompressBytecode(
        'H4sIAAAAAAAAA5VWTWgTWxQ+k8bXwOvjXUwXffctOkjBCi4G/7a9QzrEmIbcEEXFTHuL6EpR6/9Kl24EFfxZunTnLHXXlbiSbgRFhIh2ITXgwoDFRfzOzYwdJ6loIJxhznfu/c53v3MT+dmjC0R5sp9CPyCGvWVH9Hp0m2i3XvtM+gM5uq3I/bqbjnxr5/S3dh51N5ErxDknk3uDnAjXHpJYe7wMzBgwuQymC8xEBrM1g/kEjJvBbMtg3gMzHfPYlck9lZ8099E+p2hkMchRsSLo0n76a2k/5YrB+PVLs+TsQ9eLfu4A8A7i2EKH/tel6JX8SNmer8nyCg15f0tWV0jXoyuck6teNv9O1lfIdDwBzI1NMK8Yo5uRMA2Le7AJ7oXFHY5cc8gTQ7icliXLxZuvCdKBV5gPXI7ClCOB6JpAcfRMoDmq+YAI/XotH7EceToQhVaA2iqeK65qVVBfjx6ZOuqPRU/MUdQ3o+emoe3+clWQfOeRfGtIvlYkX7pZTs+Y05Qiukv07z1YLT6XCVl6SLJ8i2T1Osl622pr13sfZdcYD7EGzsYB18KQvif4bJAT8z64I8pZQdOVvJJfiO5wft2jB9j7Pjgc+Gq5jCZc+jzAodqmBeghu+Cw7ib40Rj/g3sf3+eb4fEP91qsADdH7LV80Scl5+A71fea7EKrdZHlMrB2iDVY+7BGJGqeWvBR13V/Wfsnml4kmvmVpshPWS/BN7FHfkfTyRQXleXC/t7wzM93CvY7HvPZgr2mse9Egh2msemQYN8a8OK4NEsixU2luE3G3GZS3MwGN2gNjcOaR2GDaOkgFUQjgN6K+XqmQYWFjjdqOtb32qAHxonG7LLFlCLFHEKen2bkgn8eeO5BGF8JE5BgP4GTSXlqJubUG86J9TpLsomZOgxPHIN2LUWt8CwV/S3L7CXoMKKV2sVzW/THrb/w7m+8y5mOK/jc7N5r0TANp1nDuGYMNVuBx92Auwdzbyqo+4gzWh2YZZmp24Y6Ze+UKrTZvG4sVce8nT7vg/C0PS9oYxJtekO8pNPnxWfPfWX22LlxhwrwGPjNmpJNzGZtL76YJY35nKP/+K40NeY9cNduj9dTm6w3ae8cnDk8Mixf4J53NPZo2VXco06df+LJkVSPIpl9218pInjKifURqbkf+c3aRNuB2jLuISf+xRdxjD874rg3jn7yzyB//vLi1eT55Jml4z+eL5449R232/RNTQgAAA=='
      ),
    };
    const expectedBlobId = '0x63eb718285528ee78dfc07d6935616deaa8a69285571716d8b52782a5d43840d';
    const expectedDataOffset = 2048;

    const { blobId, dataOffset } = extractBlobIdAndDataOffset(
      PredicateWithDynamicConfigurableConfigurables.bytecode
    );

    expect(blobId).toEqual(arrayify(expectedBlobId));
    expect(dataOffset).toBe(expectedDataOffset);
  });

  it('should return the correct blobId and dataOffset [loader w/ data]', () => {
    const PredicateWithDynamicConfigurableConfigurablesLoader = {
      bytecode: decompressBytecode(
        'H4sIAAAAAAAAA5NyMGAIcGQwkHIJYNjlycBg5MDSCOQrxALZQJoDyG9ScBVmCHIVYPFyYWBIfl3Y1BrU97z3D/u1yWFi91Z1ZWqEFhbmdgdVaMU6t/AyQIAvI5QhAKWhQBNKm0JpRw4og6W4PLESxk7LL0qGs0tTcwAvXB4ppQAAAA=='
      ),
    };
    const expectedBlobId = '0x63eb718285528ee78dfc07d6935616deaa8a69285571716d8b52782a5d43840d';
    const expectedDataOffset = 88;

    const { blobId, dataOffset } = extractBlobIdAndDataOffset(
      PredicateWithDynamicConfigurableConfigurablesLoader.bytecode
    );

    expect(blobId).toEqual(arrayify(expectedBlobId));
    expect(dataOffset).toBe(expectedDataOffset);
  });

  it('should return the correct blobId and dataOffset [loader w/o data]', () => {
    const PredicateTrueLoader = {
      bytecode: decompressBytecode(
        'H4sIAAAAAAAAA5NyMGAIcGRQkHIJYNjlycBg5MDSqOAqzBDkKsDi5cLAcCCvQX0T42l2s/N5nkbxS2Z9e5Rt/OdVRE/Mwzsmha+e7wAAU6+fgEAAAAA='
      ),
    };
    const expectedBlobId = '0xc06e8027b201cb0736cf6e49325fa49af6e26b33fcea588c5ce1dc3471eae7b8';
    const expectedDataOffset = 64;

    const { blobId, dataOffset } = extractBlobIdAndDataOffset(PredicateTrueLoader.bytecode);

    expect(blobId).toEqual(arrayify(expectedBlobId));
    expect(dataOffset).toBe(expectedDataOffset);
    expect(dataOffset).toEqual(PredicateTrueLoader.bytecode.length);
  });
});

describe('configurables', () => {
  it('should return the configurables', () => {
    const configurables = createConfigurables({
      bytecode,
      abi: new Interface(abi),
    });

    const entries = configurables.all();

    expect(entries).toEqual([
      { name: 'BOOL', value: true },
      { name: 'U8', value: 8 },
      { name: 'STR', value: 'sway' },
      { name: 'STR_2', value: 'forc' },
      { name: 'STR_3', value: 'fuel' },
      { name: 'LAST_U8', value: 16 },
    ]);
  });

  it('should write direct configurables', () => {
    const configurables = createConfigurables({
      bytecode,
      abi: new Interface(abi),
    });

    configurables.set({
      BOOL: false,
      U8: 16,
      LAST_U8: 32,
    });

    const entries = configurables.all();
    expect(entries).toEqual(
      expect.arrayContaining([
        { name: 'BOOL', value: false }, // Changed
        { name: 'U8', value: 16 }, // Changed
        { name: 'STR', value: 'sway' },
        { name: 'STR_2', value: 'forc' },
        { name: 'STR_3', value: 'fuel' },
        { name: 'LAST_U8', value: 32 }, // Changed
      ])
    );
  });

  it('should write indirect configurables', () => {
    const configurables = createConfigurables({
      bytecode,
      abi: new Interface(abi),
    });

    configurables.set({
      STR: 'sway-sway-sway',
      STR_2: 'forc-forc',
      STR_3: '',
    });

    const entries = configurables.all();
    expect(entries).toMatchObject(
      expect.arrayContaining([
        { name: 'BOOL', value: true },
        { name: 'U8', value: 8 },
        { name: 'STR', value: 'sway-sway-sway' }, // Changed
        { name: 'STR_2', value: 'forc-forc' }, // Changed
        { name: 'STR_3', value: '' }, // Changed
        { name: 'LAST_U8', value: 16 },
      ])
    );
  });

  it('should write both direct and indirect configurables', () => {
    const configurables = createConfigurables({
      bytecode,
      abi: new Interface(abi),
    });

    configurables.set({
      STR: 'sway-sway-sway',
      STR_2: 'forc-forc',
      STR_3: '',
      BOOL: false,
      U8: 16,
      LAST_U8: 32,
    });

    const entries = configurables.all();
    expect(entries).toMatchObject(
      expect.arrayContaining([
        { name: 'BOOL', value: false }, // Changed
        { name: 'U8', value: 16 }, // Changed
        { name: 'STR', value: 'sway-sway-sway' }, // Changed
        { name: 'STR_2', value: 'forc-forc' }, // Changed
        { name: 'STR_3', value: '' }, // Changed
        { name: 'LAST_U8', value: 32 }, // Changed
      ])
    );
  });
});
