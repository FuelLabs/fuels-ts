/**
 * Options for the guide builder plugin.
 */
export interface GuideBuilderOptions {
  /**
   * Should the plugin process code blocks?
   *
   * @default true
   */
  isProcessingCodeBlocks: boolean;
  /**
   * Folder relative to the root of the project to copy guide markdown from
   */
  guideSource: string;
  /**
   * Folder relative to the root of the docs `out` folder to copy guide markdown to
   */
  guideOutput: string;
  /**
   * Codeblock source url
   */
  codeBlockSourceUrl: string;
}

/** Default option values. */
export const defaultOptions: GuideBuilderOptions = {
  isProcessingCodeBlocks: true,
  guideSource: 'docs/_guide',
  guideOutput: 'docs/guide',
  codeBlockSourceUrl: 'https://github.com/FuelLabs/fuels-ts/blob/master',
};

/** Key of the options in the options file. */
export const optionsKey: string = 'guideBuilder';
