import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { extractImports } from './snippetPlugin';
import fs from 'fs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

describe('snippetPlugin', () => {
  describe('extractImports', () => {
    beforeEach(jest.restoreAllMocks);

    const mockReadFileSync = (returnValue: string) => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue(returnValue);
    };

    it('should handles single-line imports correctly', () => {
      mockReadFileSync(`import { A, B, C } from 'module';`);
      const result = extractImports('mockedPath', ['A', 'B']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });

    it('should handles multi-line imports correctly', () => {
      mockReadFileSync(`import {\n  A,\n  B,\n  C,\n} from 'module';`);
      const result = extractImports('mockedPath', ['A', 'C']);
      expect(result).toBe(`import { A, C } from 'module';`);
    });

    it('should combines imports from the same source', () => {
      mockReadFileSync(`import { A } from 'module';\nimport { B } from 'module';`);
      const result = extractImports('mockedPath', ['A', 'B']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });
    it('should combines different types of imports from the same source', () => {
      mockReadFileSync(`import { A } from 'module';\nimport type { B } from 'module';`);
      const result = extractImports('mockedPath', ['A', 'B']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });

    it('should excludes unspecified imports', () => {
      mockReadFileSync(`import { A, B, C } from 'module';`);
      const result = extractImports('mockedPath', ['A']);
      expect(result).toBe(`import { A } from 'module';`);
    });

    it('should handles imports from different sources', () => {
      mockReadFileSync(`import { A, B } from 'module1';\nimport { C } from 'module2';`);
      const result = extractImports('mockedPath', ['A', 'C']);
      expect(result).toBe(`import { A } from 'module1';\nimport { C } from 'module2';`);
    });
    it('should throw an error when imports are not found in the file', async () => {
      mockReadFileSync(`import { A, B } from 'module1';\nimport { C } from 'module2';`);

      await expectToThrowFuelError(
        () => extractImports('mockedPath', ['A', 'Y', 'Z']),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: Y, Z`
        )
      );
    });
  });
});
