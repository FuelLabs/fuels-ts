import type { ParamType } from './fragments/param-type';

export function filterEmptyParams<T>(types: T): T;
export function filterEmptyParams(types: ReadonlyArray<string | ParamType>) {
  return types.filter((t) => (t as Readonly<ParamType>)?.type !== '()' && t !== '()');
}
