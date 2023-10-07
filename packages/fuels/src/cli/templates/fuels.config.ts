import Handlebars, { compile } from 'handlebars';

import fuelsConfigTemplate from './fuels.config.hbs';

Handlebars.registerHelper('isDefined', (v) => v !== undefined);

export function renderFuelsConfigTemplate(props: {
  workspace: string;
  output: string;
  useBuiltinForc: boolean;
  useBuiltinFuelCore: boolean;
  autoStartFuelCore?: boolean;
}) {
  const renderTemplate = compile(fuelsConfigTemplate, {
    strict: true,
    noEscape: true,
  });
  return renderTemplate(props);
}
