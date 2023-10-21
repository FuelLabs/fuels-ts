import type { DocSnippetProjectsEnum } from '@fuel-ts/utils/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { JsonAbi } from 'fuels';
import { join } from 'path';

export const getSnippetProjectArtifacts = (project: DocSnippetProjectsEnum) =>
  getForcProject<JsonAbi>(join(__dirname, project));
