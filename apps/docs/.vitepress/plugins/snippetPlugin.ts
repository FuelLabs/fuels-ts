import MarkdownIt from 'markdown-it';
import path from 'path';
import fs from 'fs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { extractImports, validateSnippetContent } from './utils/extractImports';

// Regex to match import comments
export const IMPORT_REGEXP = /\/\/ #import \{(.+)\};$/;
export const IMPORT_START_REGEXP = /\/\/ #import/;

// Regex to match region start/end comments
export const REGION_REGEXP = /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/;

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

export function findRegion(lines: string[], regionName: string) {
  // Track the start line of the region and imports
  let start = -1;
  let imports: string[] = [];

  // Iterate over each line
  for (const [lineId, line] of lines.entries()) {
    // Looking for the region start
    if (start === -1) {
      // Check if the current line marks the start of the region
      if (testLine(line, REGION_REGEXP, regionName)) {
        start = lineId + 1; // Set start line (lineId is zero-based)
      }
    }
    // Once the start is found, look for the end of the region
    else {
      // Check if the current line marks the end of the region
      if (testLine(line, REGION_REGEXP, regionName, true)) {
        return { start, end: lineId, regexp: REGION_REGEXP, imports };
      }

      // Check for import statements to be included in the region
      const importMatch = line.match(IMPORT_REGEXP);
      if (importMatch) {
        imports = imports.concat(importMatch[1].split(',').map((s) => s.trim()));
      }
    }
  }

  // If no region is found, return null
  return null;
}

export const snippetPlugin = (md: MarkdownIt, srcDir: string) => {
  const parser: MarkdownIt.ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
    // Character code for '<' used to identify the start code snippet
    const CH = '<'.charCodeAt(0);
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // Skip if it's indented more than 3 spaces, as it should be treated as a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }

    // Check if the custom syntax starts with '<<<'
    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i);
      if (ch !== CH || pos + i >= max) return false;
    }

    // Skip processing if we're just scanning for the end of the block
    if (silent) {
      return true;
    }

    try {
      // Extracting the path to the code snippet from the Markdown content
      const start = pos + 3;
      const end = state.skipSpacesBack(max, pos);
      const rawPathRegexp =
        /^(.+(?:\.([a-z0-9]+)))(?:(#[\w-]+))?(?: ?(?:{(\d+(?:[,-]\d+)*)? ?(\S+)?}))? ?(?:\[(.+)\])?$/;
      const rawPath = state.src.slice(start, end).trim().replace(/^@/, srcDir).trim();

      // Parse the extracted path to get details about the snippet
      const [
        snippetFilename,
        snippetExtension,
        snippetRegion,
        snippetLines,
        snippetLang,
        snippetRawTitle,
      ] = (rawPathRegexp.exec(rawPath) || []).slice(1);

      // Resolve the path to the actual file containing the code snippet
      const customSrc = path.resolve(snippetFilename) + snippetRegion;
      const [filepath, regionName] = customSrc.split('#');
      const isAFile = fs.existsSync(filepath) && fs.lstatSync(filepath).isFile();

      // Throw error if the file doesn't exist
      if (!isAFile) {
        throw new FuelError(ErrorCode.VITEPRESS_PLUGIN_ERROR, `File ${filepath} does not exist`);
      }

      // Read the content of the file
      let content = fs.readFileSync(filepath, 'utf8');
      const lines = content.split(/\r?\n/);

      // Find the specified region in the file
      const region = findRegion(lines, regionName);
      if (!region) {
        throw new FuelError(
          ErrorCode.VITEPRESS_PLUGIN_ERROR,
          `Region ${regionName} does not exist in file ${filepath}`
        );
      }

      const snippetContent = lines.slice(region.start, region.end);
      validateSnippetContent(snippetContent, filepath);

      // Extract and add imports specified in the #import flag
      let importStatements = '';
      if (region.imports.length > 0) {
        importStatements = extractImports(filepath, region.imports.flat(), snippetContent);
      }

      // Construct the final content for the code snippet
      content = importStatements.concat(
        dedent(
          snippetContent
            .filter((line) => !region.regexp.test(line.trim()))
            .map((line) => (IMPORT_REGEXP.test(line) ? '' : line))
            .join('\n')
        )
      );

      // Generate a URL to the snippet on GitHub
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

      // Create a markdown token to insert the snippet into the document
      const title = snippetRawTitle || snippetFilename.split('/').pop() || '';
      state.line = startLine + 1;
      const token = state.push('fence', 'code', 0);
      Object.assign(token, {
        url,
        content,
        customSrc,
        markup: '```',
        map: [startLine, startLine + 1],
        info: `${snippetLang || snippetExtension}${snippetLines ? `{${snippetLines}}` : ''}${
          title ? `[${title}]` : ''
        }`,
      });
    } catch (e) {
      // Handle any errors that occur during snippet processing
      throw new FuelError(
        ErrorCode.VITEPRESS_PLUGIN_ERROR,
        `Error while parsing snippet: ${(<Error>e).message}`
      );
    }

    return true;
  };

  // Register the custom parser with MarkdownIt
  md.block.ruler.before('fence', 'customSnippet', parser);
};
