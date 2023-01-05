/* eslint-disable no-console */
import fs = require('fs');
import fsPromises = require('node:fs/promises');
import path = require('path');
import type { Application } from 'typedoc';
import { Renderer } from 'typedoc';

import type { ICodeSample } from './code-sample-file';
import { readCodeSample } from './code-sample-file';
import type { GuideBuilderOptions } from './guide-builder-options';
import { defaultOptions, optionsKey } from './guide-builder-options';

const CODE_TAG = '@code:';
const REGEX_CODE_LINK = /\[([^[]+)\](\(.*\))/gm;
const REGEX_NAV_ORDER = /(\[nav_order: \d+\])/g;
const FILE_CACHE = new Map<string, Map<string, ICodeSample>>();

const toNiceName = (str: string) =>
  str
    .toLowerCase()
    .split(/[^a-z0-9]/i)
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

const getCodeSample = (file: string, tag: string): ICodeSample | undefined => {
  const resolvedFile = path.resolve(file);
  if (!resolvedFile) {
    throw new Error(`Could not resolve file ${file}`);
  }

  if (!FILE_CACHE.has(resolvedFile)) {
    FILE_CACHE.set(resolvedFile, readCodeSample(resolvedFile));
  }

  const allFileSamples = FILE_CACHE.get(resolvedFile)!;
  return allFileSamples.get(tag);
};

const getSuggestedNavOrder = (text: string): [string, string] | undefined => {
  const matchedNavOrder = text.match(REGEX_NAV_ORDER);
  if (matchedNavOrder?.length && matchedNavOrder.length === 1) {
    const orderMatch = matchedNavOrder[0].match(/(\d+)/g);
    if (orderMatch) {
      return [matchedNavOrder[0], orderMatch[0]];
    }
  }

  return undefined;
};

/**
 * Copies directory and processes markdown into the output folder
 */
export class GuideBuilder {
  /** The current application. */
  private _typedoc?: Readonly<Application>;
  /** Path for output. */
  private _outFolder?: string;
  /** Path to output guide. */
  private _outGuideFolder?: string;
  /** Path to source medias. */
  private _sourceGuideFolder?: string;

  private _options: GuideBuilderOptions = defaultOptions;

  /**
   * Create a new RelativeIncludesConverterComponent instance.
   *
   * @param typedoc - The application.
   */
  public initialize(typedoc: Readonly<Application>): void {
    this._typedoc = typedoc;

    typedoc.renderer.on(Renderer.EVENT_END, async () => {
      this._outFolder = this._typedoc?.options.getValue('out');
      this._options =
        <GuideBuilderOptions>this._typedoc?.options.getValue(optionsKey) ?? defaultOptions;

      if (!this._outFolder) return;
      this._sourceGuideFolder = path.resolve(this._options.guideSource);
      this._outGuideFolder = path.resolve(this._options.guideOutput);
      if (!fs.existsSync(this._outGuideFolder)) {
        fs.mkdirSync(this._outGuideFolder, { recursive: true });
      }

      try {
        const files: string[] = [];
        // copy all files
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unknown function exists
        await fsPromises.cp(this._sourceGuideFolder, this._outGuideFolder, {
          recursive: true,
          force: true,
          filter: this._options.isProcessingCodeBlocks
            ? (fileName) => {
                const newFilePath = fileName.replace(this._sourceGuideFolder, '');

                if (newFilePath && newFilePath.endsWith('.md')) {
                  files.push(newFilePath);
                }

                return true;
              }
            : undefined,
        });
        if (this._options.isProcessingCodeBlocks) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = path.join(this._outGuideFolder!, file);
            const { text, navOrder } = this.replaceCodeBlock(
              await fsPromises.readFile(filePath, { encoding: 'utf8' })
            );
            const namespace = file.replace('/', '').split('/');
            const guideName = toNiceName(namespace[namespace.length - 1].split('.')[0]);
            const parentName = toNiceName(namespace[0]);
            let header: string;
            const isIndex = guideName === 'Index';

            if (namespace.length === 1) {
              // top level file
              header = [
                `---`,
                `title: "${isIndex ? 'Guide' : guideName}"`,
                `has_children:  ${isIndex}`,
                `has_toc: ${isIndex}`,
                `nav_order: ${isIndex ? -4 : navOrder || -3}`,
                `---`,
              ].join('\n');
            } else if (isIndex) {
              // folder index
              header = [
                `---`,
                `title: "${parentName}"`,
                `parent: "Guide"`,
                `has_children: true`,
                `has_toc: false`,
                `nav_order: ${navOrder || -2}`,
                `---`,
              ].join('\n');
            } else {
              // folder file
              const rows = [
                `---`,
                `title: "${guideName}"`,
                `parent: "${parentName}"`,
                `grand_parent: "Guide"`,
              ];
              if (navOrder) {
                rows.push(`nav_order: ${navOrder}`);
              }
              rows.push(`---`);
              header = rows.join('\n');
            }

            const finalText = `${header}\n\n[info]: this file is autogenerated\n${text}`;
            await fsPromises.writeFile(filePath, finalText, { encoding: 'utf8' });
          }
        }
      } catch (error) {
        console.warn('failed to copy files:', error);
        throw new Error('Failed to generate Guide');
      }

      console.log(`Documentation generated at ${this._options.guideOutput}`);
    });
  }

  prettyPrint(sample: ICodeSample | undefined, match: string, language: string): string {
    if (!sample) {
      if (this._options.shouldThrowOnNotFound) {
        throw new Error(`Could not find sample code for ${match}`);
      }

      return match;
    }

    const sourceLink = `[see code in context](${
      this._options.codeBlockSourceUrl + sample.file.replace(process.cwd(), '')
    }#L${sample.startLine}-L${sample.endLine})`;

    return `
\`\`\`${language}
${sample.code.replaceAll('// #context ', '')}
\`\`\`
###### ${sourceLink}

---
`;
  }

  replaceCodeBlock(text: string): { text: string; navOrder?: string } {
    const navOrderMatch = getSuggestedNavOrder(text);
    let updated = text;
    let navOrder;
    if (navOrderMatch?.length) {
      updated = updated.replace(navOrderMatch[0], '');
      navOrder = navOrderMatch[1];
    }

    if (!text.includes(CODE_TAG)) {
      return { text: updated, navOrder };
    }

    const matches = text.match(REGEX_CODE_LINK);
    if (!matches || !matches.length) {
      return { text: updated, navOrder };
    }

    const singleMatch = /\[([^[]+)\]\((.*)\)/;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < matches.length; i++) {
      const link = singleMatch.exec(matches[i]) || '';
      const [matched, code, source] = link;
      if (!code.includes(CODE_TAG)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const language = code.split(':').pop() || '';
      const [filePath, tag] = source.split('#');
      updated = updated.replace(
        matched,
        this.prettyPrint(getCodeSample(filePath, tag), matched, language)
      );
    }

    return { text: updated, navOrder };
  }
}
