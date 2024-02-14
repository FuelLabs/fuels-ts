import { getGroupsFromTypeByRegex } from './getGroupsFromTypeByRegex';

export function isTypeByRegex(type: string, regex: RegExp): boolean {
  const groups = getGroupsFromTypeByRegex(type, regex);
  return Boolean(groups.length);
}
