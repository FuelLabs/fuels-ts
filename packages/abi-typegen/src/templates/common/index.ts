import type { BinaryVersions } from '@fuel-ts/versions';

import type { IFile } from '../../types/interfaces/IFile';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: {
  files: Pick<IFile, 'path'>[];
  versions: BinaryVersions;
}) {
  const { files, versions } = params;

  const members = files.map((f) => f.path.match(/([^/]+)\.ts$/m)?.[1]);

  const text = renderHbsTemplate({
    template: indexTemplate,
    versions,
    data: {
      members,
    },
  });

  return text;
}
