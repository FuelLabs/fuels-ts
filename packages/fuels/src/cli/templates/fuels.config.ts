import Handlebars, { compile } from 'handlebars';

import { error } from '../utils/logger';

import fuelsConfigTemplate from './fuels.config.hbs';

Handlebars.registerHelper('isDefined', (v) => v !== undefined);

export function renderFuelsConfigTemplate(props: {
  workspace?: string;
  contracts?: string[];
  scripts?: string[];
  predicates?: string[];
  output: string;
  useBuiltinForc: boolean;
  useBuiltinFuelCore: boolean;
  autoStartFuelCore?: boolean;
}) {
  const renderTemplate = compile(fuelsConfigTemplate, {
    strict: true,
    noEscape: true,
  });

  try {
    return renderTemplate(props);
  } catch (err) {
    error(err);
    throw err;
  }
}
