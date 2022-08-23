import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type { JsonAbiFragmentType } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ContractUtils } from '@fuel-ts/contract';
import { AbstractPredicate } from '@fuel-ts/interfaces';
import type { AbstractAddress } from '@fuel-ts/interfaces';

export class Predicate extends AbstractPredicate {
  bytes: Uint8Array;
  address: AbstractAddress;
  types?: ReadonlyArray<JsonAbiFragmentType>;

  constructor(bytes: BytesLike, types?: ReadonlyArray<JsonAbiFragmentType>) {
    super();
    this.bytes = arrayify(bytes);
    this.address = Address.fromB256(ContractUtils.getContractRoot(this.bytes));
    this.types = types;
  }
}
