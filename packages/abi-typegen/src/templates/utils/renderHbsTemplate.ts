import { compile } from 'handlebars';

import headerTemplate from '../hbs/_header.hbs';

/*
  Renders the given template w/ the given data, while injecting common
  header for disabling lint rules and annotating Fuel component's versions.
*/
export function renderHbsTemplate(params: { template: string; data?: Record<string, unknown> }) {
  const { data, template } = params;

  // TODO: Integrate this on top of `packages/versions` PR
  const versions = {
    FUELS_VERSION: '0.0.0',
    FORC_VERSION: '0.0.0',
    FUEL_CORE_VERSION: '0.0.0',
  };

  const options = {
    strict: true,
    noEscape: true,
  };

  const renderTemplate = compile(template, options);
  const renderHeaderTemplate = compile(headerTemplate, options);

  const text = renderTemplate({
    ...data,
    header: renderHeaderTemplate(versions),
  });

  return text.replace(/[\n]{3,}/gm, '\n\n');
}
