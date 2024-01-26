import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';

export interface CodeSnippetToken extends Token {
  type: 'fence';
  tag: 'code';
  url: string;
}

/**
 * Adds anchor link 'code in context' to all for all CodeSnippetTokens.
 * @param md - The MarkdownIt instance.
 */
export const codeInContextPlugin = (md: MarkdownIt) => {
  md.core.ruler.after('inline', 'add-anchor-link', (state) => {
    const newTokens: Token[] = [];

    state.tokens.forEach((token, index) => {
      newTokens.push(token);

      if (isCodeSnippetToken(token)) {
        newTokens.push(createAnchorToken(token.url));
        if (shouldAddDivider(state.tokens, index)) {
          newTokens.push(createDividerToken());
        }
      }
    });

    state.tokens = newTokens;
  });
};

/**
 * Checks if a given token is a CodeSnippetToken.
 * @param token The token to check.
 * @returns True if the token is a CodeSnippetToken, false otherwise.
 */
export const isCodeSnippetToken = (token: Token): token is CodeSnippetToken => {
  return token.type === 'fence' && token.tag === 'code' && 'url' in token;
};

/**
 * Creates an anchor link token with the specified URL.
 *
 * @param url - The URL to be used in the anchor tag.
 * @returns The created anchor token.
 */
export const createAnchorToken = (url: string): Token => {
  const anchorToken = new Token('html_inline', '', 0);
  anchorToken.content = `<a class="anchor-link" href="${url}" target="_blank" rel="noreferrer">See code in context</a>`;
  return anchorToken;
};

/**
 * Determines whether a divider should be added after a code snippet.
 * @param tokens - The array of tokens.
 * @param index - The index of the current token.
 * @returns True if a divider should be added, false otherwise.
 */
export const shouldAddDivider = (tokens: Token[], index: number): boolean => {
  /**
   * The divider should be added only if a next token exists and if it is not
   * a 'h2' tag, since an 'hr' tag is already added before this tag by default.
   */
  const nextToken = tokens[index + 1];
  return !!nextToken && !/h2/.test(nextToken.tag);
};

/**
 * Creates a divider token.
 * @returns The created divider token.
 */
export const createDividerToken = (): Token => {
  const divisorToken = new Token('hr', 'hr', 0);
  divisorToken.markup = '---';
  return divisorToken;
};
