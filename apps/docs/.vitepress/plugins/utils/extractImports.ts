import { FuelError, ErrorCode } from '@fuel-ts/errors';
import fs from 'fs';

function parseIgnoreImportFlags(lines: string[]): Set<string> {
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

function combineImportStatements(importStatements: Record<string, Set<string>>) {
  return Object.keys(importStatements)
    .map(
      (source) => `import { ${Array.from(importStatements[source]).join(', ')} } from '${source}';`
    )
    .join('\n');
}

function validateImports(
  specifiedImports: string[],
  ignoredImports: Set<string>,
  allImportedItems: Set<string>,
  snippetContent: string[]
) {
  const notFoundImports = specifiedImports.filter(
    (importItem) => !allImportedItems.has(importItem) && !ignoredImports.has(importItem)
  );

  if (notFoundImports.length > 0) {
    throw new FuelError(
      ErrorCode.VITEPRESS_PLUGIN_ERROR,
      `The following imports were not found in the file: ${notFoundImports.join(', ')}`
    );
  }

  const validatedContent = snippetContent
    .filter((line) => !/(#addImport:)|(#ignoreImport:)/.test(line))
    .join('\n');

  for (const importItem of specifiedImports) {
    if (!validatedContent.includes(importItem) && !ignoredImports.has(importItem)) {
      const formattedSnippet = '\n'.concat(snippetContent.map((line) => `${line}`).join('\n'));

      throw new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `The specified import '${importItem}' is not in use within the code snippet: ${formattedSnippet}`
      );
    }
  }
}

function collectImportStatements(lines: string[], ignoredImports: Set<string>) {
  let importStatements: Record<string, Set<string>> = {};
  let allImportedItems: Set<string> = new Set();
  let currentImport = '';
  let collecting = false;

  lines.forEach((line) => {
    // Start collecting import line
    if (line.trim().startsWith('import')) {
      collecting = true;

      currentImport = line;
    } else if (collecting && line.trim()) {
      // Continue collecting import line if it spans multiple lines
      currentImport += ' ' + line.trim();
    }

    // Process the collected import line
    if (collecting && line.includes('} from')) {
      collecting = false;
      const matches = currentImport.match(/import.*\{([^\}]*)\}.*from\s+'([^']+)';/);

      if (matches && matches.length >= 3) {
        const importedItems = matches[1].split(',').map((item) => item.trim());
        const importSource = matches[2];

        importedItems.forEach((item) => {
          if (!ignoredImports.has(item)) {
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
  const { importStatements, allImportedItems } = collectImportStatements(lines, ignoredImports);

  validateImports(specifiedImports, ignoredImports, allImportedItems, snippetContent);

  return combineImportStatements(importStatements);
}
