import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { extractImports, findRegion } from './snippetPlugin';
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
      const result = extractImports('mockedPath', ['A', 'B'], ['const a: A = 1', 'const b: B = 1']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });

    it('should handles multi-line imports correctly', () => {
      mockReadFileSync(`import {\n  A,\n  B,\n  C,\n} from 'module';`);
      const result = extractImports('mockedPath', ['A', 'C'], ['const a: A = 1', 'const c: C = 1']);
      expect(result).toBe(`import { A, C } from 'module';`);
    });

    it('should combines imports from the same source', () => {
      mockReadFileSync(`import { A } from 'module';\nimport { B } from 'module';`);
      const result = extractImports('mockedPath', ['A', 'B'], ['const a: A = 1', 'const b: B = 1']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });
    it('should combines different types of imports from the same source', () => {
      mockReadFileSync(`import { A } from 'module';\nimport type { B } from 'module';`);
      const result = extractImports('mockedPath', ['A', 'B'], ['const a: A = 1', 'const b: B = 1']);
      expect(result).toBe(`import { A, B } from 'module';`);
    });

    it('should excludes unspecified imports', () => {
      mockReadFileSync(`import { A, B, C } from 'module';`);
      const result = extractImports('mockedPath', ['A'], ['const a: A = 1']);
      expect(result).toBe(`import { A } from 'module';`);
    });

    it('should handles imports from different sources', () => {
      mockReadFileSync(`import { A, B } from 'module1';\nimport { C } from 'module2';`);
      const result = extractImports('mockedPath', ['A', 'C'], ['const a: A = 1', 'const c: C = 1']);
      expect(result).toBe(`import { A } from 'module1';\nimport { C } from 'module2';`);
    });

    it('should throw an error when imports are not found in the file', async () => {
      mockReadFileSync(`import { A, B } from 'module1';\nimport { C } from 'module2';`);

      await expectToThrowFuelError(
        () =>
          extractImports(
            'mockedPath',
            ['A', 'Y', 'Z'],
            ['const a: A = 1', 'const y: Y = 1', 'const z: Z = 1']
          ),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: Y, Z`
        )
      );
    });

    it('should throw error when adding imports that are not in use', async () => {
      mockReadFileSync(`import { A, B } from 'module1';\nimport { C } from 'module2';`);
      const snippetContent = ['const b: B = 1', 'const c: C = 1'];
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));
      const error = new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `The specified import 'A' is not in use within the code snippet: ${formattedSnippet}`
      );
      await expectToThrowFuelError(
        () => extractImports('mockedPath', ['A', 'B'], ['const b: B = 1', 'const c: C = 1']),
        error
      );
    });
  });

  describe('findRegion', () => {
    it('should finds a region with no imports', () => {
      const lines = ['// #region testRegion', 'const a = 1;', '// #endregion testRegion'];
      const result = findRegion(lines, 'testRegion');
      expect(result).toEqual({
        start: 1,
        end: 2,
        regexp: /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/,
        imports: [],
      });
    });

    it('should finds a region with imports', () => {
      const lines = [
        '// #region testRegion',
        '// #addImport: A, B',
        'const a = 1;',
        '// #endregion testRegion',
      ];
      const result = findRegion(lines, 'testRegion');
      expect(result).toEqual({
        start: 1,
        end: 3,
        regexp: /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/,
        imports: ['A', 'B'],
      });
    });

    it('should returns null for non-existent region', () => {
      const lines = ['const a = 1;'];
      const result = findRegion(lines, 'testRegion');
      expect(result).toBeNull();
    });

    it('should handles multiple addImport flags', () => {
      const lines = [
        '// #region testRegion',
        '// #addImport: A',
        '// #addImport: B',
        'const a = 1;',
        '// #endregion testRegion',
      ];
      const result = findRegion(lines, 'testRegion');
      expect(result).toEqual({
        start: 1,
        end: 4,
        regexp: /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/,
        imports: ['A', 'B'],
      });
    });
  });
});
