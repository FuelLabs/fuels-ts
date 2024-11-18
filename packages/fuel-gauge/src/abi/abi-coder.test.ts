import { bn, Contract, ContractFactory, FuelError, getRandomB256, Interface } from 'fuels';
import type { AssetId, BigNumberish, BytesLike, EvmAddress, RawSlice, WalletUnlocked } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { AbiContractFactory } from '../../test/typegen';
import type { AbiContract } from '../../test/typegen';
import {
  EnumWithNativeInput,
  EnumWithNativeOutput,
  ExternalEnumInput,
} from '../../test/typegen/contracts/AbiContract';
import type {
  EnumWithBuiltinTypeInput,
  EnumWithBuiltinTypeOutput,
  EnumWithVectorInput,
  EnumWithVectorOutput,
  IdentityInput,
  IdentityOutput,
  StructDoubleGenericInput,
  StructSimpleInput,
  StructSimpleOutput,
  StructWithGenericArrayInput,
  StructWithMultiOptionInput,
  StructWithMultiOptionOutput,
  StructCInput,
  StructWithNestedArrayInput,
  StructWithNestedTupleInput,
  StructSingleGenericInput,
  StructWithImplicitGenericsInput,
  AssetIdInput,
  StructWithEnumArrayInput,
  StructWithEnumArrayOutput,
  StructWithSingleOptionOutput,
  StructWithSingleOptionInput,
} from '../../test/typegen/contracts/AbiContract';
import type { Option, Result, Vec } from '../../test/typegen/contracts/common';

import { InterfaceAdapter } from './adapter';
import {
  U16_MAX,
  U16_MIN,
  U256_MAX,
  U256_MIN,
  U32_MAX,
  U32_MIN,
  U64_MAX,
  U64_MIN,
  U8_MAX,
  U8_MIN,
} from './constants';
import { toEqualBn } from './vitest.matcher';

expect.extend({ toEqualBn });

/**
 * @group node
 */
describe('AbiCoder', () => {
  let contract: AbiContract;
  let wallet: WalletUnlocked;
  let cleanup: () => void;

  beforeAll(async () => {
    const launched = await launchTestNode({
      contractsConfigs: [{ factory: AbiContractFactory }],
    });

    const { contracts, wallets } = launched;

    wallet = wallets[0];
    const interfaceAdapter = new InterfaceAdapter(contracts[0].interface.jsonAbi);
    contract = new Contract(contracts[0].id, interfaceAdapter, wallet) as AbiContract;

    vi.spyOn(Interface.prototype, 'decodeLog').mockImplementation(
      (data: BytesLike, logId: string) => interfaceAdapter.decodeLog(data, logId)
    );

    cleanup = launched.cleanup;
  });

  afterAll(() => {
    cleanup();
  });

  describe('configurables', () => {
    it('should encode/decode just fine', async () => {
      const EXPECTED = {
        U8_VALUE: 10,
        BOOL_VALUE: true,
        B256_VALUE: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
        OPTION_U8_VALUE: undefined,
        GENERIC_STRUCT_VALUE: {
          a: { a: 4, b: 257 },
          b: 57000,
        },
      };

      const { waitForResult } = await contract.functions.configurables().call();

      const { value } = await waitForResult();
      expect(value).toEqual(EXPECTED);
    });

    it('should set configurables', async () => {
      const NEW_CONFIGURABLES = {
        U8_VALUE: 123,
        BOOL_VALUE: false,
        B256_VALUE: getRandomB256(),
        OPTION_U8_VALUE: 11,
        GENERIC_STRUCT_VALUE: {
          a: { a: 234, b: 12 },
          b: 3525,
        },
      };

      const factory = new ContractFactory(AbiContractFactory.bytecode, contract.interface, wallet);
      const { waitForResult: waitForDeploy } = await factory.deploy({
        configurableConstants: NEW_CONFIGURABLES,
      });

      const { contract: contractWithConfigurables } = await waitForDeploy();
      const { waitForResult } = await contractWithConfigurables.functions.configurables().call();
      const { value } = await waitForResult();
      expect(value).toEqual(NEW_CONFIGURABLES);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('configurables');

      expect(fn.name).toBe('configurables');
      expect(fn.signature).toEqual('configurables()');
      expect(fn.selector).toEqual('0x00000000fdaf4480');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 13, 99, 111, 110, 102, 105, 103, 117, 114, 97, 98, 108, 101, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_u8', () => {
    it('should encode/decode just fine', async () => {
      const input = 8;
      const expected = 255;

      const fn = contract.functions.types_u8(input);

      const { waitForResult } = await fn.call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_u8');

      expect(fn.name).toBe('types_u8');
      expect(fn.signature).toEqual('types_u8(u8)');
      expect(fn.selector).toEqual('0x00000000469feadd');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8, 116, 121, 112, 101, 115, 95, 117, 56])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U8_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u8(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U8_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u8(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8, too many bytes.')
      );
    });
  });

  describe('types_u16', () => {
    it('should encode/decode just fine', async () => {
      const input = 16;
      const expected = 65535;

      const { waitForResult } = await contract.functions.types_u16(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_u16');

      expect(fn.name).toBe('types_u16');
      expect(fn.signature).toEqual('types_u16(u16)');
      expect(fn.selector).toEqual('0x0000000014b491ca');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 9, 116, 121, 112, 101, 115, 95, 117, 49, 54])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U16_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u16(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U16_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u16(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16, too many bytes.')
      );
    });
  });

  describe('types_u32', () => {
    it('should encode/decode just fine', async () => {
      const input = 32;
      const expected = 4294967295;

      const { waitForResult } = await contract.functions.types_u32(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_u32');

      expect(fn.name).toBe('types_u32');
      expect(fn.signature).toEqual('types_u32(u32)');
      expect(fn.selector).toEqual('0x0000000060564dd0');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 9, 116, 121, 112, 101, 115, 95, 117, 51, 50])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U32_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u32(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U32_MAX + 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u32(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32, too many bytes.')
      );
    });
  });

  describe('types_u64', () => {
    it('should encode/decode just fine', async () => {
      const input = 64;
      const expected = '4294967295000';

      const { waitForResult } = await contract.functions.types_u64(input).call();

      const {
        value,
        logs: [log],
      } = await waitForResult();
      expect(value.toString()).toBe(expected);
      expect(log.toString()).toBe(expected);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_u64');

      expect(fn.name).toBe('types_u64');
      expect(fn.signature).toEqual('types_u64(u64)');
      expect(fn.selector).toEqual('0x000000005366a006');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 9, 116, 121, 112, 101, 115, 95, 117, 54, 52])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U64_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u64(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U64_MAX.add(1);

      await expectToThrowFuelError(
        () => contract.functions.types_u64(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.')
      );
    });
  });

  describe('types_u256', () => {
    it('should encode/decode just fine', async () => {
      const input = 256;
      const expected = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

      const { waitForResult } = await contract.functions.types_u256(input).call();

      const {
        value,
        logs: [log],
      } = await waitForResult();
      expect(value.toHex()).toStrictEqual(expected);
      expect(log.toHex()).toStrictEqual(expected);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_u256');

      expect(fn.name).toBe('types_u256');
      expect(fn.signature).toEqual('types_u256(u256)');
      expect(fn.selector).toEqual('0x00000000385e74cd');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 117, 50, 53, 54])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [min - 1]', async () => {
      const input = U256_MIN - 1;

      await expectToThrowFuelError(
        () => contract.functions.types_u256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256.')
      );
    });

    it('should fail to encode/decode [max + 1]', async () => {
      const input = U256_MAX.add(1);

      await expectToThrowFuelError(
        () => contract.functions.types_u256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256.')
      );
    });
  });

  describe('types_bool', () => {
    it('should encode/decode just fine', async () => {
      const input = false;
      const expected = true;

      const { waitForResult } = await contract.functions.types_bool(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_bool');

      expect(fn.name).toBe('types_bool');
      expect(fn.signature).toEqual('types_bool(bool)');
      expect(fn.selector).toEqual('0x0000000040b71e0f');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 98, 111, 111, 108])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [number]', async () => {
      const input = 2;

      await expectToThrowFuelError(
        () => contract.functions.types_bool(input as unknown as boolean).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.')
      );
    });

    it('should fail to encode/decode [string]', async () => {
      const input = new Uint8Array([2]);

      await expectToThrowFuelError(
        () => contract.functions.types_bool(input as unknown as boolean).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.')
      );
    });
  });

  describe('types_b256', () => {
    it('should encode/decode just fine', async () => {
      const input = `0x${'a'.repeat(64)}`;
      const expected = `0x${'0'.repeat(64)}`;

      const { waitForResult } = await contract.functions.types_b256(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_b256');

      expect(fn.name).toBe('types_b256');
      expect(fn.signature).toEqual('types_b256(b256)');
      expect(fn.selector).toEqual('0x00000000124e3f18');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 98, 50, 53, 54])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [too short]', async () => {
      const input = `0x${'a'.repeat(63)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });

    it('should fail to encode/decode [too long]', async () => {
      const input = `0x${'a'.repeat(65)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });

    it('should fail to encode/decode [not a hex]', async () => {
      const input = 'not a hex value';

      await expectToThrowFuelError(
        () => contract.functions.types_b256(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.')
      );
    });
  });

  describe('types_b512', () => {
    it('should encode/decode just fine', async () => {
      const input = `0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d`;
      const expected = `0xad0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c54ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d`;

      const { waitForResult } = await contract.functions.types_b512(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_b512');

      expect(fn.name).toBe('types_b512');
      expect(fn.signature).toEqual('types_b512(s(a[b256;2]))');
      expect(fn.selector).toEqual('0x00000000e628dc42');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 98, 53, 49, 50])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [too short]', async () => {
      const input = `0x${'a'.repeat(127)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });

    it('should fail to encode/decode [too long]', async () => {
      const input = `0x${'a'.repeat(129)}`;

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });

    it('should fail to encode/decode [not a hex]', async () => {
      const input = 'not a hex value';

      await expectToThrowFuelError(
        () => contract.functions.types_b512(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.')
      );
    });
  });

  describe('types_bytes', () => {
    it('should encode/decode just fine [Uint8Array]', async () => {
      const input = Uint8Array.from([1, 2, 3]);
      const expected = Uint8Array.from([3, 2, 1]);
      const { waitForResult } = await contract.functions.types_bytes(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should encode/decode just fine [number]', async () => {
      const input = [1, 2, 3];
      const expected = Uint8Array.from([3, 2, 1]);
      const { waitForResult } = await contract.functions.types_bytes(input).call();

      const {
        value,
        logs: [log],
      } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(log).toStrictEqual(expected);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_bytes');

      expect(fn.name).toBe('types_bytes');
      expect(fn.signature).toEqual('types_bytes(s(s(rawptr,u64),u64))');
      expect(fn.selector).toEqual('0x00000000647316a2');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 11, 116, 121, 112, 101, 115, 95, 98, 121, 116, 101, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Strings
   */
  describe('types_str', () => {
    it('should encode/decode just fine [length = 5]', async () => {
      const input = 'Input';
      const expected = 'Hello';

      const { waitForResult } = await contract.functions.types_str(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_str');

      expect(fn.name).toBe('types_str');
      expect(fn.signature).toEqual('types_str(str[5])');
      expect(fn.selector).toEqual('0x00000000476ddcb5');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 9, 116, 121, 112, 101, 115, 95, 115, 116, 114])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [length - 1]', async () => {
      const input = 'a'.repeat(4);

      await expectToThrowFuelError(
        () => contract.functions.types_str(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Value length mismatch during encode.')
      );
    });

    it('should fail to encode/decode [length + 1]', async () => {
      const input = 'a'.repeat(6);

      await expectToThrowFuelError(
        () => contract.functions.types_str(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Value length mismatch during encode.')
      );
    });
  });

  describe('types_str_slice', () => {
    it('should encode/decode just fine', async () => {
      const input = 'Input';
      const expected = 'Output';

      const { waitForResult } = await contract.functions.types_str_slice(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_str_slice');

      expect(fn.name).toBe('types_str_slice');
      expect(fn.signature).toEqual('types_str_slice(str)');
      expect(fn.selector).toEqual('0x0000000010afc4e3');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 15, 116, 121, 112, 101, 115, 95, 115, 116, 114, 95, 115, 108, 105,
          99, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_std_string', () => {
    it('should encode/decode just fine', async () => {
      const input = 'Input';
      const expected = 'Output';

      const { waitForResult } = await contract.functions.types_std_string(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_std_string');

      expect(fn.name).toBe('types_std_string');
      expect(fn.signature).toEqual('types_std_string(s(s(s(rawptr,u64),u64)))');
      expect(fn.selector).toEqual('0x0000000088a7be99');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 16, 116, 121, 112, 101, 115, 95, 115, 116, 100, 95, 115, 116, 114,
          105, 110, 103,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_raw_slice', () => {
    it('should encode/decode just fine', async () => {
      const input: RawSlice = [1, 2, 3];
      const expected: RawSlice = [4, 3, 2, 1];

      const { waitForResult } = await contract.functions.types_raw_slice(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_raw_slice');

      expect(fn.name).toBe('types_raw_slice');
      expect(fn.signature).toEqual('types_raw_slice(rawslice)');
      expect(fn.selector).toEqual('0x00000000e009cdab');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 15, 116, 121, 112, 101, 115, 95, 114, 97, 119, 95, 115, 108, 105, 99,
          101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Arrays
   */
  describe('types_array', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3, 4] as [number, number, number, number];
      const expected = [4, 3, 2, 1] as [number, number, number, number];

      const { waitForResult } = await contract.functions.types_array(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_array');

      expect(fn.name).toBe('types_array');
      expect(fn.signature).toEqual('types_array(a[u8;4])');
      expect(fn.selector).toEqual('0x0000000006fd70c6');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 11, 116, 121, 112, 101, 115, 95, 97, 114, 114, 97, 121,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });

    it('should fail to encode/decode [empty]', async () => {
      const input = [] as unknown as [number, number, number, number];

      await expectToThrowFuelError(
        () => contract.functions.types_array(input).call(),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });

  describe('types_array_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = [
        { a: true, b: 10 },
        { a: true, b: 10 },
        { a: true, b: 10 },
      ] as [{ a: boolean; b: number }, { a: boolean; b: number }, { a: boolean; b: number }];
      const expected = [
        { a: false, b: 30 },
        { a: false, b: 30 },
        { a: false, b: 30 },
      ];

      const { waitForResult } = await contract.functions.types_array_struct(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_array_struct');

      expect(fn.name).toBe('types_array_struct');
      expect(fn.signature).toEqual('types_array_struct(a[s(bool,u32);3])');
      expect(fn.selector).toEqual('0x000000000e99463a');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 18, 116, 121, 112, 101, 115, 95, 97, 114, 114, 97, 121, 95, 115, 116,
          114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_array_with_generic_struct', () => {
    it('should encode/decode just fine', async () => {
      const INPUT_STRUCT = {
        a: {
          a: 10,
        },
        b: 'A',
      };
      const input = [INPUT_STRUCT, INPUT_STRUCT] as [
        StructDoubleGenericInput<StructSingleGenericInput<BigNumberish>, string>,
        StructDoubleGenericInput<StructSingleGenericInput<BigNumberish>, string>,
      ];

      const EXPECTED_STRUCT = {
        a: {
          // @ts-expect-error: Custom matcher 'toEqualBn'
          a: expect.toEqualBn(20),
        },
        b: 'B',
      };
      const expected = [EXPECTED_STRUCT, EXPECTED_STRUCT];

      const { waitForResult } = await contract.functions
        .types_array_with_generic_struct(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toEqual(expected);
      expect(logs).toEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_array_with_generic_struct');

      expect(fn.name).toBe('types_array_with_generic_struct');
      expect(fn.signature).toEqual(
        'types_array_with_generic_struct(a[s<s<u64>(u64),str[1]>(s<u64>(u64),str[1]);2])'
      );
      expect(fn.selector).toEqual('0x0000000026db0b1a');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 31, 116, 121, 112, 101, 115, 95, 97, 114, 114, 97, 121, 95, 119, 105,
          116, 104, 95, 103, 101, 110, 101, 114, 105, 99, 95, 115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_array_with_vector', () => {
    it('should encode/decode just fine', async () => {
      const input = [[1, 2, 3]] as [Vec<BigNumberish>];
      const expected = [[3, 2, 1]];

      const { waitForResult } = await contract.functions.types_array_with_vector(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_array_with_vector');

      expect(fn.name).toBe('types_array_with_vector');
      expect(fn.signature).toEqual('types_array_with_vector(a[s<u32>(s<u32>(rawptr,u64),u64);1])');
      expect(fn.selector).toEqual('0x00000000f433e5fd');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 116, 121, 112, 101, 115, 95, 97, 114, 114, 97, 121, 95, 119, 105,
          116, 104, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Structs
   */
  describe('types_struct_simple', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: true, b: 10 };
      const expected = { a: false, b: 30 };

      const { waitForResult } = await contract.functions.types_struct_simple(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_simple');

      expect(fn.name).toBe('types_struct_simple');
      expect(fn.signature).toEqual('types_struct_simple(s(bool,u32))');
      expect(fn.selector).toEqual('0x000000005497d4b2');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          115, 105, 109, 112, 108, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_generic', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10 };
      const expected = { a: 20 };

      const { waitForResult } = await contract.functions.types_struct_generic(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_generic');

      expect(fn.name).toBe('types_struct_generic');
      expect(fn.signature).toEqual('types_struct_generic(s<u8>(u8))');
      expect(fn.selector).toEqual('0x000000007b2086ec');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 20, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          103, 101, 110, 101, 114, 105, 99,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input: StructSingleGenericInput<[boolean, BigNumberish]> = { a: [true, 10] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = { a: [false, expect.toEqualBn(20)] };

      const { waitForResult } = await contract.functions.types_struct_with_tuple(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_tuple');

      expect(fn.name).toBe('types_struct_with_tuple');
      expect(fn.signature).toEqual('types_struct_with_tuple(s<(bool,u64)>((bool,u64)))');
      expect(fn.selector).toEqual('0x00000000adeb6dfa');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 116, 117, 112, 108, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_double_generic', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10, b: { a: 10 } };
      const expected = { a: 20, b: { b: 10 } };

      const { waitForResult } = await contract.functions.types_struct_double_generic(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_double_generic');

      expect(fn.name).toBe('types_struct_double_generic');
      expect(fn.signature).toEqual('types_struct_double_generic(s<u8,u16>(u8,e<u8,u16>(u8,u16)))');
      expect(fn.selector).toEqual('0x0000000096e85141');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 27, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          100, 111, 117, 98, 108, 101, 95, 103, 101, 110, 101, 114, 105, 99,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_external', () => {
    it('should encode/decode just fine', async () => {
      const input = { value: 10 };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = { value: expect.toEqualBn(20) };

      const { waitForResult } = await contract.functions.types_struct_external(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_external');

      expect(fn.name).toBe('types_struct_external');
      expect(fn.signature).toEqual('types_struct_external(s(u64))');
      expect(fn.selector).toEqual('0x00000000080aff53');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 21, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          101, 120, 116, 101, 114, 110, 97, 108,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_implicit_generics', () => {
    it('should encode/decode just fine', async () => {
      const INPUT_B256 = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const INPUT: StructWithImplicitGenericsInput<string, number> = {
        a: [INPUT_B256, INPUT_B256, INPUT_B256],
        b: [INPUT_B256, 10],
      };

      const EXPECTED_B256 = '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

      const EXPECTED: StructWithImplicitGenericsInput<string, number> = {
        a: [EXPECTED_B256, EXPECTED_B256, EXPECTED_B256],
        b: [EXPECTED_B256, 25],
      };

      const { waitForResult } = await contract.functions
        .types_struct_with_implicit_generics(INPUT)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(EXPECTED);
      expect(logs).toStrictEqual([EXPECTED]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_implicit_generics');

      expect(fn.name).toBe('types_struct_with_implicit_generics');
      expect(fn.signature).toEqual(
        'types_struct_with_implicit_generics(s<b256,u8>(a[b256;3],<b256,u8>(b256,u8)))'
      );
      expect(fn.selector).toEqual('0x0000000099d41855');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 35, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 105, 109, 112, 108, 105, 99, 105, 116, 95, 103, 101, 110, 101,
          114, 105, 99, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_array', () => {
    /**
     * @TODO This is causing a generic to be left into the parsed format, ask Nedim about this.
     */
    it.skip('should encode/decode just fine', async () => {
      // Inputs
      const inputB256: string =
        '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const inputStruct: StructDoubleGenericInput<string, number> = {
        a: inputB256,
        b: 10,
      };
      const input: StructWithGenericArrayInput<string> = {
        a: [inputStruct, inputStruct, inputStruct],
      };

      // Expected
      const expectedB256: string =
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
      const expectedStruct: StructDoubleGenericInput<string, number> = {
        a: expectedB256,
        b: 20,
      };
      const expected: StructWithGenericArrayInput<string> = {
        a: [expectedStruct, expectedStruct, expectedStruct],
      };

      const { waitForResult } = await contract.functions.types_struct_with_array(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_array');

      expect(fn.name).toBe('types_struct_with_array');
      expect(fn.signature).toEqual('types_struct_with_array(s<b256>(a[s<b256,u8>(b256,u8);3]))');
      expect(fn.selector).toEqual('0x00000000b2b64104');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 97, 114, 114, 97, 121,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_vector', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 1, b: [1, 2, 3] };
      const expected = { a: 3, b: [3, 2, 1] };

      const { waitForResult } = await contract.functions.types_struct_with_vector(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_vector');

      expect(fn.name).toBe('types_struct_with_vector');
      expect(fn.signature).toEqual('types_struct_with_vector(s(u8,s<u8>(s<u8>(rawptr,u64),u64)))');
      expect(fn.selector).toEqual('0x000000007d0fb2b3');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 24, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * TODO: Fix this test
   *
   * Currently the expected value is not correct
   */
  describe('types_struct_with_array_of_enums', () => {
    it.todo('should encode/decode just fine', async () => {
      const input: StructWithEnumArrayInput = {
        a: [EnumWithNativeInput.Checked, EnumWithNativeInput.Checked, EnumWithNativeInput.Checked],
      };
      const expected: StructWithEnumArrayOutput = {
        a: [
          EnumWithNativeOutput.Pending,
          EnumWithNativeOutput.Pending,
          EnumWithNativeOutput.Pending,
        ],
      };

      const { waitForResult } = await contract.functions
        .types_struct_with_array_of_enums(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_array_of_enums');

      expect(fn.name).toBe('types_struct_with_array_of_enums');
      expect(fn.signature).toEqual('types_struct_with_array_of_enums(s(a[e((),());3]))');
      expect(fn.selector).toEqual('0x0000000096a7800d');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 32, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 97, 114, 114, 97, 121, 95, 111, 102, 95, 101, 110, 117, 109, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_nested_array', () => {
    it('should encode/decode just fine', async () => {
      const INPUT_STRUCT = { a: { a: 10 }, b: 'A' };
      const input: StructWithNestedArrayInput = { a: [INPUT_STRUCT, INPUT_STRUCT] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const EXPECTED_STRUCT = { a: { a: expect.toEqualBn(20) }, b: 'B' };
      const EXPECTED = { a: [EXPECTED_STRUCT, EXPECTED_STRUCT] };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_array(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(EXPECTED);
      expect(logs).toStrictEqual([EXPECTED]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_nested_array');

      expect(fn.name).toBe('types_struct_with_nested_array');
      expect(fn.signature).toEqual(
        'types_struct_with_nested_array(s(a[s<s<u64>(u64),str[1]>(s<u64>(u64),str[1]);2]))'
      );
      expect(fn.selector).toEqual('0x00000000199261fa');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 30, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 110, 101, 115, 116, 101, 100, 95, 97, 114, 114, 97, 121,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_nested_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input: StructWithNestedTupleInput = { a: [10, { a: { a: 20 } }, 'ABC'] };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = { a: [30, { a: { a: expect.toEqualBn(40) } }, 'CBA'] };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_tuple(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_nested_tuple');

      expect(fn.name).toBe('types_struct_with_nested_tuple');
      expect(fn.signature).toEqual(
        'types_struct_with_nested_tuple(s((u8,s<s<u64>(u64)>(s<u64>(u64)),str[3])))'
      );
      expect(fn.selector).toEqual('0x000000007fb152f7');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 30, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 110, 101, 115, 116, 101, 100, 95, 116, 117, 112, 108, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_nested_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: { a: { a: 10 }, b: 20 } };
      const expected = { a: { a: { a: 30 }, b: 40 } };

      const { waitForResult } = await contract.functions
        .types_struct_with_nested_struct(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_nested_struct');

      expect(fn.name).toBe('types_struct_with_nested_struct');
      expect(fn.signature).toEqual(
        'types_struct_with_nested_struct(s(s<s<u8>(u8),u16>(s<u8>(u8),u16)))'
      );
      expect(fn.selector).toEqual('0x00000000511602c7');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 31, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 110, 101, 115, 116, 101, 100, 95, 115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_multiple_struct_params', () => {
    it.todo('should encode/decode just fine', async () => {
      const STRUCT_A = { propA1: 10 };
      const STRUCT_B = { propB1: STRUCT_A, propB2: 20 };

      const INPUT_X = STRUCT_A;
      const INPUT_Y = STRUCT_B;
      const INPUT_Z: StructCInput = {
        propC1: STRUCT_A,
        propC2: [STRUCT_B],
        propC3: {
          propD1: [{ propE1: STRUCT_A, propE2: STRUCT_B, propE3: 30 }],
          propD2: 40,
          propD3: { propF1: 50, propF2: 'A' },
        },
      };

      const { waitForResult } = await contract.functions
        .types_struct_with_multiple_struct_params(INPUT_X, INPUT_Y, INPUT_Z)
        .call();

      const { value, logs } = await waitForResult();
      // expect(value).toStrictEqual(expected);
      // expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_multiple_struct_params');

      expect(fn.name).toBe('types_struct_with_multiple_struct_params');
      expect(fn.signature).toEqual(
        'types_struct_with_multiple_struct_params(s(u8),s(s(u8),u16),s(s(u8),s<s(s(u8),u16)>(s<s(s(u8),u16)>(rawptr,u64),u64),s<u8,u8,s<str[1]>(u64,str[1])>(s<s<u8>(s(u8),s(s(u8),u16),u8)>(s<s<u8>(s(u8),s(s(u8),u16),u8)>(rawptr,u64),u64),u8,s<str[1]>(u64,str[1]))))'
      );
      expect(fn.selector).toEqual('0x00000000c61458a4');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 40, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 109, 117, 108, 116, 105, 112, 108, 101, 95, 115, 116, 114, 117,
          99, 116, 95, 112, 97, 114, 97, 109, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_complex_nested_struct', () => {
    it.todo('should encode/decode just fine');

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_complex_nested_struct');

      expect(fn.name).toBe('types_struct_with_complex_nested_struct');
      expect(fn.signature).toEqual(
        'types_struct_with_complex_nested_struct(s<u32,u32,s<s<s(u8)>(s<s(u8)>(rawptr,u64),u64)>(u64,s<s(u8)>(s<s(u8)>(rawptr,u64),u64))>(s<s<u32>(s(u8),s(s(u8),u16),u32)>(s<s<u32>(s(u8),s(s(u8),u16),u32)>(rawptr,u64),u64),u32,s<s<s(u8)>(s<s(u8)>(rawptr,u64),u64)>(u64,s<s(u8)>(s<s(u8)>(rawptr,u64),u64))))'
      );
      expect(fn.selector).toEqual('0x000000003bb27fd2');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 39, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 99, 111, 109, 112, 108, 101, 120, 95, 110, 101, 115, 116, 101,
          100, 95, 115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_struct_with_single_option', () => {
    it('should encode/decode just fine', async () => {
      const input: StructWithSingleOptionInput = {
        a: {
          a: [1, undefined, 2, undefined, 3],
        },
      };
      const expected: StructWithSingleOptionOutput = {
        a: undefined,
      };

      const { waitForResult } = await contract.functions
        .types_struct_with_single_option(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_struct_with_single_option');

      expect(fn.name).toBe('types_struct_with_single_option');
      expect(fn.signature).toEqual(
        'types_struct_with_single_option(s(e<s(a[e<u8>((),u8);5])>((),s(a[e<u8>((),u8);5]))))'
      );
      expect(fn.selector).toEqual('0x000000003ec1dd13');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 31, 116, 121, 112, 101, 115, 95, 115, 116, 114, 117, 99, 116, 95,
          119, 105, 116, 104, 95, 115, 105, 110, 103, 108, 101, 95, 111, 112, 116, 105, 111, 110,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Tuples
   */
  describe('types_tuple', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3] as [number, number, number];
      const expected = [3, 2, 1] as [number, number, number];

      const { waitForResult } = await contract.functions.types_tuple(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_tuple');

      expect(fn.name).toBe('types_tuple');
      expect(fn.signature).toEqual('types_tuple((u8,u8,u8))');
      expect(fn.selector).toEqual('0x00000000d4afe0f7');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 11, 116, 121, 112, 101, 115, 95, 116, 117, 112, 108, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_tuple_complex', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, { a: { a: 10 } }, 'ABC'] as [
        BigNumberish,
        StructSingleGenericInput<StructSingleGenericInput<BigNumberish>>,
        string,
      ];
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = [3, { a: { a: expect.toEqualBn(30) } }, 'CBA'];

      const { waitForResult } = await contract.functions.types_tuple_complex(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_tuple_complex');

      expect(fn.name).toBe('types_tuple_complex');
      expect(fn.signature).toEqual('types_tuple_complex((u8,s<s<u64>(u64)>(s<u64>(u64)),str[3]))');
      expect(fn.selector).toEqual('0x000000003976bc45');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 116, 121, 112, 101, 115, 95, 116, 117, 112, 108, 101, 95, 99,
          111, 109, 112, 108, 101, 120,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_tuple_with_native_types', () => {
    it('should encode/decode just fine', async () => {
      const A: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const B: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };
      const input = [A, B, true] as [AssetIdInput, AssetIdInput, boolean];
      const expected = [B, A, false];

      const { waitForResult } = await contract.functions
        .types_tuple_with_native_types(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_tuple_with_native_types');

      expect(fn.name).toBe('types_tuple_with_native_types');
      expect(fn.signature).toEqual('types_tuple_with_native_types((s(b256),s(b256),bool))');
      expect(fn.selector).toEqual('0x0000000070139504');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 29, 116, 121, 112, 101, 115, 95, 116, 117, 112, 108, 101, 95, 119,
          105, 116, 104, 95, 110, 97, 116, 105, 118, 101, 95, 116, 121, 112, 101, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_alias_tuple_with_native_types', () => {
    it('should encode/decode just fine', async () => {
      const A: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const B: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };
      const input = [A, B, true] as [AssetIdInput, AssetIdInput, boolean];
      const expected = [B, A, false];

      const { waitForResult } = await contract.functions
        .types_alias_tuple_with_native_types(input)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_alias_tuple_with_native_types');

      expect(fn.name).toBe('types_alias_tuple_with_native_types');
      expect(fn.signature).toEqual('types_alias_tuple_with_native_types((s(b256),s(b256),bool))');
      expect(fn.selector).toEqual('0x00000000f1230bbf');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 35, 116, 121, 112, 101, 115, 95, 97, 108, 105, 97, 115, 95, 116, 117,
          112, 108, 101, 95, 119, 105, 116, 104, 95, 110, 97, 116, 105, 118, 101, 95, 116, 121, 112,
          101, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Enums
   */
  describe('types_enum', () => {
    it('should encode/decode just fine', async () => {
      const input = EnumWithNativeInput.Checked;
      const expected = EnumWithNativeInput.Pending;

      const { waitForResult } = await contract.functions.types_enum(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_enum');

      expect(fn.name).toBe('types_enum');
      expect(fn.signature).toEqual('types_enum(e((),()))');
      expect(fn.selector).toEqual('0x000000003227c41f');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 101, 110, 117, 109])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_enum_with_builtin_type', () => {
    it('should encode/decode just fine', async () => {
      const input: EnumWithBuiltinTypeInput = { a: true };
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected: EnumWithBuiltinTypeOutput = { b: expect.toEqualBn(20) };

      const { waitForResult } = await contract.functions.types_enum_with_builtin_type(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_enum_with_builtin_type');

      expect(fn.name).toBe('types_enum_with_builtin_type');
      expect(fn.signature).toEqual('types_enum_with_builtin_type(e(bool,u64))');
      expect(fn.selector).toEqual('0x000000000d46aae9');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 28, 116, 121, 112, 101, 115, 95, 101, 110, 117, 109, 95, 119, 105,
          116, 104, 95, 98, 117, 105, 108, 116, 105, 110, 95, 116, 121, 112, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_enum_with_vector', () => {
    it('should encode/decode just fine', async () => {
      const input: EnumWithVectorInput = { a: 10 };
      const expected: EnumWithVectorOutput = { b: [1, 2, 3] };

      const { waitForResult } = await contract.functions.types_enum_with_vector(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_enum_with_vector');

      expect(fn.name).toBe('types_enum_with_vector');
      expect(fn.signature).toEqual('types_enum_with_vector(e(u8,s<u8>(s<u8>(rawptr,u64),u64)))');
      expect(fn.selector).toEqual('0x000000002cbc0dda');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 22, 116, 121, 112, 101, 115, 95, 101, 110, 117, 109, 95, 119, 105,
          116, 104, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_generic_enum', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: 10 };
      const expected = { b: 20 };

      const { waitForResult } = await contract.functions.types_generic_enum(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_generic_enum');

      expect(fn.name).toBe('types_generic_enum');
      expect(fn.signature).toEqual('types_generic_enum(e<u8,u16>(u8,u16))');
      expect(fn.selector).toEqual('0x0000000097aaba95');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 18, 116, 121, 112, 101, 115, 95, 103, 101, 110, 101, 114, 105, 99,
          95, 101, 110, 117, 109,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_enum_external', () => {
    it('should encode/decode just fine', async () => {
      const input = ExternalEnumInput.A;
      const expected = ExternalEnumInput.B;

      const { waitForResult } = await contract.functions.types_enum_external(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_enum_external');

      expect(fn.name).toBe('types_enum_external');
      expect(fn.signature).toEqual('types_enum_external(e((),()))');
      expect(fn.selector).toEqual('0x0000000085288d18');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 116, 121, 112, 101, 115, 95, 101, 110, 117, 109, 95, 101, 120,
          116, 101, 114, 110, 97, 108,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_enum_with_structs', () => {
    it('should encode/decode just fine', async () => {
      const input = { a: EnumWithNativeInput.Checked };
      const expected = { b: { a: true, b: 10 } };

      const { waitForResult } = await contract.functions.types_enum_with_structs(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_enum_with_structs');

      expect(fn.name).toBe('types_enum_with_structs');
      expect(fn.signature).toEqual(
        'types_enum_with_structs(e(e((),()),s(bool,u32),s<u64,s(bool,u32)>(u64,s(bool,u32))))'
      );
      expect(fn.selector).toEqual('0x000000005da5a1c9');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 116, 121, 112, 101, 115, 95, 101, 110, 117, 109, 95, 119, 105,
          116, 104, 95, 115, 116, 114, 117, 99, 116, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Vectors
   */
  describe('types_vector_u8', () => {
    it('should encode/decode just fine', async () => {
      const input = [1, 2, 3];
      const expected = [3, 2, 1];

      const { waitForResult } = await contract.functions.types_vector_u8(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_vector_u8');

      expect(fn.name).toBe('types_vector_u8');
      expect(fn.signature).toEqual('types_vector_u8(s<u8>(s<u8>(rawptr,u64),u64))');
      expect(fn.selector).toEqual('0x00000000c6e0e9a2');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 15, 116, 121, 112, 101, 115, 95, 118, 101, 99, 116, 111, 114, 95,
          117, 56,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_vector_boolean', () => {
    it('should encode/decode just fine', async () => {
      const input = [true, false, true, false];
      const expected = [false, true, false, true];

      const { waitForResult } = await contract.functions.types_vector_boolean(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_vector_boolean');

      expect(fn.name).toBe('types_vector_boolean');
      expect(fn.signature).toEqual('types_vector_boolean(s<bool>(s<bool>(rawptr,u64),u64))');
      expect(fn.selector).toEqual('0x0000000056c4f119');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 20, 116, 121, 112, 101, 115, 95, 118, 101, 99, 116, 111, 114, 95, 98,
          111, 111, 108, 101, 97, 110,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_vector_inside_vector', () => {
    it('should encode/decode just fine', async () => {
      const input = [[1, 2, 3]];
      const expected = [
        [3, 2, 1],
        [6, 5, 4],
      ];

      const { waitForResult } = await contract.functions.types_vector_inside_vector(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_vector_inside_vector');

      expect(fn.name).toBe('types_vector_inside_vector');
      expect(fn.signature).toEqual(
        'types_vector_inside_vector(s<s<u32>(s<u32>(rawptr,u64),u64)>(s<s<u32>(s<u32>(rawptr,u64),u64)>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x00000000c40617f1');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 26, 116, 121, 112, 101, 115, 95, 118, 101, 99, 116, 111, 114, 95,
          105, 110, 115, 105, 100, 101, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_vector_with_struct', () => {
    it('should encode/decode just fine', async () => {
      const input = [{ a: true, b: 10 }];
      const expected = [{ a: false, b: 30 }];

      const { waitForResult } = await contract.functions.types_vector_with_struct(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_vector_with_struct');

      expect(fn.name).toBe('types_vector_with_struct');
      expect(fn.signature).toEqual(
        'types_vector_with_struct(s<s(bool,u32)>(s<s(bool,u32)>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x000000006c28b333');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 24, 116, 121, 112, 101, 115, 95, 118, 101, 99, 116, 111, 114, 95,
          119, 105, 116, 104, 95, 115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_vector_option', () => {
    it('should encode/decode just fine', async () => {
      const input: Vec<StructWithMultiOptionInput> = [{ a: [1, 2, 3, 4, 5] }];
      const expected: Vec<StructWithMultiOptionOutput> = [{ a: [5, 4, 3, 2, 1] }];

      const { waitForResult } = await contract.functions.types_vector_option(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_vector_option');

      expect(fn.name).toBe('types_vector_option');
      expect(fn.signature).toEqual(
        'types_vector_option(s<s(a[e<u8>((),u8);5])>(s<s(a[e<u8>((),u8);5])>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x000000007d911a50');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 116, 121, 112, 101, 115, 95, 118, 101, 99, 116, 111, 114, 95,
          111, 112, 116, 105, 111, 110,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Options
   */
  describe('types_option', () => {
    it('should encode/decode just fine', async () => {
      const input: Option<BigNumberish> = 10; // Some
      const expected: Option<BigNumberish> = undefined; // None

      const { waitForResult } = await contract.functions.types_option(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_option');

      expect(fn.name).toBe('types_option');
      expect(fn.signature).toEqual('types_option(e<u8>((),u8))');
      expect(fn.selector).toEqual('0x000000004f547ea4');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 12, 116, 121, 112, 101, 115, 95, 111, 112, 116, 105, 111, 110,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_option_struct', () => {
    it('should encode/decode just fine', async () => {
      const input: Option<StructSimpleInput> = {
        a: true,
        b: 10,
      };
      const expected: Option<StructSimpleOutput> = undefined;

      const { waitForResult } = await contract.functions.types_option_struct(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_option_struct');

      expect(fn.name).toBe('types_option_struct');
      expect(fn.signature).toEqual('types_option_struct(e<s(bool,u32)>((),s(bool,u32)))');
      expect(fn.selector).toEqual('0x000000003d47e5fd');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 116, 121, 112, 101, 115, 95, 111, 112, 116, 105, 111, 110, 95,
          115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Native types
   */
  describe('types_identity_address', () => {
    it('should encode/decode just fine', async () => {
      const input: IdentityInput = {
        Address: { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
      };
      const expected: IdentityOutput = {
        Address: { bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' },
      };

      const { waitForResult } = await contract.functions.types_identity_address(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_identity_address');

      expect(fn.name).toBe('types_identity_address');
      expect(fn.signature).toEqual('types_identity_address(e(s(b256),s(b256)))');
      expect(fn.selector).toEqual('0x00000000aa402b49');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 22, 116, 121, 112, 101, 115, 95, 105, 100, 101, 110, 116, 105, 116,
          121, 95, 97, 100, 100, 114, 101, 115, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_identity_contract_id', () => {
    it('should encode/decode just fine', async () => {
      const input: IdentityInput = {
        ContractId: { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
      };
      const expected: IdentityOutput = {
        ContractId: { bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' },
      };

      const { waitForResult } = await contract.functions.types_identity_contract_id(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_identity_contract_id');

      expect(fn.name).toBe('types_identity_contract_id');
      expect(fn.signature).toEqual('types_identity_contract_id(e(s(b256),s(b256)))');
      expect(fn.selector).toEqual('0x00000000b133fa5b');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 26, 116, 121, 112, 101, 115, 95, 105, 100, 101, 110, 116, 105, 116,
          121, 95, 99, 111, 110, 116, 114, 97, 99, 116, 95, 105, 100,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_address', () => {
    it('should encode/decode just fine', async () => {
      const input = { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' };
      const expected = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_address(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_address');

      expect(fn.name).toBe('types_address');
      expect(fn.signature).toEqual('types_address(s(b256))');
      expect(fn.selector).toEqual('0x000000005b7bb428');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 13, 116, 121, 112, 101, 115, 95, 97, 100, 100, 114, 101, 115, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_contract_id', () => {
    it('should encode/decode just fine', async () => {
      const input = { bits: '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' };
      const expected = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_contract_id(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_contract_id');

      expect(fn.name).toBe('types_contract_id');
      expect(fn.signature).toEqual('types_contract_id(s(b256))');
      expect(fn.selector).toEqual('0x0000000051bcfff5');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 17, 116, 121, 112, 101, 115, 95, 99, 111, 110, 116, 114, 97, 99, 116,
          95, 105, 100,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_asset_id', () => {
    it('should encode/decode just fine', async () => {
      const input: AssetId = {
        bits: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      const expected: AssetId = {
        bits: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_asset_id(input).call();
      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_asset_id');

      expect(fn.name).toBe('types_asset_id');
      expect(fn.signature).toEqual('types_asset_id(s(b256))');
      expect(fn.selector).toEqual('0x00000000bdd1d050');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 14, 116, 121, 112, 101, 115, 95, 97, 115, 115, 101, 116, 95, 105,
          100,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_evm_address', () => {
    it('should encode/decode just fine', async () => {
      const input: EvmAddress = {
        bits: '0x000000000000000000000000AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      };
      const expected = {
        bits: '0x000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      };

      const { waitForResult } = await contract.functions.types_evm_address(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_evm_address');

      expect(fn.name).toBe('types_evm_address');
      expect(fn.signature).toEqual('types_evm_address(s(b256))');
      expect(fn.selector).toEqual('0x00000000727fec9d');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 17, 116, 121, 112, 101, 115, 95, 101, 118, 109, 95, 97, 100, 100,
          114, 101, 115, 115,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_result', () => {
    it('should accept result just fine [Ok - 10]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Ok: 10,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        // @ts-expect-error: Custom matcher 'toEqualBn'
        Ok: expect.toEqualBn(2),
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });

    it('should accept result just fine [Err - divide by zero]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Ok: 0,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        Err: 'DivisError',
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });

    it('should accept result just fine [Err - 10]', async () => {
      const input: Result<BigNumberish, BigNumberish> = {
        Err: 10,
      };
      const expected: Result<BigNumberish, BigNumberish> = {
        Err: 'InputError',
      };

      const { waitForResult } = await contract.functions.types_result(input).call();

      const { value } = await waitForResult();
      expect(value).toStrictEqual(expected);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_result');

      expect(fn.name).toBe('types_result');
      expect(fn.signature).toEqual('types_result(e<u64,u32>(u64,u32))');
      expect(fn.selector).toEqual('0x00000000ec4468f8');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 12, 116, 121, 112, 101, 115, 95, 114, 101, 115, 117, 108, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Void
   */
  describe('types_void', () => {
    it('should encode/decode just fine', async () => {
      const input = undefined;
      const expected = undefined;

      const { waitForResult } = await contract.functions.types_void(input).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should encode/decode just fine [omit optional args]', async () => {
      const expected = undefined;

      const { waitForResult } = await contract.functions.types_void().call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_void');

      expect(fn.name).toBe('types_void');
      expect(fn.signature).toEqual('types_void(())');
      expect(fn.selector).toEqual('0x00000000fd833d6f');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 116, 121, 112, 101, 115, 95, 118, 111, 105, 100])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_void_then_value', () => {
    it('should encode/decode just fine', async () => {
      const inputX = undefined;
      const inputY = 10;
      const expected = undefined;

      const { waitForResult } = await contract.functions
        .types_void_then_value(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBe(expected);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_void_then_value');

      expect(fn.name).toBe('types_void_then_value');
      expect(fn.signature).toEqual('types_void_then_value((),u8)');
      expect(fn.selector).toEqual('0x0000000027599008');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 21, 116, 121, 112, 101, 115, 95, 118, 111, 105, 100, 95, 116, 104,
          101, 110, 95, 118, 97, 108, 117, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_value_then_void', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = undefined;
      const { waitForResult } = await contract.functions
        .types_value_then_void(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should encode/decode just fine [omitting optional args]', async () => {
      const inputX = 10;

      const { waitForResult } = await contract.functions.types_value_then_void(inputX).call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_value_then_void');

      expect(fn.name).toBe('types_value_then_void');
      expect(fn.signature).toEqual('types_value_then_void(u8,())');
      expect(fn.selector).toEqual('0x00000000fe7792d4');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 21, 116, 121, 112, 101, 115, 95, 118, 97, 108, 117, 101, 95, 116,
          104, 101, 110, 95, 118, 111, 105, 100,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_value_then_void_then_value', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = undefined;
      const inputZ = 20;

      const { waitForResult } = await contract.functions
        .types_value_then_void_then_value(inputX, inputY, inputZ)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_value_then_void_then_value');

      expect(fn.name).toBe('types_value_then_void_then_value');
      expect(fn.signature).toEqual('types_value_then_void_then_value(u8,(),u8)');
      expect(fn.selector).toEqual('0x000000005c3c9a25');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 32, 116, 121, 112, 101, 115, 95, 118, 97, 108, 117, 101, 95, 116,
          104, 101, 110, 95, 118, 111, 105, 100, 95, 116, 104, 101, 110, 95, 118, 97, 108, 117, 101,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('types_value_then_value_then_void_then_void', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 10;
      const inputY = 20;
      const inputZ = undefined;
      const inputA = undefined;

      const { waitForResult } = await contract.functions
        .types_value_then_value_then_void_then_void(inputX, inputY, inputZ, inputA)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should encode/decode just fine [omitting optional args]', async () => {
      const inputX = 10;
      const inputY = 20;

      const { waitForResult } = await contract.functions
        .types_value_then_value_then_void_then_void(inputX, inputY)
        .call();

      const { value } = await waitForResult();
      expect(value).toBeUndefined();
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('types_value_then_value_then_void_then_void');

      expect(fn.name).toBe('types_value_then_value_then_void_then_void');
      expect(fn.signature).toEqual('types_value_then_value_then_void_then_void(u8,u8,(),())');
      expect(fn.selector).toEqual('0x00000000ef0dd323');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 42, 116, 121, 112, 101, 115, 95, 118, 97, 108, 117, 101, 95, 116,
          104, 101, 110, 95, 118, 97, 108, 117, 101, 95, 116, 104, 101, 110, 95, 118, 111, 105, 100,
          95, 116, 104, 101, 110, 95, 118, 111, 105, 100,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  /**
   * Multi-arg
   */
  describe('multi_arg_u64_u64', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 1;
      const inputY = 2;
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = expect.toEqualBn(3);

      const { waitForResult } = await contract.functions.multi_arg_u64_u64(inputX, inputY).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_u64_u64');

      expect(fn.name).toBe('multi_arg_u64_u64');
      expect(fn.signature).toEqual('multi_arg_u64_u64(u64,u64)');
      expect(fn.selector).toEqual('0x000000008da21283');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 17, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 117, 54, 52, 95,
          117, 54, 52,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_b256_bool', () => {
    it('should encode/decode just fine', async () => {
      const inputX = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const inputY = true;
      const expected = [
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        false,
      ];

      const { waitForResult } = await contract.functions.multi_arg_b256_bool(inputX, inputY).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_b256_bool');

      expect(fn.name).toBe('multi_arg_b256_bool');
      expect(fn.signature).toEqual('multi_arg_b256_bool(b256,bool)');
      expect(fn.selector).toEqual('0x0000000087e6d52c');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 19, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 98, 50, 53, 54,
          95, 98, 111, 111, 108,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_vector_vector', () => {
    it('should encode/decode just fine', async () => {
      const inputX = [1, 2, 3];
      const inputY = [4, 5, 6];
      const expected = [
        [7, 8, 9],
        [10, 11, 12],
      ];

      const { waitForResult } = await contract.functions
        .multi_arg_vector_vector(inputX, inputY)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_vector_vector');

      expect(fn.name).toBe('multi_arg_vector_vector');
      expect(fn.signature).toEqual(
        'multi_arg_vector_vector(s<u8>(s<u8>(rawptr,u64),u64),s<u8>(s<u8>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x000000008f38c8a0');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 118, 101, 99, 116,
          111, 114, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_vector_b256', () => {
    it('should encode/decode just fine', async () => {
      const inputX = [1, 2, 3];
      const inputY = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const expected = [
        [7, 8, 9],
        '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      ];

      const { waitForResult } = await contract.functions
        .multi_arg_vector_b256(inputX, inputY)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_vector_b256');

      expect(fn.name).toBe('multi_arg_vector_b256');
      expect(fn.signature).toEqual('multi_arg_vector_b256(s<u8>(s<u8>(rawptr,u64),u64),b256)');
      expect(fn.selector).toEqual('0x0000000031ca0fba');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 21, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 118, 101, 99, 116,
          111, 114, 95, 98, 50, 53, 54,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_struct_vector', () => {
    it('should encode/decode just fine', async () => {
      const inputX = { a: true, b: 1 };
      const inputY = [1, 2, 3];
      const expected = [{ a: false, b: 2 }, [4, 5, 6]];

      const { waitForResult } = await contract.functions
        .multi_arg_struct_vector(inputX, inputY)
        .call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_struct_vector');

      expect(fn.name).toBe('multi_arg_struct_vector');
      expect(fn.signature).toEqual(
        'multi_arg_struct_vector(s(bool,u32),s<u8>(s<u8>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x00000000d63bf118');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 23, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 115, 116, 114,
          117, 99, 116, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_u64_struct', () => {
    it('should encode/decode just fine', async () => {
      const inputX = bn(99);
      const inputY: StructSimpleInput = { a: true, b: 51 };
      const expected = [bn(3), { a: false, b: 4 }];

      const { waitForResult } = await contract.functions
        .multi_arg_u64_struct(inputX, inputY)
        .call();

      const { value, logs } = await waitForResult();
      expect(JSON.stringify(value)).toEqual(JSON.stringify(expected));
      expect(JSON.stringify(logs)).toEqual(JSON.stringify([expected]));
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_u64_struct');

      expect(fn.name).toBe('multi_arg_u64_struct');
      expect(fn.signature).toEqual('multi_arg_u64_struct(u64,s(bool,u32))');
      expect(fn.selector).toEqual('0x00000000259174ac');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 20, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 117, 54, 52, 95,
          115, 116, 114, 117, 99, 116,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_str_str', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 'Input';
      const inputY = 'False';

      const expected = ['Fuuel', 'Niice'];

      const { waitForResult } = await contract.functions.multi_arg_str_str(inputX, inputY).call();

      const { value, logs } = await waitForResult();
      expect(value).toStrictEqual(expected);
      expect(logs).toStrictEqual([expected]);
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_str_str');

      expect(fn.name).toBe('multi_arg_str_str');
      expect(fn.signature).toEqual('multi_arg_str_str(str[5],str[5])');
      expect(fn.selector).toEqual('0x0000000001cf9e71');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 17, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 115, 116, 114, 95,
          115, 116, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_u32_vector_vector', () => {
    it('should encode/decode just fine', async () => {
      const inputX = 1;
      const inputY = [bn(10020), bn(1231231), bn(777657)];
      const inputZ = [bn(99), bn(101)];

      const expected = [2, [bn(7), bn(8), bn(9)], [bn(10), bn(11), bn(12)]];

      const { waitForResult } = await contract.functions
        .multi_arg_u32_vector_vector(inputX, inputY, inputZ)
        .call();

      const { value, logs } = await waitForResult();
      expect(JSON.stringify(value)).toEqual(JSON.stringify(expected));
      expect(JSON.stringify(logs)).toEqual(JSON.stringify([expected]));
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_u32_vector_vector');

      expect(fn.name).toBe('multi_arg_u32_vector_vector');
      expect(fn.signature).toEqual(
        'multi_arg_u32_vector_vector(u32,s<u64>(s<u64>(rawptr,u64),u64),s<u64>(s<u64>(rawptr,u64),u64))'
      );
      expect(fn.selector).toEqual('0x000000003f794313');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 27, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 117, 51, 50, 95,
          118, 101, 99, 116, 111, 114, 95, 118, 101, 99, 116, 111, 114,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });

  describe('multi_arg_complex', () => {
    it('should encode/decode just fine', async () => {
      const inputX: StructDoubleGenericInput<[string, string, string], number> = {
        a: [
          '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          '0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        ],
        b: 10,
      };

      const inputY: [
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
      ] = [
        { a: bn(99), b: false },
        { a: bn(199), b: false },
        { a: bn(2000), b: false },
        { a: bn(31), b: true },
      ];

      const inputZ: [string, boolean] = ['Input', true];

      const inputA = { a: true, b: 10 };

      const expectedX: StructDoubleGenericInput<[string, string, string], number> = {
        a: [
          '0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        ],
        b: 99,
      };

      const expectedY: [
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
        StructDoubleGenericInput<BigNumberish, boolean>,
      ] = [
        { a: bn(11), b: true },
        { a: bn(99), b: true },
        { a: bn(567), b: true },
        { a: bn(971), b: false },
      ];

      const expectedZ: [string, boolean] = ['tupni', false];

      const expectedA = {
        a: false,
        b: 57,
      };

      const expected = [expectedX, expectedY, expectedZ, expectedA];

      const { waitForResult } = await contract.functions
        .multi_arg_complex(inputX, inputY, inputZ, inputA)
        .call();

      const { value, logs } = await waitForResult();
      expect(JSON.stringify(value)).toEqual(JSON.stringify(expected));
      expect(JSON.stringify(logs)).toEqual(JSON.stringify([expected]));
    });

    it('should have function properties', () => {
      const fn = contract.interface.getFunction('multi_arg_complex');

      expect(fn.name).toBe('multi_arg_complex');
      expect(fn.signature).toEqual(
        'multi_arg_complex(s<a[b256;3],u8>(a[b256;3],u8),a[s<u64,bool>(u64,bool);4],(str[5],bool),s(bool,u32))'
      );
      expect(fn.selector).toEqual('0x00000000808afb73');
      expect(fn.selectorBytes).toEqual(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 17, 109, 117, 108, 116, 105, 95, 97, 114, 103, 95, 99, 111, 109, 112,
          108, 101, 120,
        ])
      );
      expect(fn.attributes).toEqual([]);
    });
  });
});
