import { ErrorCode, FuelError } from '@fuel-ts/errors';
import * as extractImportsMod from './extractImports';
import fs from 'fs';
import { expectToThrowFuelError } from 'fuels/test-utils';

const {
  collectImportStatements,
  combineImportStatements,
  validateImports,
  extractImports,
  validateSnippetContent,
} = extractImportsMod;

/**
 * @group node
 */
describe('extractImports', () => {
  describe('combineImportStatements', () => {
    it('should return an empty string for empty import statements', () => {
      const importStatements = {};
      expect(combineImportStatements(importStatements)).toBe('');
    });

    it('should correctly combine a single import statement', () => {
      const importStatements = {
        somewhere: new Set(['testImport']),
      };
      const expected = `import { testImport } from 'somewhere';`;
      expect(combineImportStatements(importStatements)).toBe(expected);
    });

    it('should correctly combine multiple import statements', () => {
      const importStatements = {
        somewhere: new Set(['testImport']),
        anotherplace: new Set(['anotherImport']),
      };
      const expected = `import { testImport } from 'somewhere';\nimport { anotherImport } from 'anotherplace';`;
      expect(combineImportStatements(importStatements)).toBe(expected);
    });

    it('should maintain the order of imports', () => {
      const importStatements = {
        somewhere: new Set(['firstImport', 'secondImport']),
      };
      const expected = `import { firstImport, secondImport } from 'somewhere';`;
      expect(combineImportStatements(importStatements)).toBe(expected);
    });

    it('should import types correctly', () => {
      const expected = `import { implementationImport } from 'somewhere';\nimport type { typeImport } from 'somewhere';`;
      const importStatements = {
        somewhere: new Set(['implementationImport']),
        'type::somewhere': new Set(['typeImport']),
      };

      const actual = combineImportStatements(importStatements);
      expect(actual).toBe(expected);
    });
  });

  describe('validateImports', () => {
    const allImportedItems = new Set(['usedImport', 'unusedImport']);
    const snippetContent = ['import { usedImport } from "somewhere";'];

    it('should not throw an error for valid imports', () => {
      expect(() => {
        validateImports(['usedImport'], allImportedItems, [
          'import { usedImport } from "somewhere";',
        ]);
      }).not.toThrow();
    });

    it('should throw an error if a specified import is not found', async () => {
      await expectToThrowFuelError(
        () => validateImports(['notFoundImport'], allImportedItems, snippetContent),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: notFoundImport`
        )
      );
    });

    it('should throw an error if a specified import is not used in the snippet', async () => {
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));
      await expectToThrowFuelError(
        () => validateImports(['unusedImport'], allImportedItems, snippetContent),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The specified import 'unusedImport' is not in use within the code snippet: ${formattedSnippet}`
        )
      );
    });

    it('should handle multiple error scenarios', async () => {
      await expectToThrowFuelError(
        () => validateImports(['notFoundImport', 'unusedImport'], allImportedItems, snippetContent),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: notFoundImport`
        )
      );
    });
  });

  describe('validateSnippetContent', () => {
    it('should pass validation for a valid code snippet content', () => {
      const codeSnippet = [
        '// #import { AssetId };',
        '',
        'const assetId: AssetId = {',
        '  value: Bits256,',
        '};',
      ];
      const filepath = '/some/file/asset-id.test.ts';
      expect(() => validateSnippetContent(codeSnippet, filepath)).not.toThrow();
    });

    it('should throw an error when malformed #imports detected', async () => {
      const codeSnippet = ['// #import { AssetId }'];
      const filepath = '/some/file/asset-id.test.ts';

      await expectToThrowFuelError(
        () => validateSnippetContent(codeSnippet, filepath),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `Found malformed "#import" statements in code snippet.\nCorrect format: "// #import { ExampleImport };"\n\nPlease check "${filepath}".\n\n// #import { AssetId }`
        )
      );
    });
  });

  describe('collectImportStatements', () => {
    it('should handle empty lines', () => {
      const lines: string[] = [];
      const specifiedImports: string[] = [];
      expect(collectImportStatements(lines, specifiedImports)).toEqual({
        importStatements: {},
        allImportedItems: new Set(),
      });
    });

    it('should correctly collect single line import statements', () => {
      const lines = ["import { A } from 'example';"];
      const specifiedImports: string[] = ['A'];
      const result = collectImportStatements(lines, specifiedImports);
      expect(result.allImportedItems).toStrictEqual(new Set(['A']));
      expect(result.importStatements).toStrictEqual({ example: new Set(['A']) });
    });

    it('should correctly handle multi-line import statements', () => {
      const lines = ['import {', '  A,', '  B', "} from 'example';"];
      const specifiedImports: string[] = ['A', 'B'];
      const result = collectImportStatements(lines, specifiedImports);
      expect(result.allImportedItems).toEqual(new Set(['A', 'B']));
      expect(result.importStatements).toEqual({ example: new Set(['A', 'B']) });
    });

    it('should correctly process multiple import statements', () => {
      const lines = ["import { A } from 'example1';", "import { B, C } from 'example2';"];
      const specifiedImports: string[] = ['A', 'B', 'C'];
      const result = collectImportStatements(lines, specifiedImports);
      expect(result.allImportedItems).toEqual(new Set(['A', 'B', 'C']));
      expect(result.importStatements).toEqual({
        example1: new Set(['A']),
        example2: new Set(['B', 'C']),
      });
    });

    it('should handle import statements with the same source', () => {
      const lines = ["import { A } from 'example';", "import { B } from 'example';"];
      const specifiedImports: string[] = ['A', 'B'];
      const result = collectImportStatements(lines, specifiedImports);
      expect(result.allImportedItems).toEqual(new Set(['A', 'B']));
      expect(result.importStatements).toEqual({ example: new Set(['A', 'B']) });
    });

    it('should handle import statements with default import format', () => {
      const lines = ["import example from 'example';"];
      const specifiedImports: string[] = ['example'];
      const result = collectImportStatements(lines, specifiedImports);
      expect(result.allImportedItems).toEqual(new Set(['example']));
      expect(result.importStatements).toEqual({
        example: new Set(['example']),
      });
    });
  });

  describe('extractImports', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should ensure imports are extracted just fine', () => {
      const filepath = 'mockedPath';
      const specifiedImports = ['AssetId', 'Address'];
      const snippetContent = [
        '    // #import { AssetId, Address };',
        '',
        '    const assetId: AssetId = {',
        '      value: Bits256,',
        '    };',
        '    const address: Address = new Address();',
      ];

      const mockedFileContent = `
        import { Address } from 'fuels';
        import type { AssetId, Contract, B256Address } from 'fuels';

        import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';

        describe('AssetId', () => {
      `;

      const readFileSync = vi.spyOn(fs, 'readFileSync').mockReturnValue(mockedFileContent);

      const result = extractImports(filepath, specifiedImports, snippetContent);

      expect(readFileSync).toBeCalledTimes(1);

      expect(result).toEqual(
        "import { Address } from 'fuels';\nimport type { AssetId } from 'fuels';"
      );
    });
  });
});
