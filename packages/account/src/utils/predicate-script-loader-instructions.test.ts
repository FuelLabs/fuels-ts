import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { arrayify, concat, decompressBytecode } from '@fuel-ts/utils';

import {
  extractBlobIdAndDataOffset,
  getBytecodeConfigurableOffset,
  getBytecodeDataOffset,
  getBytecodeId,
  getLegacyBlobId,
  getPredicateScriptLoaderInstructions,
  isBytecodeLoader,
} from './predicate-script-loader-instructions';

/**
 * @group node
 * @group browser
 */
describe('Predicate Script Loader Instructions', () => {
  const suffixBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
  const dataBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]);
  const configurableBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5]);
  const bytecode = concat([suffixBytes, dataBytes, configurableBytes]);

  it('gets the data offset', () => {
    const offset = getBytecodeDataOffset(bytecode);
    expect(offset).toBe(3);
  });

  it('gets the configurable offset', () => {
    const offset = getBytecodeConfigurableOffset(bytecode);
    expect(offset).toBe(5);
  });

  it('gets the bytecode id', () => {
    const id = getBytecodeId(bytecode);
    expect(id).toBe('0x8855508aade16ec573d21e6a485dfd0a7624085c1a14b5ecdd6485de0c6839a4');
  });

  it('gets the legacy blob id', () => {
    const id = getLegacyBlobId(bytecode);
    expect(id).toBe('0x709e80c88487a2411e1ee4dfb9f22a861492d20c4765150c0c794abd70f8147c');
  });

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
});
