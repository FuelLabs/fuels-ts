import { FuelError, ErrorCode } from '@fuel-ts/errors';
import fs from 'fs';

/**
 * Parses the given lines of code and extracts the imports to be ignored based on the ignore import flag.
 * @param lines - The lines of code to parse.
 * @returns A set of imports to be ignored.
 */
export function parseIgnoreImportFlags(lines: string[]): Set<string> {
  const ignoredImports = new Set<string>();

  lines.forEach((line) => {
    // Parse and process ignore import flag
    if (line.trim().startsWith('// #ignoreImport')) {
      const ignoreMatches = line.match(/\/\/ #ignoreImport: (.+)/);

      if (ignoreMatches && ignoreMatches[1]) {
        const importsToIgnore = ignoreMatches[1].split(',').map((item) => item.trim());

        importsToIgnore.forEach((item) => ignoredImports.add(item));
      }
    }
  });

  return ignoredImports;
}

/**
 * Combines import statements into a single string.
 *
 * @param importStatements - The import statements to combine.
 * @returns The combined import statements as a string.
 */
export function combineImportStatements(importStatements: Record<string, Set<string>>) {
  return Object.keys(importStatements)
    .map(
      (source) => `import { ${Array.from(importStatements[source]).join(', ')} } from '${source}';`
    )
    .join('\n');
}

/**
 * Validates the imports in a code snippet.
 *
 * @param specifiedImports - The specified imports to validate.
 * @param ignoredImports - The set of ignored imports.
 * @param allImportedItems - The set of all imported items in the file.
 * @param snippetContent - The content of the code snippet.
 * @throws {FuelError} - If there are imports not found in the file or if a specified import is not used in the code snippet.
 */
export function validateImports(
  specifiedImports: string[],
  ignoredImports: Set<string>,
  allImportedItems: Set<string>,
  snippetContent: string[]
) {
  // Filter specified imports that are not found in the file or ignored
  const notFoundImports = specifiedImports.filter(
    (importItem) => !allImportedItems.has(importItem) && !ignoredImports.has(importItem)
  );

  if (notFoundImports.length > 0) {
    // Throw an error if there are imports not found in the file
    throw new FuelError(
      ErrorCode.VITEPRESS_PLUGIN_ERROR,
      `The following imports were not found in the file: ${notFoundImports.join(', ')}`
    );
  }

  // Filter out lines with "#addImport:" or "#ignoreImport:" and join the remaining lines
  const validatedContent = snippetContent
    .filter((line) => !/(#addImport:)|(#ignoreImport:)/.test(line))
    .join('\n');

  for (const importItem of specifiedImports) {
    if (!validatedContent.includes(importItem) && !ignoredImports.has(importItem)) {
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));

      // Throw an error if a specified import is not used in the code snippet
      throw new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `The specified import '${importItem}' is not in use within the code snippet: ${formattedSnippet}`
      );
    }
  }
}

/**
 * Collects import statements from the given lines of code and extracts the imported items and their sources.
 *
 * @param lines - The lines of code to collect import statements from.
 * @param ignoredImports - The set of ignored import items.
 * @returns An object containing the import statements grouped by their sources and a set of all imported items.
 */
export function collectImportStatements(
  lines: string[],
  specifiedImports: string[],
  ignoredImports: Set<string>
) {
  let importStatements: Record<string, Set<string>> = {};
  let allImportedItems: Set<string> = new Set();
  let currentImport = '';
  let collecting = false;

  lines.forEach((line) => {
    // Start collecting import line
    if (line.trim().startsWith('import')) {
      collecting = true;
      currentImport = line;
    }
    // Continue collecting import line if it spans multiple lines
    else if (collecting && line.trim()) {
      currentImport += ' ' + line.trim();
    }

    if (collecting && line.includes('} from')) {
      collecting = false;
      const matches = currentImport.match(/import.*\{([^\}]*)\}.*from\s+'([^']+)';/);

      if (matches && matches.length >= 3) {
        const importedItems = matches[1].split(',').map((item) => item.trim());
        const importSource = matches[2];

        importedItems.forEach((item) => {
          if (!ignoredImports.has(item) && specifiedImports.includes(item)) {
            allImportedItems.add(item);

            if (!importStatements[importSource]) {
              importStatements[importSource] = new Set();
            }

            importStatements[importSource].add(item);
          }
        });
      }

      currentImport = '';
    }
  });

  return { importStatements, allImportedItems };
}

/**
 * Extracts import statements from a file and combines them into a single string.
 * @param filepath - The path of the file to extract imports from.
 * @param specifiedImports - An array of specified imports to validate against.
 * @param snippetContent - An array of snippet content to validate against.
 * @returns A string containing the combined import statements.
 */
export function extractImports(
  filepath: string,
  specifiedImports: string[],
  snippetContent: string[]
) {
  // Read file content
  const fileContent = fs.readFileSync(filepath, 'utf8');

  // Split content into lines
  const lines = fileContent.split(/\r?\n/);

  const ignoredImports = parseIgnoreImportFlags(lines);
  const { importStatements, allImportedItems } = collectImportStatements(
    lines,
    specifiedImports,
    ignoredImports
  );

  validateImports(specifiedImports, ignoredImports, allImportedItems, snippetContent);

  return combineImportStatements(importStatements);
}
