import { compile } from 'handlebars';

import fuelsConfigTemplate from './fuels.config.hbs';

export function renderFuelsConfigTemplate() {
  const renderTemplate = compile(fuelsConfigTemplate, {
    strict: true,
    noEscape: true,
  });
  return renderTemplate({});
}
