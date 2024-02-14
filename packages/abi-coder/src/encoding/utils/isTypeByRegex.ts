import { getGroupsFromTypeByRegex } from './getGroupsFromTypeByRegex';

export function isTypeByRegex(type: string, regex: RegExp): boolean {
  return Boolean(getGroupsFromTypeByRegex(type, regex));
}
