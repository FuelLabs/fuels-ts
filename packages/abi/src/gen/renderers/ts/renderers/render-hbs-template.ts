import type { BinaryVersions } from '@fuel-ts/versions';
import Handlebars from 'handlebars';

import headerTemplate from '../templates/header.hbs';

/*
  Renders the given template w/ the given data, while injecting common
  header for disabling lint rules and annotating Fuel component's versions.
*/
export function renderHbsTemplate(params: {
  template: string;
  data?: Record<string, unknown>;
  versions: BinaryVersions;
}) {
  const { data, template, versions } = params;

  const options = {
    strict: true,
    noEscape: true,
  };

  const renderHeaderTemplate = Handlebars.compile(headerTemplate, options);
  const renderTemplate = Handlebars.compile(template, options);

  const text = renderTemplate({
    // TODO: consider passing the version of forc used to build the project,
    // not the version supported by `fuels`.
    header: renderHeaderTemplate(versions),
    ...(data ?? {}),
  });

  return text;
}
