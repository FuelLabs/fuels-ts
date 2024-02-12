import type { ResolvedAbiType } from '../../../ResolvedAbiType';
import type { ICoder } from '../../types/ICoder';
import type { TGetCoderFn } from '../../types/IGetCoder';
import type { TEncodingOptions } from '../../types/TEncodingOptions';

/**
 * @param components - types array to create coders for.
 * @param options - options - options to be utilized during the encoding process.
 * @returns an object containing types and an appropriate coder.
 */
export function getCoders(
  components: readonly ResolvedAbiType[],
  options: TEncodingOptions & { getCoder: TGetCoderFn }
) {
  const { getCoder } = options;
  return components.reduce((obj, component) => {
    const o: Record<string, ICoder> = obj;

    o[component.name] = getCoder(component, options);
    return o;
  }, {});
}
