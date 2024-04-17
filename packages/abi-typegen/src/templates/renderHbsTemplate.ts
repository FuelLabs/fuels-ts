import { versions } from '@fuel-ts/versions';
import Handlebars from 'handlebars';

import headerTemplate from './common/_header.hbs';

/*
  Renders the given template w/ the given data, while injecting common
  header for disabling lint rules and annotating Fuel component's versions.
*/
export function renderHbsTemplate(params: { template: string; data?: Record<string, unknown> }) {
  const { data, template } = params;

  const options = {
    strict: true,
    noEscape: true,
  };

  const renderTemplate = Handlebars.compile(template, options);
  const renderHeaderTemplate = Handlebars.compile(headerTemplate, options);

  const text = renderTemplate({
    ...data,
    header: renderHeaderTemplate(versions),
  });

  return text.replace(/[\n]{3,}/gm, '\n\n');
}
