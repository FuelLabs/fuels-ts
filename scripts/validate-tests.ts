import { globSync } from 'glob';

import jestBrowserConfig from '../jest.browser.config';
import jestNodeConfig from '../jest.node.config';

const browserRegex = RegExp(<string>jestBrowserConfig.testRegex);
const nodeRegex = RegExp(<string>jestNodeConfig.testRegex);

const main = async () => {
  const files = await globSync('**/*.test.ts');
  files.forEach((file) => {
    const isBrowserTest = browserRegex.test(file);
    const isNodeTest = nodeRegex.test(file);

    if (!isBrowserTest && !isNodeTest) {
      throw new Error(`Test file does not fit a jest environment configuration: ${file}`);
    }
  });
};

main();
