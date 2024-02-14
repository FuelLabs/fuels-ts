export function getGroupsFromTypeByRegex(type: string, regex: RegExp): { [key: string]: string } {
  return regex.exec(type)?.groups ?? {};
}
