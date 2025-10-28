import { BigNumberCoder, Coder, NumberCoder, WORD_SIZE } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

// Bitfield of used policy types.
export enum PolicyType {
  Tip = 1,
  WitnessLimit = 2,
  Maturity = 4,
  MaxFee = 8,
  Expiration = 16,
  Owner = 32,
}

export type Policy =
  | PolicyTip
  | PolicyWitnessLimit
  | PolicyMaturity
  | PolicyMaxFee
  | PolicyExpiration
  | PolicyOwner;

export type PolicyTip = {
  type: PolicyType.Tip;
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

export type PolicyExpiration = {
  type: PolicyType.Expiration;
  data: number;
};

export type PolicyMaxFee = {
  type: PolicyType.MaxFee;
  data: BN;
};

export type PolicyOwner = {
  type: PolicyType.Owner;
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

export function getPolicyTypesArray(policyTypes: number): number[] {
  const out: number[] = [];
  let m = policyTypes >>> 0;
  while (m !== 0) {
    const low = m & -m;
    out.push(low);
    m &= m - 1;
  }
  return out;
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
        case PolicyType.Tip:
        case PolicyType.WitnessLimit:
          parts.push(new BigNumberCoder('u64').encode(data));
          break;

        case PolicyType.Maturity:
        case PolicyType.Expiration:
          parts.push(new NumberCoder('u32', { padToWordSize: true }).encode(data));
          break;
        case PolicyType.Owner:
          parts.push(new BigNumberCoder('u64').encode(data));
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
    const policyTypesArray = getPolicyTypesArray(policyTypes);

    for (const policyType of policyTypesArray) {
      switch (policyType) {
        case PolicyType.Tip: {
          const [tip, nextOffset] = new BigNumberCoder('u64').decode(data, o);
          o = nextOffset;
          policies.push({ type: PolicyType.Tip, data: tip });
          break;
        }
        case PolicyType.WitnessLimit: {
          const [witnessLimit, nextOffset] = new BigNumberCoder('u64').decode(data, o);
          o = nextOffset;
          policies.push({ type: PolicyType.WitnessLimit, data: witnessLimit });
          break;
        }
        case PolicyType.Maturity: {
          const [maturity, nextOffset] = new NumberCoder('u32', { padToWordSize: true }).decode(
            data,
            o
          );
          o = nextOffset;
          policies.push({ type: PolicyType.Maturity, data: maturity });
          break;
        }
        case PolicyType.MaxFee: {
          const [maxFee, nextOffset] = new BigNumberCoder('u64').decode(data, o);
          o = nextOffset;
          policies.push({ type: PolicyType.MaxFee, data: maxFee });
          break;
        }
        case PolicyType.Expiration: {
          const [expiration, nextOffset] = new NumberCoder('u32', { padToWordSize: true }).decode(
            data,
            o
          );
          o = nextOffset;
          policies.push({ type: PolicyType.Expiration, data: expiration });
          break;
        }
        case PolicyType.Owner: {
          const [owner, nextOffset] = new BigNumberCoder('u64').decode(data, o);
          o = nextOffset;
          policies.push({ type: PolicyType.Owner, data: owner });
          break;
        }
        default:
          // Unknown policy types will be handled after the loop
          break;
      }
    }

    // If the policy types are greater than the maximum policy type, we need to skip the remaining bits
    // this allows for backwards compatibility with newer versions of the policy types.
    const leftPolicyTypes = policyTypesArray.length - policies.length;
    if (leftPolicyTypes > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `${leftPolicyTypes} unknown policy types found in the transaction, please update fuels to the latest version`
      );
      o += leftPolicyTypes * WORD_SIZE;
    }

    return [policies, o];
  }
}
