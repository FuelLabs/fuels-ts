export function shouldSkipAbiType(params: { type: string }) {
  const ignoreList = [
    'struct RawVec',
    'struct std::vec::RawVec',
    'struct RawBytes',
    'struct std::bytes::RawBytes',
  ];
  const shouldSkip = ignoreList.indexOf(params.type) >= 0;
  return shouldSkip;
}
