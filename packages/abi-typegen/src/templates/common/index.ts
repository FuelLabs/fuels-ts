import type { IFile } from '../../types/interfaces/IFile';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { files: Pick<IFile, 'path'>[] }) {
  const { files } = params;

  const members = files.map((f) => f.path.match(/([^/]+)\.ts$/m)?.[1]);

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: {
      members,
    },
  });

  return text;
}
