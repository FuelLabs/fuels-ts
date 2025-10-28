import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import type { Policy } from './policy';
import { PoliciesCoder, PolicyType } from './policy';

/**
 * @group node
 * @group browser
 */
describe('PoliciesCoder', () => {
  describe('encode', () => {
    it('should encode policy correctly (Tip)', () => {
      const policies: Policy[] = [{ type: PolicyType.Tip, data: bn(57) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 57]));
    });

    it('should encode policy correctly (WitnessLimit)', () => {
      const policies: Policy[] = [{ type: PolicyType.WitnessLimit, data: bn(10) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 10]));
    });

    it('should encode policy correctly (Maturity)', () => {
      const policies: Policy[] = [{ type: PolicyType.Maturity, data: 254 }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 254]));
    });

    it('should encode policy correctly (MaxFee)', () => {
      const policies: Policy[] = [{ type: PolicyType.MaxFee, data: bn(76) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 76]));
    });

    it('should encode policy correctly (Expiration)', () => {
      const policies: Policy[] = [{ type: PolicyType.Expiration, data: 12000 }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 46, 224]));
    });

    it('should encode policy correctly (Owner)', () => {
      const policies: Policy[] = [{ type: PolicyType.Owner, data: bn(12345) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 48, 57]));
    });

    it('should encode policy correctly (Tip + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(19) },
        { type: PolicyType.MaxFee, data: bn(76) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 76])
      );
    });

    it('should encode policy correctly (WitnessLimit + Maturity)', () => {
      const policies: Policy[] = [
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26])
      );
    });

    it('should encode policy correctly (WitnessLimit + Expiration)', () => {
      const policies: Policy[] = [
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Expiration, data: 3000000 },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 45, 198, 192])
      );
    });

    it('should encode policy correctly (WitnessLimit + Maturity + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 199,
        ])
      );
    });

    it('should encode policy correctly (Tip + WitnessLimit + Maturity + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199,
        ])
      );
    });

    it('should encode policy correctly (Tip + WitnessLimit + Maturity + MaxFee + Expiration)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Expiration, data: 2000000 },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199, 0, 0, 0, 0, 0, 30, 132, 128,
        ])
      );
    });

    it('should encode policy correctly (Tip + Owner)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(50) },
        { type: PolicyType.Owner, data: bn(999) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 3, 231])
      );
    });

    it('should encode policy correctly (Owner + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Owner, data: bn(777) },
        { type: PolicyType.MaxFee, data: bn(150) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 150, 0, 0, 0, 0, 0, 0, 3, 9])
      );
    });

    it('should encode policy correctly (Tip + WitnessLimit + Maturity + MaxFee + Expiration + Owner)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Expiration, data: 2000000 },
        { type: PolicyType.Owner, data: bn(12345) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199, 0, 0, 0, 0, 0, 30, 132, 128, 0, 0, 0, 0, 0, 0, 48, 57,
        ])
      );
    });

    it('should ensure unsorted policies array will not reflect in error when encoding', () => {
      const policies: Policy[] = [
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Owner, data: bn(555) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199, 0, 0, 0, 0, 0, 0, 2, 43,
        ])
      );
    });

    it('should throw an error when a duplicated policy is found', async () => {
      const policies: Policy[] = [
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.WitnessLimit, data: bn(87) },
      ];

      await expectToThrowFuelError(
        () => new PoliciesCoder().encode(policies),
        new FuelError(
          ErrorCode.DUPLICATED_POLICY,
          `Duplicate policy type found: ${PolicyType.MaxFee}`
        )
      );
    });
  });

  describe('decode', () => {
    it('should decode tip', () => {
      // tip is 100
      const byteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const data = Uint8Array.from(byteArr);

      // bitfield is 1 representing tip
      const policyTypes = PolicyType.Tip;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Tip,
        data: bn(byteArr),
      });
    });

    it('should decode witnessLimit', () => {
      // witnessLimit is 3000
      const byteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const data = Uint8Array.from(byteArr);

      // bitfield is 2 representing witnessLimit
      const policyTypes = PolicyType.WitnessLimit;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(byteArr),
      });
    });

    it('should decode maturity', () => {
      // maturity is 25
      const byteArr = [0, 0, 0, 0, 0, 0, 0, 25];
      const data = Uint8Array.from(byteArr);

      // bitfield is 4 representing maturity
      const policyTypes = PolicyType.Maturity;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Maturity,
        data: bn(byteArr).toNumber(),
      });
    });

    it('should decode maxFee', () => {
      // maxFee is 500
      const byteArr = [0, 0, 0, 0, 0, 0, 1, 244];
      const data = Uint8Array.from(byteArr);

      // bitfield is 8 representing maxFee
      const policyTypes = PolicyType.MaxFee;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(byteArr),
      });
    });

    it('should decode expiration', () => {
      // maxFee is 3000000
      const byteArr = [0, 0, 0, 0, 0, 45, 198, 192];
      const data = Uint8Array.from(byteArr);

      // bitfield is 8 representing maxFee
      const policyTypes = PolicyType.Expiration;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Expiration,
        data: bn(byteArr).toNumber(),
      });
    });

    it('should decode owner', () => {
      // owner is 98765
      const byteArr = [0, 0, 0, 0, 0, 1, 128, 45];
      const data = Uint8Array.from(byteArr);

      // bitfield is 32 representing owner
      const policyTypes = PolicyType.Owner;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Owner,
        data: bn(byteArr),
      });
    });

    it('should decode tip and witnessLimit', () => {
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];

      const data = Uint8Array.from([...tipByteArr, ...witLimitByteArr]);

      // bitfield is 3 representing gasLimit + witnessLimit
      const policyTypes = PolicyType.Tip + PolicyType.WitnessLimit;
      expect(policyTypes).toBe(3);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Tip,
        data: bn(tipByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
    });

    it('should decode witnessLimit and maturity', () => {
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maturityByteArr = [0, 0, 0, 0, 0, 0, 0, 25];

      const data = Uint8Array.from([...witLimitByteArr, ...maturityByteArr]);

      // bitfield is 6 representing witnessLimit + maturity
      const policyTypes = PolicyType.WitnessLimit + PolicyType.Maturity;
      expect(policyTypes).toBe(6);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.Maturity,
        data: bn(maturityByteArr).toNumber(),
      });
    });

    it('should decode witnessLimit and maxFee', () => {
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];

      const data = Uint8Array.from([...witLimitByteArr, ...maxFeeByteArr]);

      // bitfield is 10 representing witnessLimit + maxFee
      const policyTypes = PolicyType.WitnessLimit + PolicyType.MaxFee;
      expect(policyTypes).toBe(10);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(maxFeeByteArr),
      });
    });

    it('should decode tip, maxFee, and expiration', () => {
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];
      const expirationByteArr = [0, 0, 0, 0, 0, 0, 90, 244];

      const data = Uint8Array.from([...witLimitByteArr, ...maxFeeByteArr, ...expirationByteArr]);

      // bitfield is 10 representing witnessLimit + maxFee
      const policyTypes = PolicyType.WitnessLimit + PolicyType.MaxFee + PolicyType.Expiration;
      expect(policyTypes).toBe(26);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(3);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(maxFeeByteArr),
      });
      expect(policies[2]).toStrictEqual({
        type: PolicyType.Expiration,
        data: bn(expirationByteArr).toNumber(),
      });
    });

    it('should decode tip and owner', () => {
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const ownerByteArr = [0, 0, 0, 0, 0, 0, 3, 231];

      const data = Uint8Array.from([...tipByteArr, ...ownerByteArr]);

      // bitfield is 33 representing tip + owner
      const policyTypes = PolicyType.Tip + PolicyType.Owner;
      expect(policyTypes).toBe(33);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Tip,
        data: bn(tipByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.Owner,
        data: bn(ownerByteArr),
      });
    });

    it('should decode owner and maxFee', () => {
      const ownerByteArr = [0, 0, 0, 0, 0, 0, 3, 9];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];

      const data = Uint8Array.from([...maxFeeByteArr, ...ownerByteArr]);

      // bitfield is 40 representing maxFee + owner
      const policyTypes = PolicyType.MaxFee + PolicyType.Owner;
      expect(policyTypes).toBe(40);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(maxFeeByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.Owner,
        data: bn(ownerByteArr),
      });
    });

    it('should decode when all policy types are present', () => {
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maturityByteArr = [0, 0, 0, 0, 0, 0, 0, 25];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];
      const expirationByteArr = [0, 0, 0, 0, 0, 0, 100, 244];
      const ownerByteArr = [0, 0, 0, 0, 0, 0, 48, 57];

      const data = Uint8Array.from([
        ...tipByteArr,
        ...witLimitByteArr,
        ...maturityByteArr,
        ...maxFeeByteArr,
        ...expirationByteArr,
        ...ownerByteArr,
      ]);

      // bitfield is 63 representing all policy types
      const policyTypes =
        PolicyType.Tip +
        PolicyType.WitnessLimit +
        PolicyType.Maturity +
        PolicyType.MaxFee +
        PolicyType.Expiration +
        PolicyType.Owner;

      expect(policyTypes).toBe(63);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(6);
      expect(policies).toStrictEqual([
        {
          type: PolicyType.Tip,
          data: bn(tipByteArr),
        },
        {
          type: PolicyType.WitnessLimit,
          data: bn(witLimitByteArr),
        },
        {
          type: PolicyType.Maturity,
          data: bn(maturityByteArr).toNumber(),
        },
        {
          type: PolicyType.MaxFee,
          data: bn(maxFeeByteArr),
        },
        {
          type: PolicyType.Expiration,
          data: bn(expirationByteArr).toNumber(),
        },
        {
          type: PolicyType.Owner,
          data: bn(ownerByteArr),
        },
      ]);
    });

    it('should handle unknown policy type 64 and 128', () => {
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const unknownPolicyByteArr = [0, 0, 0, 0, 0, 0, 0, 200];
      const unknown2PolicyByteArr = [0, 0, 0, 0, 0, 0, 1, 200];
      const data = Uint8Array.from([
        ...tipByteArr,
        ...unknownPolicyByteArr,
        ...unknown2PolicyByteArr,
      ]);

      // bitfield is 64 representing all policy types + unknown policy type 64 + unknown policy type 128
      const policyTypes = PolicyType.Tip + 64 + 128;
      expect(policyTypes).toBe(193);

      const [policies, offset] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(offset).toBe(24);
    });
  });
});
