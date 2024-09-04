import type { AbiGenRenderable } from './types';

/**
 * abi/gen/renderables/contract
 *
 */
const renderMainContract: AbiGenRenderable = ({ input }) => [
  {
    path: `${input.abi.capitalizedName}.ts`,
    contents: `export class ${input.abi.capitalizedName} {}`,
  },
];

const renderFactoryContract: AbiGenRenderable = ({ input }) => [
  {
    path: `${input.abi.capitalizedName}Factory.ts`,
    contents: `export class ${input.abi.capitalizedName}Factory {}`,
  },
];

const createRenderableCollection =
  (renderables: AbiGenRenderable[]): AbiGenRenderable =>
  ({ input }) =>
    renderables.flatMap((renderable) => renderable({ input }));

export type ProgramRenderables = Record<'contract' | 'predicate' | 'script', AbiGenRenderable>;

export const typescript: ProgramRenderables = {
  contract: createRenderableCollection([renderMainContract, renderFactoryContract]),
  predicate: createRenderableCollection([]),
  script: createRenderableCollection([]),
} as const;
