import { Coder, NumberCoder, U64Coder } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

// Bitfield of used policy types.
export enum PolicyType {
  GasPrice = 1,
  WitnessLimit = 2,
  Maturity = 4,
  MaxFee = 8,
}

export type Policy = PolicyGasPrice | PolicyWitnessLimit | PolicyMaturity | PolicyMaxFee;

export type PolicyGasPrice = {
  type: PolicyType.GasPrice;
  data: BN;
};

export type PolicyWitnessLimit = {
  type: PolicyType.WitnessLimit;
  data: BN;
};

export type PolicyMaturity = {
  type: PolicyType.Maturity;
  data: number;
};

export type PolicyMaxFee = {
  type: PolicyType.MaxFee;
  data: BN;
};

export const sortPolicies = (policies: Policy[]): Policy[] =>
  policies.sort((a, b) => a.type - b.type);

function validateDuplicatedPolicies(policies: Policy[]): void {
  const seenTypes = new Set<PolicyType>();

  policies.forEach((policy) => {
    if (seenTypes.has(policy.type)) {
      throw new FuelError(
        ErrorCode.DUPLICATED_POLICY,
        `Duplicate policy type found: ${PolicyType.MaxFee}`
      );
    }
    seenTypes.add(policy.type);
  });
}

export class PoliciesCoder extends Coder<Policy[], Policy[]> {
  constructor() {
    super('Policies', 'array Policy', 0);
  }

  encode(policies: Policy[]): Uint8Array {
    validateDuplicatedPolicies(policies);
    const sortedPolicies = sortPolicies(policies);

    const parts: Uint8Array[] = [];

    sortedPolicies.forEach(({ data, type }) => {
      switch (type) {
        case PolicyType.MaxFee:
        case PolicyType.GasPrice:
        case PolicyType.WitnessLimit:
          parts.push(new U64Coder().encode(data));
          break;

        case PolicyType.Maturity:
          parts.push(new NumberCoder('u32').encode(data));
          break;

        default: {
          throw new FuelError(ErrorCode.INVALID_POLICY_TYPE, `Invalid policy type: ${type}`);
        }
      }
    });

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number, policyTypes: number): [Policy[], number] {
    let o = offset;
    const policies: Policy[] = [];

    if (policyTypes & PolicyType.GasPrice) {
      const [gasPrice, nextOffset] = new U64Coder().decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.GasPrice, data: gasPrice });
    }

    if (policyTypes & PolicyType.WitnessLimit) {
      const [witnessLimit, nextOffset] = new U64Coder().decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.WitnessLimit, data: witnessLimit });
    }

    if (policyTypes & PolicyType.Maturity) {
      const [maturity, nextOffset] = new NumberCoder('u32').decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.Maturity, data: maturity });
    }

    if (policyTypes & PolicyType.MaxFee) {
      const [maxFee, nextOffset] = new U64Coder().decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.MaxFee, data: maxFee });
    }

    return [policies, o];
  }
}
