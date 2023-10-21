import type { DocSnippetProjectsEnum } from '@fuel-ts/utils/test-utils';
import { getForcProject, ForcProjectDirsEnum } from '@fuel-ts/utils/test-utils';
import type { JsonAbi } from 'fuels';

export const getSnippetProjectArtifacts = (project: DocSnippetProjectsEnum) =>
  getForcProject<JsonAbi>({
    dir: ForcProjectDirsEnum.DOCS_SNIPPETS,
    projectName: project,
  });
