import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { Interface } from '@fuel-ts/abi-coder';
import type { JsonAbiFragmentType, JsonAbi } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ContractUtils } from '@fuel-ts/contract';
import { AbstractPredicate } from '@fuel-ts/interfaces';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { versions } from '@fuel-ts/versions';

const logger = new Logger(versions.FUELS);

export class Predicate extends AbstractPredicate {
  bytes: Uint8Array;
  address: AbstractAddress;
  types?: ReadonlyArray<JsonAbiFragmentType>;
  interface?: Interface;

  constructor(bytes: BytesLike, types?: JsonAbi) {
    super();
    this.bytes = arrayify(bytes);
    this.address = Address.fromB256(ContractUtils.getContractRoot(this.bytes));

    if (types) {
      const abiInterface = new Interface(types as JsonAbi);
      const mainFunction = abiInterface.fragments.find(({ name }) => name === 'main');
      if (mainFunction !== undefined) {
        this.types = mainFunction.inputs;
      } else {
        logger.throwArgumentError(
          'Cannot use ABI without "main" function',
          'Function fragments',
          abiInterface.fragments
        );
      }
    }
  }
}
