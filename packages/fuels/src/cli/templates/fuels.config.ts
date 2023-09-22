import { compile } from 'handlebars';

import fuelsConfigTemplate from './fuels.config.hbs';

export function renderFuelsConfigTemplate(props: { workspace: string; output: string }) {
  const renderTemplate = compile(fuelsConfigTemplate, {
    strict: true,
    noEscape: true,
  });
  return renderTemplate(props);
}
