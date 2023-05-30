import MarkdownIt from 'markdown-it';
import path from 'path';
import fs from 'fs';
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

function findRegion(lines: Array<string>, regionName: string) {
  const regexp = /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/;

  let start = -1;
  for (const [lineId, line] of lines.entries()) {
    if (start === -1) {
      if (testLine(line, regexp, regionName)) {
        start = lineId + 1;
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { start, end: lineId, regexp };
    }
  }

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
        throw new Error(`File ${filepath} does not exist`);
      }

      let content = fs.readFileSync(filepath, 'utf8');

      const lines = content.split(/\r?\n/);
      const region = findRegion(lines, regionName);

      if (!region) {
        throw new Error(`Region ${regionName} does not exist in file ${filepath}`);
      }

      content = dedent(
        lines
          .slice(region.start, region.end)
          .filter((line: string) => !region.regexp.test(line.trim()))
          .join('\n')
      );

      const match = filepath.match(/(packages|apps)\/(.*)/);
      const partialPath = match?.[0];

      if (!partialPath) {
        throw new Error(`Failed to resolve the code snippet path at ${filepath}.`);
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
      throw new Error(`Error while parsing snippet: ${e.message}`);
    }

    return true;
  };

  md.block.ruler.before('fence', 'customSnippet', parser);
};
