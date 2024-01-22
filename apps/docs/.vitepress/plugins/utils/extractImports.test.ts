import { ErrorCode, FuelError } from '@fuel-ts/errors';

import * as extractImportsMod from './extractImports';
import fs from 'fs';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

const {
  collectImportStatements,
  combineImportStatements,
  parseIgnoreImportFlags,
  validateImports,
  extractImports,
} = extractImportsMod;

describe('extractImports', () => {
  describe('parseIgnoreImportFlags', () => {
    it('should return an empty set for no ignore flags', () => {
      const lines = ['import { something } from "somewhere";', 'const x = 5;'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set());
    });

    it('should correctly parse a single ignore flag', () => {
      const lines = ['// #ignore { testImport }'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set(['testImport']));
    });

    it('should correctly parse multiple ignore flags on separate lines', () => {
      const lines = ['// #ignore { firstImport }', '// #ignore { secondImport }'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set(['firstImport', 'secondImport']));
    });

    it('should correctly parse multiple imports on a single ignore flag', () => {
      const lines = ['// #ignore { firstImport , secondImport }'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set(['firstImport', 'secondImport']));
    });

    it('should ignore malformed ignore flags', () => {
      const lines = ['// ignore: { testImport }', '// #ignore testImport'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set());
    });

    it('should handle empty lines and whitespace', () => {
      const lines = ['   ', '', '// #ignore { testImport }'];
      expect(parseIgnoreImportFlags(lines)).toEqual(new Set(['testImport']));
    });
  });

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
  });

  describe('validateImports', () => {
    const allImportedItems = new Set(['usedImport', 'unusedImport']);
    const snippetContent = ['import { usedImport } from "somewhere";'];

    it('should not throw an error for valid imports', () => {
      expect(() => {
        validateImports(['usedImport'], new Set(), allImportedItems, [
          'import { usedImport } from "somewhere";',
        ]);
      }).not.toThrow();
    });

    it('should throw an error if a specified import is not found', async () => {
      await expectToThrowFuelError(
        () => validateImports(['notFoundImport'], new Set(), allImportedItems, snippetContent),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: notFoundImport`
        )
      );
    });

    it('should not throw an error for ignored imports', () => {
      expect(() => {
        validateImports(['ignoredImport'], new Set(['ignoredImport']), allImportedItems, [
          '// #ignore { ignoredImport }',
        ]);
      }).not.toThrow();
    });

    it('should throw an error if a specified import is not used in the snippet', async () => {
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));
      await expectToThrowFuelError(
        () => validateImports(['unusedImport'], new Set(), allImportedItems, snippetContent),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The specified import 'unusedImport' is not in use within the code snippet: ${formattedSnippet}`
        )
      );
    });

    it('should handle multiple error scenarios', async () => {
      await expectToThrowFuelError(
        () =>
          validateImports(
            ['notFoundImport', 'unusedImport'],
            new Set(),
            allImportedItems,
            snippetContent
          ),
        new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `The following imports were not found in the file: notFoundImport`
        )
      );
    });
  });

  describe('collectImportStatements', () => {
    it('should handle empty lines', () => {
      const lines: string[] = [];
      const specifiedImports: string[] = [];
      const ignoredImports = new Set<string>();
      expect(collectImportStatements(lines, specifiedImports, ignoredImports)).toEqual({
        importStatements: {},
        allImportedItems: new Set(),
      });
    });

    it('should correctly collect single line import statements', () => {
      const lines = ["import { A } from 'example';"];
      const specifiedImports: string[] = ['A'];
      const ignoredImports = new Set<string>();
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toStrictEqual(new Set(['A']));
      expect(result.importStatements).toStrictEqual({ example: new Set(['A']) });
    });

    it('should correctly handle multi-line import statements', () => {
      const lines = ['import {', '  example1,', '  example2', "} from 'example';"];
      const specifiedImports: string[] = ['example1', 'example2'];
      const ignoredImports = new Set<string>();
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toEqual(new Set(['example1', 'example2']));
      expect(result.importStatements).toEqual({ example: new Set(['example1', 'example2']) });
    });

    it('should ignore specified imports', () => {
      const lines = ["import { example1, example2 } from 'example';"];
      const specifiedImports: string[] = ['example1', 'example2'];
      const ignoredImports = new Set(['example2']);
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toEqual(new Set(['example1']));
      expect(result.importStatements).toEqual({ example: new Set(['example1']) });
    });

    it('should correctly process multiple import statements', () => {
      const lines = [
        "import { example1 } from 'example1';",
        "import { example2, example3 } from 'example2';",
      ];
      const specifiedImports: string[] = ['example1', 'example2', 'example3'];
      const ignoredImports = new Set<string>();
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toEqual(new Set(['example1', 'example2', 'example3']));
      expect(result.importStatements).toEqual({
        example1: new Set(['example1']),
        example2: new Set(['example2', 'example3']),
      });
    });

    it('should handle import statements with the same source', () => {
      const lines = ["import { example1 } from 'example';", "import { example2 } from 'example';"];
      const specifiedImports: string[] = ['example1', 'example2'];
      const ignoredImports = new Set<string>();
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toEqual(new Set(['example1', 'example2']));
      expect(result.importStatements).toEqual({ example: new Set(['example1', 'example2']) });
    });

    it('should ignore invalid format import statements', () => {
      const lines = ["import example from 'example';"];
      const specifiedImports: string[] = ['example'];
      const ignoredImports = new Set<string>();
      const result = collectImportStatements(lines, specifiedImports, ignoredImports);
      expect(result.allImportedItems).toEqual(new Set());
      expect(result.importStatements).toEqual({});
    });
  });

  describe('extractImports', () => {
    afterEach(jest.restoreAllMocks);

    it('should ensure imports are extracted just fine (IMPORT FLAG W SEMICOLON)', () => {
      const filepath = 'mockedPath';
      const specifiedImports = ['AssetId'];
      const snippetContent = [
        '    // #import { AssetId };',
        '',
        '    const assetId: AssetId = {',
        '      value: Bits256,',
        '    };',
      ];

      const mockedFileContent = `
        import { Address } from 'fuels';
        import type { AssetId, Contract, B256Address } from 'fuels';

        import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
        import { createAndDeployContractFromProject } from '../../utils';

        describe('AssetId', () => {
      `;

      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedFileContent);

      const collectImportStatementsSpy = jest.spyOn(extractImportsMod, 'collectImportStatements');
      const combineImportStatementsSpy = jest.spyOn(extractImportsMod, 'combineImportStatements');
      const parseIgnoreImportFlagsSpy = jest.spyOn(extractImportsMod, 'parseIgnoreImportFlags');
      const validateImportsSpy = jest.spyOn(extractImportsMod, 'validateImports');

      const result = extractImports(filepath, specifiedImports, snippetContent);

      expect(collectImportStatementsSpy).toBeCalledTimes(1);
      expect(combineImportStatementsSpy).toBeCalledTimes(1);
      expect(parseIgnoreImportFlagsSpy).toBeCalledTimes(1);
      expect(validateImportsSpy).toBeCalledTimes(1);

      expect(result).toEqual("import { AssetId } from 'fuels';");
    });

    it('should ensure imports are extracted just fine (IMPORT FLAG W/O SEMICOLON)', () => {
      const filepath = 'mockedPath';
      const specifiedImports = ['Wallet'];
      const snippetContent = [
        '    // #import { Wallet }',
        '',
        '    const wallet = Wallet.generate(provider);',
      ];

      const mockedFileContent = `
        import { Address, Wallet } from 'fuels';
        '',
        describe('Wallet', () => {
      `;

      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedFileContent);

      const collectImportStatementsSpy = jest.spyOn(extractImportsMod, 'collectImportStatements');
      const combineImportStatementsSpy = jest.spyOn(extractImportsMod, 'combineImportStatements');
      const parseIgnoreImportFlagsSpy = jest.spyOn(extractImportsMod, 'parseIgnoreImportFlags');
      const validateImportsSpy = jest.spyOn(extractImportsMod, 'validateImports');

      const result = extractImports(filepath, specifiedImports, snippetContent);

      expect(collectImportStatementsSpy).toBeCalledTimes(1);
      expect(combineImportStatementsSpy).toBeCalledTimes(1);
      expect(parseIgnoreImportFlagsSpy).toBeCalledTimes(1);
      expect(validateImportsSpy).toBeCalledTimes(1);

      expect(result).toEqual("import { Wallet } from 'fuels';");
    });
  });
});
