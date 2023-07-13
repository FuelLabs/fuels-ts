import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';

type CustomTokem = Token & { url?: string };

export function codeInContextPlugin(md: MarkdownIt) {
  md.core.ruler.after('inline', 'add-anchor-link', (state) => {
    let newTokens: CustomTokem[] = [];

    state.tokens.forEach((token: CustomTokem, index) => {
      newTokens.push(token);

      if (token.type === 'fence' && token.tag === 'code' && token.url) {
        const { url } = token;

        /**
         * Extracting 'url' prop inserted by "snippetPlugin" and creating
         * "See code in context" link after code snippet.
         */
        const anchorToken = new Token('html_inline', '', 0);
        anchorToken.content = `<a class="anchor-link"
          href="${url}"
          target="_blank"
          rel="noreferrer">See code in context
        </a>`;

        newTokens.push(anchorToken);

        let shouldAddDivider = true;

        if (index + 1 >= state.tokens.length) {
          shouldAddDivider = false;
        } else {
          const nextToken = state.tokens[index + 1];

          if (nextToken && /h2/.test(nextToken.tag)) {
            shouldAddDivider = false;
          }
        }

        if (shouldAddDivider) {
          const divisorToken = new Token('hr', 'hr', 0);
          divisorToken.markup = '---';
          newTokens.push(divisorToken);
        }
      }
    });

    state.tokens = newTokens;
  });
}
