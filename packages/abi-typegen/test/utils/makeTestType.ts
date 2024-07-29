import { makeType } from '../../src/utils/makeType';
import { supportedTypes } from '../../src/utils/supportedTypes';

export function makeTestType(type: string) {
  return makeType(supportedTypes, {
    type,
    components: undefined,
    typeId: '',
    typeParamsArgsMap: undefined,
  });
}
