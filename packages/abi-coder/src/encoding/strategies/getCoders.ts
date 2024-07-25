import type { ResolvedType } from '../../ResolvedType';
import type { EncodingOptions } from '../../types/EncodingOptions';
import type { GetCoderFn } from '../../types/GetCoder';
import type { Coder } from '../coders/AbstractCoder';

/**
 * @param components - types array to create coders for.
 * @param options - options - options to be utilized during the encoding process.
 * @returns an object containing types and an appropriate coder.
 */
export function getCoders(
  components: readonly { name: string; type: ResolvedType }[],
  options: EncodingOptions & { getCoder: GetCoderFn }
) {
  const { getCoder } = options;
  return components.reduce((obj, component) => {
    const o: Record<string, Coder> = obj;
    o[component.name as string] = getCoder(component.type, options);
    return o;
  }, {});
}
