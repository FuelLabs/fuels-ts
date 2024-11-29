import { FuelError, ErrorCode } from '@fuel-ts/errors';
import fs from 'fs';
import { IMPORT_REGEXP, IMPORT_START_REGEXP } from '../snippetPlugin';

/**
 * Constant used to prefix type imports.
 */
const TYPE_IMPORT_PREFIX = 'type::';

/**
 * Combines import statements into a single string.
 *
 * @param importStatements - The import statements to combine.
 * @returns The combined import statements as a string.
 */
export const combineImportStatements = (importStatements: Record<string, Set<string>>) => {
  return Object.keys(importStatements)
    .map(
      // Transforming collected imports into import statements
      (source) => {
        const importItems = Array.from(importStatements[source]).join(', ');
        const isTypeImport = source.startsWith(TYPE_IMPORT_PREFIX);
        const importType = isTypeImport ? 'type ' : '';

        return `import ${importType}{ ${importItems} } from '${source.replace(TYPE_IMPORT_PREFIX, '')}';`;
      }
    )
    .join('\n');
};

/**
 * Validates the imports in a code snippet.
 *
 * @param specifiedImports - The specified imports to validate.
 * @param ignoredImports - The set of ignored imports.
 * @param allImportedItems - The set of all imported items in the file.
 * @param snippetContent - The content of the code snippet.
 * @throws {FuelError} - If there are imports not found in the file or if a specified import is not used in the code snippet.
 */
export const validateImports = (
  specifiedImports: string[],
  allImportedItems: Set<string>,
  snippetContent: string[]
) => {
  // Filter specified imports that are not found in the file
  const notFoundImports = specifiedImports.filter(
    (importItem) => !allImportedItems.has(importItem)
  );

  if (notFoundImports.length > 0) {
    // Throw an error if there are imports not found in the file
    throw new FuelError(
      ErrorCode.VITEPRESS_PLUGIN_ERROR,
      `The following imports were not found in the file: ${notFoundImports.join(', ')}`
    );
  }

  // Filter out lines with "#import" and join the remaining lines
  const validatedContent = snippetContent.filter((line) => !IMPORT_REGEXP.test(line)).join('\n');

  for (const importItem of specifiedImports) {
    if (!validatedContent.includes(importItem)) {
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));

      // Throw an error if a specified import is not used in the code snippet
      throw new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `The specified import '${importItem}' is not in use within the code snippet: ${formattedSnippet}`
      );
    }
  }
};

/**
 * Validates that the snippet content contains valid import statements.
 * 
 * @param snippetContent - the snippet content to validate
 * @param filepath - file path of the snippet

 * @throws {FuelError} - If there are malformed "#import" statements in the code snippet.
 * ```ts
 * // Valid
 * // #import { AssetId };
 * 
 * // Not valid
 * // Missing semicolon: "#import { AssetId }"
 * // Plain wrong: "#import "
 * ```
 */
export const validateSnippetContent = (snippetContent: string[], filepath: string) => {
  const allImportStatements = snippetContent.filter((line) => IMPORT_START_REGEXP.test(line));
  const validImportStatements = snippetContent.filter((line) => IMPORT_REGEXP.test(line));

  // Validates that all the import statements have been picked up
  if (allImportStatements.length !== validImportStatements.length) {
    const invalidLines = allImportStatements
      .filter((line) => !validImportStatements.includes(line))
      .map((line) => line.trim())
      .join('\n');
    throw new FuelError(
      ErrorCode.VITEPRESS_PLUGIN_ERROR,
      `Found malformed "#import" statements in code snippet.\nCorrect format: "// #import { ExampleImport };"\n\nPlease check "${filepath}".\n\n${invalidLines}`
    );
  }
};

/**
 * Collects import statements from the given lines of code and extracts the imported items and their sources.
 *
 * @param lines - The lines of code to collect import statements from.
 * @param ignoredImports - The set of ignored import items.
 * @returns An object containing the import statements grouped by their sources and a set of all imported items.
 */
export const collectImportStatements = (lines: string[], specifiedImports: string[]) => {
  let importStatements: Record<string, Set<string>> = {};
  let allImportedItems: Set<string> = new Set();
  let currentImport = '';
  let collecting = false;

  lines.forEach((line) => {
    /**
     * This is required because file imports can span multiple lines e.g.
     * import {
     *  Provider,
     *  Wallet,
     * } from 'fuels';
     */
    if (line.trim().startsWith('import')) {
      collecting = true;
      currentImport = line;
    }
    // Continue collecting import line if it spans multiple lines
    else if (collecting && line.trim()) {
      currentImport += ' ' + line.trim();
    }

    /**
     * Since the 'from' keyword is always on the same line where the import statement ends
     * we can stop collecting
     */
    if (collecting && line.includes('from')) {
      collecting = false;

      const matches = currentImport.match(
        /import\s+(type\s+)?(\{.*?\}|[\w-]+)\s+from\s+(['"].+['"]);/
      );
      /**
       * This regex breaks down the import statement in the following way:
       *
       * currentImport: "import { Provider, Wallet } from 'fuels'"";

       * [
       *   "import { Provider, Wallet } from 'fuels';",
       *   undefined,
       *   '{ Provider, Wallet }',
       *   "'fuels'",
       *   index: 0,
       *   input: "import { Provider, Wallet } from 'fuels';",
       *   groups: undefined
       * ]
       */

      if (matches && matches.length >= 1) {
        // Is the current import a type import?
        const isTypeImport = matches[1]?.trim() === 'type';

        // importedItems: ['Provider', 'Wallet']
        const importedItems = matches[2].replace(/[\{\}\s]/g, '').split(/\,/);

        // importSource: 'fuels'
        const [, importSource] = matches[3].split("'");

        // source: 'type::fuels' or 'fuels'
        const source = isTypeImport ? `${TYPE_IMPORT_PREFIX}${importSource}` : importSource;

        // Add collected imports 'allImportedItems' only if they were specified
        importedItems.forEach((item) => {
          if (specifiedImports.includes(item)) {
            allImportedItems.add(item);

            if (!importStatements[source]) {
              importStatements[source] = new Set();
            }

            importStatements[source].add(item);
          }
        });
      }

      currentImport = '';
    }
  });

  return { importStatements, allImportedItems };
};

/**
 * Extracts import statements from a file and combines them into a single string.
 * @param filepath - The path of the file to extract imports from.
 * @param specifiedImports - An array of specified imports to validate against.
 * @param snippetContent - An array of snippet content to validate against.
 * @returns A string containing the combined import statements.
 */
export const extractImports = (
  filepath: string,
  specifiedImports: string[],
  snippetContent: string[]
) => {
  // Read file content
  const fileContent = fs.readFileSync(filepath, 'utf8');

  // Split content into lines
  const lines = fileContent.split(/\r?\n/);

  const { importStatements, allImportedItems } = collectImportStatements(lines, specifiedImports);

  validateImports(specifiedImports, allImportedItems, snippetContent);

  return combineImportStatements(importStatements);
};
