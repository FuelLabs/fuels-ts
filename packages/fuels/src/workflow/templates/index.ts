// TODO: once abi-typegen implements a way to generate all types of sway
// programs in a bundle file we don't need to create a index.ts file
import { compile } from 'handlebars';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(paths: string[]) {
  const renderTemplate = compile(indexTemplate, {
    strict: true,
    noEscape: true,
  });
  return renderTemplate({
    paths,
  });
}
