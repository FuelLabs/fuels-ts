/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const findTypeByConcreteId = (types, id) => types.find((x) => x.concreteTypeId === id);

const findConcreteTypeById = (abi, id) => abi.concreteTypes.find((x) => x.concreteTypeId === id);

function finsertTypeIdByConcreteTypeId(abi, types, id) {
  const concreteType = findConcreteTypeById(abi, id);

  if (concreteType.metadataTypeId !== undefined) {
    return concreteType.metadataTypeId;
  }

  const type = findTypeByConcreteId(types, id);
  if (type) {
    return type.typeId;
  }

  types.push({
    typeId: types.length,
    type: concreteType.type,
    components: parseComponents(concreteType.components),
    concreteTypeId: id,
    typeParameters: concreteType.typeParameters ?? null,
    originalConcreteTypeId: concreteType?.concreteTypeId,
  });

  return types.length - 1;
}

function parseFunctionTypeArguments(abi, types, concreteType) {
  return (
    concreteType.typeArguments?.map((cTypeId) => {
      const self = findConcreteTypeById(abi, cTypeId);
      const type = !isNaN(cTypeId) ? cTypeId : finsertTypeIdByConcreteTypeId(abi, types, cTypeId);
      return {
        name: '',
        type,
        // originalTypeId: cTypeId,
        typeArguments: parseFunctionTypeArguments(abi, types, self),
      };
    }) ?? null
  );
}

export function parseConcreteType(abi, types, concreteTypeId, name) {
  const type = finsertTypeIdByConcreteTypeId(abi, types, concreteTypeId);
  const concrete = findConcreteTypeById(abi, concreteTypeId);
  return {
    name: name ?? '',
    type,
    // concreteTypeId,
    typeArguments: parseFunctionTypeArguments(abi, types, concrete),
  };
}

function parseComponents(abi, types, components) {
  return (
    components?.map((component) => {
      const { typeId, name, typeArguments } = component;
      const type = !isNaN(typeId) ? typeId : finsertTypeIdByConcreteTypeId(abi, types, typeId);
      return {
        name,
        type,
        // originalTypeId: typeId,
        typeArguments: parseComponents(abi, types, typeArguments),
      };
    }) ?? null
  );
}

/**
 * This will transpile new ABIs (spec: "1") to the old format.
 *
 * The new format got these new props:
 *    - `specVersion`,
 *    - `concreteTypes`
 *    - `metadataTypes`
 *
 * The old format contains only:
 *    - `types`
 */
export function transpileAbi(abi) {
  // do not transpile older versions
  if (!abi.specVersion) {
    return abi;
  }

  // 0. define empty types array
  const types = [];

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
    t.components = parseComponents(abi, types, t.components);
  });

  // 3. functions inputs/outputs
  const functions = abi.functions.map((fn) => {
    const inputs = fn.inputs.map(({ concreteTypeId, name }) =>
      parseConcreteType(abi, types, concreteTypeId, name)
    );
    const output = parseConcreteType(abi, types, fn.output, '');
    return { ...fn, inputs, output };
  });

  // 4. configurables
  const configurables = abi.configurables.map((conf) => ({
    name: conf.name,
    configurableType: parseConcreteType(abi, types, conf.concreteTypeId),
    offset: conf.offset,
  }));

  // 5. loggedTypes
  const loggedTypes = abi.loggedTypes.map((log) => ({
    logId: log.logId,
    loggedType: parseConcreteType(abi, types, log.concreteTypeId),
  }));

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
