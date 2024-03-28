/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../hbs.d.ts" />

// TODO: once abi-typegen implements a way to generate all types of sway
// programs in a bundle file we don't need to create a index.ts file
import Handlebars from 'handlebars';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(paths: string[]) {
  const renderTemplate = Handlebars.compile(indexTemplate, {
    strict: true,
    noEscape: true,
  });
  return renderTemplate({
    paths,
  });
}
