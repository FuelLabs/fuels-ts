/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../hbs.d.ts" />

import Handlebars from 'handlebars';

import fuelsConfigTemplate from './fuels.config.hbs';

Handlebars.registerHelper('isDefined', (v) => v !== undefined);

export function renderFuelsConfigTemplate(props: {
  workspace?: string;
  contracts?: string[];
  scripts?: string[];
  predicates?: string[];
  output: string;
  forcPath?: string;
  fuelCorePath?: string;
  autoStartFuelCore?: boolean;
  fuelCorePort?: string;
}) {
  const renderTemplate = Handlebars.compile(fuelsConfigTemplate, {
    strict: true,
    noEscape: true,
  });

  return renderTemplate(props);
}
