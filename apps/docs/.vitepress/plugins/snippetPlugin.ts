import MarkdownIt from 'markdown-it';
import path from 'path';
import fs from 'fs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { RuleBlock } from 'markdown-it/lib/parser_block';

function dedent(text: string): string {
  const lines = text.split('\n');

  const minIndentLength = lines.reduce((acc, line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ' && line[i] !== '\t') return Math.min(i, acc);
    }
    return acc;
  }, Infinity);

  if (minIndentLength < Infinity) {
    return lines
      .map((x) => {
        if (/\/\/\s\#context\s/.test(x)) {
          x = x.replace(/\/\/\s\#context\s/, '');
        }

        return x.slice(minIndentLength);
      })
      .join('\n');
  }

  return text;
}

function testLine(line: string, regexp: RegExp, regionName: string, end: boolean = false) {
  const [full, tag, name] = regexp.exec(line.trim()) || [];

  return (
    full && tag && name === regionName && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
  );
}

export function extractImports(filepath: string, specifiedImports: string[]) {
  // Read file content
  const fileContent = fs.readFileSync(filepath, 'utf8');
  // Split content into lines
  const lines = fileContent.split(/\r?\n/);

  let importStatements: Record<string, Set<string>> = {};
  let allImportedItems = new Set();
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

    // Process the collected import line
    if (collecting && line.includes('} from')) {
      collecting = false;
      const matches = currentImport.match(/import.*\{([^\}]*)\}.*from\s+'([^']+)';/);

      if (matches && matches.length >= 3) {
        const importedItems = matches[1].split(',').map((item) => item.trim());
        const importSource = matches[2];

        // Add imported items to the allImportedItems set for later checking
        importedItems.forEach((item) => allImportedItems.add(item));

        // Filter out only the specified imports
        const filteredItems = importedItems.filter((item) => specifiedImports.includes(item));
        if (filteredItems.length > 0) {
          // Initialize set for the import source if not already done
          importStatements[importSource] = importStatements[importSource] || new Set();
          // Add filtered items to the set
          filteredItems.forEach((item) => importStatements[importSource].add(item));
        }
      }
      currentImport = '';
    }
  });

  // Check if all specified imports were found in the file
  const notFoundImports = specifiedImports.filter(
    (importItem) => !allImportedItems.has(importItem)
  );

  if (notFoundImports.length > 0) {
    throw new FuelError(
      ErrorCode.VITEPRESS_PLUGIN_ERROR,
      `The following imports were not found in the file: ${notFoundImports.join(', ')}`
    );
  }

  // Combine imports from the same source into single import statements
  let combinedImports: string[] = [];
  for (const source in importStatements) {
    combinedImports.push(
      `import { ${Array.from(importStatements[source]).join(', ')} } from '${source}';`
    );
  }

  // Return the combined import statements as a single string
  return combinedImports.join('\n');
}

export function findRegion(lines: string[], regionName: string) {
  // Regex to match region start/end comments
  const regionRegexp = /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/;
  // Regex to match import comments
  const importRegexp = /\/\/ #addImport: (.+)$/;

  // Track the start line of the region and imports
  let start = -1;
  let imports: string[] = [];

  // Iterate over each line
  for (const [lineId, line] of lines.entries()) {
    // Looking for the region start
    if (start === -1) {
      // Check if the current line marks the start of the region
      if (testLine(line, regionRegexp, regionName)) {
        start = lineId + 1; // Set start line (lineId is zero-based)
      }
    }
    // Once the start is found, look for the end of the region
    else {
      // Check if the current line marks the end of the region
      if (testLine(line, regionRegexp, regionName, true)) {
        return { start, end: lineId, regexp: regionRegexp, imports };
      }

      // Check for import statements to be included in the region
      const importMatch = line.match(importRegexp);
      if (importMatch) {
        imports = imports.concat(importMatch[1].split(',').map((s) => s.trim()));
      }
    }
  }

  // If no region is found, return null
  return null;
}

export const snippetPlugin = (md: MarkdownIt, srcDir: string) => {
  const parser: RuleBlock = (state, startLine, endLine, silent) => {
    const CH = '<'.charCodeAt(0);
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }

    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i);
      if (ch !== CH || pos + i >= max) return false;
    }

    if (silent) {
      return true;
    }

    try {
      // Extracting code details snippet from import signature at markdown file
      const start = pos + 3;
      const end = state.skipSpacesBack(max, pos);

      const rawPathRegexp =
        /^(.+(?:\.([a-z0-9]+)))(?:(#[\w-]+))?(?: ?(?:{(\d+(?:[,-]\d+)*)? ?(\S+)?}))? ?(?:\[(.+)\])?$/;

      const rawPath = state.src.slice(start, end).trim().replace(/^@/, srcDir).trim();

      const [
        snippetFilename = '',
        snippetExtension = '',
        snippetRegion = '',
        snippetLines = '',
        snippetLang = '',
        snippetRawTitle = '',
      ] = (rawPathRegexp.exec(rawPath) || []).slice(1);

      // Reading actuall code snippet from file
      const customSrc = path.resolve(snippetFilename) + snippetRegion;

      const [filepath, regionName] = customSrc.split('#');

      const isAFile = fs.existsSync(filepath) && fs.lstatSync(filepath).isFile();

      if (!isAFile) {
        throw new FuelError(ErrorCode.VITEPRESS_PLUGIN_ERROR, `File ${filepath} does not exist`);
      }

      let content = fs.readFileSync(filepath, 'utf8');

      const lines = content.split(/\r?\n/);
      const region = findRegion(lines, regionName);

      if (!region) {
        throw new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `Region ${regionName} does not exist in file ${filepath}`
        );
      }

      let importStatements = '';
      if (region.imports.length > 0) {
        importStatements = extractImports(filepath, region.imports.flat());
      }

      content =
        ''.concat(importStatements.length ? importStatements + '\n' : '') +
        dedent(
          lines
            .slice(region.start, region.end)
            .filter((line: string) => !region.regexp.test(line.trim()))
            .map((line) => (line.includes('// #addImport:') ? '' : line))
            .join('\n')
        );

      const match = filepath.match(/(packages|apps)\/(.*)/);
      const partialPath = match?.[0];

      if (!partialPath) {
        throw new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `Failed to resolve the code snippet path at ${filepath}.`
        );
      }

      const url = 'https://github.com/FuelLabs/fuels-ts/blob/master/'
        .concat(`${partialPath}`)
        .concat(`#L${region.start}-L${++region.end}`);

      // Creating markdown token with code snippet content and adding to state
      const title = snippetRawTitle || snippetFilename.split('/').pop() || '';

      state.line = startLine + 1;

      const token = state.push('fence', 'code', 0);

      Object.assign(token, {
        url, // Adding url to github file with code snippet
        content,
        customSrc: path.resolve(snippetFilename) + snippetRegion,
        markup: '```',
        map: [startLine, startLine + 1],
        info: `${snippetLang || snippetExtension}${snippetLines ? `{${snippetLines}}` : ''}${
          title ? `[${title}]` : ''
        }`,
      });
    } catch (e) {
      throw new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `Error while parsing snippet: ${e.message}`
      );
    }

    return true;
  };

  md.block.ruler.before('fence', 'customSnippet', parser);
};
