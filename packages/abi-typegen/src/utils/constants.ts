export const genericRegEx = /^generic (?<name>\w+)$/;

export function isVector(type: string) {
  const MATCH_REGEX: RegExp = /^struct (std::vec::)?Vec/m;
  const IGNORE_REGEX: RegExp = /^struct (std::vec::)?RawVec$/m;

  return MATCH_REGEX.test(type) && !IGNORE_REGEX.test(type);
}
