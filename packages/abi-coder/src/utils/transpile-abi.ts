/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { JsonAbiOld } from '../types/JsonAbi';
import type { JsonAbi } from '../types/JsonAbiNew';

/**
 * This will transpile new ABIs to the old format.
 *
 * The new format got these new props:
 *    - `specVersion`,
 *    - `concreteTypes`
 *    - `metadataTypes`
 *
 * The old format contains only:
 *    - `types`
 */
export function transpileAbi(abi: JsonAbi): JsonAbiOld {
  // do not transpile older versions
  if (!abi.specVersion) {
    return abi;
  }

  // 0. define empty types array
  const types = [];

  /**
   * Helpers
   */
  const findTypeByConcreteId = (id) => types.find((x) => x.concreteTypeId === id);

  const findConcreteTypeById = (id) => abi.concreteTypes.find((x) => x.concreteTypeId === id);

  function finsertTypeIdByConcreteTypeId(id) {
    const concreteType = findConcreteTypeById(id);

    if (concreteType.metadataTypeId !== undefined) {
      return concreteType.metadataTypeId;
    }

    const type = findTypeByConcreteId(id);
    if (type) {
      return type.typeId;
    }

    types.push({
      typeId: types.length,
      type: concreteType.type,
      components: concreteType.type === '()' ? [] : parseComponents(concreteType.components),
      concreteTypeId: id, // will be deleted at the end
      typeParameters: concreteType.typeParameters ?? null,
    });

    return types.length - 1;
  }

  function parseFunctionTypeArguments(concreteType) {
    return (
      concreteType.typeArguments?.map((cTypeId) => {
        const self = findConcreteTypeById(cTypeId);
        const type = !isNaN(cTypeId) ? cTypeId : finsertTypeIdByConcreteTypeId(cTypeId);
        return {
          name: '',
          type,
          // originalTypeId: cTypeId,
          typeArguments: parseFunctionTypeArguments(self),
        };
      }) ?? null
    );
  }

  function parseFunctioIO(concreteTypeId, name) {
    const type = finsertTypeIdByConcreteTypeId(concreteTypeId);
    const concrete = findConcreteTypeById(concreteTypeId);
    return {
      name: name ?? '',
      type,
      // concreteTypeId,
      typeArguments: parseFunctionTypeArguments(concrete),
    };
  }

  function parseComponents(components) {
    return (
      components?.map((component) => {
        const { typeId, name, typeArguments } = component;
        const type = !isNaN(typeId) ? typeId : finsertTypeIdByConcreteTypeId(typeId);
        return {
          name,
          type,
          // originalTypeId: typeId,
          typeArguments: parseComponents(typeArguments),
        };
      }) ?? null
    );
  }

  /**
   * Transpiling
   */

  // 1. root level of metadata types
  abi.metadataTypes.forEach((m) => {
    const t = {
      typeId: m.metadataTypeId,
      type: m.type,
      components: m.components ?? (m.type === '()' ? [] : null),
      typeParameters: m.typeParameters ?? null,
    };
    types.push(t);
  });

  // 2. the metadata's components
  types.forEach((t) => {
    t.components = parseComponents(t.components);
  });

  // 3. functions inputs/outputs
  const functions = abi.functions.map((fn) => {
    const inputs = fn.inputs.map(({ concreteTypeId, name }) =>
      parseFunctioIO(concreteTypeId, name)
    );
    const output = parseFunctioIO(fn.output, '');
    return { ...fn, inputs, output };
  });

  // 4. configurables
  const configurables = abi.configurables.map((conf) => ({
    name: conf.name,
    configurableType: parseFunctioIO(conf.concreteTypeId),
    offset: conf.offset,
  }));

  // 5. loggedTypes
  const loggedTypes = abi.loggedTypes.map((log) => ({
    logId: log.logId,
    loggedType: parseFunctioIO(log.concreteTypeId),
  }));

  // // 6. removes concreteTypeId
  // types.forEach((t) => {
  //   t.concreteTypeId = undefined;
  //   delete t.concreteTypeId;
  // });

  // transpiled ABI
  const transpiled = {
    encoding: abi.encodingVersion,
    types,
    functions,
    loggedTypes,
    messagesTypes: abi.messagesTypes,
    configurables,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transpiled as any;
}
