import type { AbiSpecificationV1 } from './specification';

/**
 * Both RawVec and RawBytes are private sway std library types
 * that can never be used directly in sway,
 * and the only reason they're in the abi is because they're used internally by Vec and Bytes
 * and not ignored when forc builds the outputs.
 * We can safely ignore them and simplify the `Vec` and `Bytes` types.
 * This makes it simpler for us to consume these types in typegen and coder,
 * as well as for others consuming the parsed abi,
 * who now don't have to worry about this unnecessary complexity.
 * `raw untyped ptr` is also in the abi only because of RawVec and RawBytes,
 * so we ignore that as well.
 */
const IGNORED_TYPES = ['struct std::vec::RawVec', 'struct std::bytes::RawBytes', 'raw untyped ptr'];

export function cleanupAbi(abi: AbiSpecificationV1): AbiSpecificationV1 {
  return {
    ...abi,
    metadataTypes: abi.metadataTypes
      .filter((metadataType) => !IGNORED_TYPES.includes(metadataType.type))
      .map((metadataType) => {
        switch (metadataType.type) {
          /**
           * Vectors consist of multiple components,
           * but we only care about the `buf`'s first type argument
           * which defines the type of the vector data.
           * Everything else is being ignored,
           * as it's then easier to reason about the vector
           */
          case 'struct std::vec::Vec':
            return {
              ...metadataType,
              components: metadataType.components?.[0].typeArguments,
            };

          /**
           * We treat Bytes as a special type
           * that is handled only based on its type name ('struct std::bytes::Bytes')
           * and not its components.
           */
          case 'struct std::bytes::Bytes':
            return {
              type: metadataType.type,
              metadataTypeId: metadataType.metadataTypeId,
            };
          default:
            return metadataType;
        }
      }),
  };
}
