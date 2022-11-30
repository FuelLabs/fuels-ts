import { readFileSync } from 'fs';
import { compile } from 'handlebars';

import { templatePaths } from './templatePaths';

export function renderHbsTemplate(params: { filepath: string; data?: Record<string, unknown> }) {
  const { data, filepath } = params;

  // TODO: Integrate this on top of `packages/versions` PR
  const versions = {
    FUELS_VERSION: 1,
    FORC_VERSION: 2,
    FUEL_CORE_VERSION: 3,
  };

  const template = readFileSync(filepath, 'utf-8');
  const headerTemplate = readFileSync(templatePaths._header, 'utf-8');

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
