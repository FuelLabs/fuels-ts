import {
  codeInContextPlugin,
  isCodeSnippetToken,
  createAnchorToken,
  shouldAddDivider,
  createDividerToken,
  CodeSnippetToken,
} from './codeInContextPlugin';
import MarkdownIt from 'markdown-it';
import { Token } from 'markdown-it';

/**
 * @group node
 */
describe('codeInContextPlugin', () => {
  describe('isCodeSnippetToken', () => {
    it('should returns true for valid code snippet tokens', () => {
      const token = {
        type: 'fence',
        tag: 'code',
        url: 'http://example.com',
      } as unknown as Token;

      expect(isCodeSnippetToken(token)).toBeTruthy();
    });

    it('should returns false for tokens without a url', () => {
      const token: Token = { type: 'fence', tag: 'code' } as Token;
      expect(isCodeSnippetToken(token)).toBeFalsy();
    });

    it('should returns false for tokens with a different type', () => {
      const token = {
        type: 'paragraph',
        tag: 'code',
        url: 'http://example.com',
      } as unknown as Token;
      expect(isCodeSnippetToken(token)).toBeFalsy();
    });

    it('should returns false for tokens with a different tag', () => {
      const token = {
        type: 'fence',
        tag: 'div',
        url: 'http://example.com',
      } as unknown as Token;
      expect(isCodeSnippetToken(token)).toBeFalsy();
    });
  });

  describe('createAnchorToken', () => {
    it('should creates an anchor token with the correct URL', () => {
      const url = 'http://example.com';
      const token = createAnchorToken(url);
      expect(token.content).toBe(
        `<a class="anchor-link" href="${url}" target="_blank" rel="noreferrer">See code in context</a>`
      );
    });

    it('should creates an anchor token with an empty URL', () => {
      const url = '';
      const token = createAnchorToken(url);
      expect(token.content).toBe(
        `<a class="anchor-link" href="${url}" target="_blank" rel="noreferrer">See code in context</a>`
      );
    });
  });

  describe('shouldAddDivider', () => {
    it('should returns false if it is the last token', () => {
      const tokens: Token[] = [
        { type: 'fence', tag: 'code', url: 'http://example.com' } as unknown as Token,
      ];
      const index = tokens.length - 1;
      expect(shouldAddDivider(tokens, index)).toBeFalsy();
    });

    it('should returns true if the next token is not a header', () => {
      const tokens: Token[] = [
        { type: 'fence', tag: 'code', url: 'http://example.com' } as unknown as Token,
        { type: 'paragraph' } as unknown as Token,
      ];
      expect(shouldAddDivider(tokens, 0)).toBeTruthy();
    });

    it('should returns false if the next token is a header', () => {
      const tokens: Token[] = [
        { type: 'fence', tag: 'code', url: 'http://example.com' } as unknown as Token,
        { type: 'heading', tag: 'h2' } as unknown as Token,
      ];
      expect(shouldAddDivider(tokens, 0)).toBeFalsy();
    });
  });

  describe('createDividerToken', () => {
    it('should creates a divider token', () => {
      const token = createDividerToken();
      expect(token.type).toBe('hr');
      expect(token.markup).toBe('---');
    });
  });

  describe('codeInContextPlugin', () => {
    function mockTokens(mockedTokens: Token[]): Token[] {
      const md = new MarkdownIt();
      const processedTokens: Token[] = [];

      const mockTokensPlugin = (md: MarkdownIt) => {
        // Mocking tokens that are going to be processed by the 'codeInContextPlugin'
        md.core.ruler.before('add-anchor-link', 'mock-tokens', (state) => {
          state.tokens = mockedTokens;

          return state.tokens;
        });
      };

      const extractUpdatedTokensPlugin = (md: MarkdownIt) => {
        // Capturing tokens after they are processed by the 'codeInContextPlugin'
        md.core.ruler.after('add-anchor-link', 'capture-updated-tokens', (state) => {
          processedTokens.push(...state.tokens);
          return state.tokens;
        });
      };

      md.use(codeInContextPlugin);
      md.use(mockTokensPlugin);
      md.use(extractUpdatedTokensPlugin);

      // Triggering the MarkdownIt processing
      md.render('');

      return processedTokens;
    }

    it('should add an token link after code snippet with the URL', () => {
      const url = 'http://example.com';
      const mockedTokens = [
        {
          type: 'fence',
          tag: 'code',
          url,
          content: 'code snippet 1',
        } as CodeSnippetToken,
      ];

      const processedTokens = mockTokens(mockedTokens);

      const content = `<a class="anchor-link" href="${url}" target="_blank" rel="noreferrer">See code in context</a>`;
      expect(processedTokens).toContainEqual(
        expect.objectContaining({ type: 'html_inline', content })
      );
      expect(processedTokens.length).toBe(mockedTokens.length + 1); // Token for the anchor link was added
    });

    it('should NOT add token link for code snippet without URL', () => {
      const mockedTokens = [
        {
          type: 'fence',
          tag: 'code',
          content: 'code snippet 1',
        } as CodeSnippetToken,
      ];

      const processedTokens = mockTokens(mockedTokens);

      expect(processedTokens).not.toContainEqual(expect.objectContaining({ type: 'html_inline' }));
      expect(processedTokens.length).toBe(mockedTokens.length); // No token for the anchor link was added
    });

    it('should NOT add anchor link for non code snippet tokens', () => {
      Array.from({ length: 2 }).forEach((_, index) => {
        const mockedTokens = [
          {
            type: index === 0 ? 'fence' : 'paagraph',
            tag: index === 1 ? 'code' : 'p',
            content: 'code snippet 1',
            url: 'http://example.com',
          } as CodeSnippetToken,
        ];

        const processedTokens = mockTokens(mockedTokens);

        expect(processedTokens).not.toContainEqual(
          expect.objectContaining({ type: 'html_inline' })
        );
        expect(processedTokens.length).toBe(mockedTokens.length); // No token for the anchor link was added
      });
    });

    it('should add a "hr" divider when code snippet is not last token', () => {
      const mockedTokens = [
        {
          type: 'fence',
          tag: 'code',
          content: 'code snippet 1',
          url: 'http://example.com',
        } as CodeSnippetToken,
        {
          type: 'text',
          tag: '',
          content: 'Hello World',
        } as Token,
      ];

      const processedTokens = mockTokens(mockedTokens);

      expect(processedTokens).toContainEqual(
        expect.objectContaining({ markup: '---', type: 'hr' })
      );
      expect(processedTokens.length).toBe(mockedTokens.length + 2); // Link and divider Tokens were added
    });

    it('should NOT add a "hr" divider when code snippet is last token', () => {
      const mockedTokens = [
        {
          type: 'text',
          tag: '',
          content: 'Hello World',
        } as Token,
        {
          type: 'fence',
          tag: 'code',
          content: 'code snippet 1',
          url: 'http://example.com',
        } as CodeSnippetToken,
      ];

      const processedTokens = mockTokens(mockedTokens);

      expect(processedTokens).not.toContainEqual(
        expect.objectContaining({ markup: '---', type: 'hr' })
      );
      expect(processedTokens.length).toBe(mockedTokens.length + 1); // Only Token link was added
    });

    it('should NOT add a "hr" divider when next token is "h2"', () => {
      const mockedTokens = [
        {
          type: 'fence',
          tag: 'code',
          content: 'code snippet 1',
          url: 'http://example.com',
        } as CodeSnippetToken,
        {
          type: 'text',
          tag: 'h2',
          content: 'Hello World',
        } as Token,
      ];

      const processedTokens = mockTokens(mockedTokens);

      expect(processedTokens).not.toContainEqual(
        expect.objectContaining({ markup: '---', type: 'hr' })
      );
      expect(processedTokens.length).toBe(mockedTokens.length + 1); // Only Token link was added
    });
  });
});
