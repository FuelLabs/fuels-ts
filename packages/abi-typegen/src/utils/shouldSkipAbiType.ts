export function shouldSkipAbiType(params: { type: string }) {
  const ignoreList = ['struct RawVec'];
  const shouldSkip = ignoreList.indexOf(params.type) >= 0;
  return shouldSkip;
}
