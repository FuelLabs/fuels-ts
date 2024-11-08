import type { JsonAbi } from '@fuel-ts/abi-coder';

export const adjustOffsets = (jsonAbi: JsonAbi, configurableOffsetDiff: number) => {
  const { configurables: readOnlyConfigurables } = jsonAbi;
  const configurables: JsonAbi['configurables'] = [];
  readOnlyConfigurables.forEach((config) => {
    // @ts-expect-error shut up the read-only thing
    configurables.push({ ...config, offset: config.offset - configurableOffsetDiff });
  });
  return { ...jsonAbi, configurables } as JsonAbi;
};
