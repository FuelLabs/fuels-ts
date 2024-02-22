import type { ResolvedAbiType } from '../../ResolvedAbiType';
import type { GetCoder } from '../../types/GetCoder';
import type { EncodingOptions } from '../../types/EncodingOptions';
import type { Coder } from '../coders/AbstractCoder';

/**
 * @param components - types array to create coders for.
 * @param options - options - options to be utilized during the encoding process.
 * @returns an object containing types and an appropriate coder.
 */
export function getCoders(
  components: readonly ResolvedAbiType[],
  options: EncodingOptions & GetCoder
) {
  const { getCoder } = options;
  return components.reduce((obj, component) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component, options);
    return o;
  }, {});
}
