import { join } from 'path';

import type { AbiGenFile, AbiGenInput, AbiGenOutput } from '../types';

export interface ContractInput {
  input: AbiGenInput;
  output: AbiGenOutput;
}

// Do we want the ability to type our data to allow for easer maintain and readability?
const renderHbsTemplate = (templateFilePath: string, data: Record<string, unknown>): string => '';

/**
 * Handles the rendering of a single contract ABI input
 * Returning the associated files
 */
export const renderContract = (opts: {
  input: AbiGenInput;
  output: AbiGenOutput;
}): AbiGenFile[] => {
  const {
    input,
    output: { type, outputDir, fileExtension },
  } = opts;

  const templateDir = join(__dirname, 'templates', type);
  const mainTemplateFile = join(templateDir, 'contract.hbs');
  const dtsTemplateFile = join(templateDir, 'contract.d.hbs');

  // Construct our data from the input
  const data = {};

  // Decides what files we require given the input and output
  const files: AbiGenFile[] = [];
  files.push({
    path: `${outputDir}/${input.abi.capitalizedName}.${fileExtension}`,
    contents: renderHbsTemplate(mainTemplateFile, data),
  });

  if (type === 'typescript') {
    files.push({
      path: `${outputDir}/index.d.${fileExtension}`,
      contents: renderHbsTemplate(dtsTemplateFile, data),
    });
  }

  return files;
};
