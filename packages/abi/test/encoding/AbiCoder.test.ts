import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiCoder } from '../../src';
import { v1 as specificationV1 } from '../fixtures/v1';

/**
 * @group node
 * @group browser
 */
describe('AbiCoder', () => {
  describe('intialisation', () => {
    it('should create an ABI coder', () => {
      const coder = AbiCoder.fromAbi(specificationV1);

      expect(coder).toBeDefined();
      expect(coder.abi).toBeInstanceOf(Object);
      expect(coder.specification).toEqual(specificationV1);

      expect(coder.functions).toBeInstanceOf(Object);
      expect(coder.logs).toBeInstanceOf(Object);
      expect(coder.configurables).toBeInstanceOf(Object);

      expect(coder.getFunction).toBeInstanceOf(Function);
      expect(coder.getLog).toBeInstanceOf(Function);
      expect(coder.getType).toBeInstanceOf(Function);
      expect(coder.getConfigurable).toBeInstanceOf(Function);
    });
  });

  describe('getFunction', () => {
    describe('properties', () => {
      it('should get a function and return the correct values', () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        const fn = coder.getFunction('types_u8');

        expect(fn).toBeDefined();
        expect(fn.name).toBe('types_u8');
        expect(fn.inputs).toStrictEqual([
          {
            name: 'x',
            type: {
              concreteTypeId: 'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
              swayType: 'u8',
            },
          },
        ]);
        expect(fn.signature).toStrictEqual('types_u8(u8)');
        expect(fn.selector).toStrictEqual('0x00000000469feadd');
        expect(fn.selectorBytes).toStrictEqual(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8, 116, 121, 112, 101, 115, 95, 117, 56])
        );
        expect(fn.attributes).toStrictEqual([]);
        expect(fn.isReadOnly()).toBe(true);
      });

      it('should get a function by name', () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        const fn = coder.getFunction('configurables');

        expect(fn).toBeDefined();
        expect(fn.name).toStrictEqual('configurables');
        expect(fn.signature).toStrictEqual('configurables()');
        expect(fn.selector).toStrictEqual('0x00000000fdaf4480');
      });

      it('should get a function by signature', () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        const fn = coder.getFunction('configurables()');

        expect(fn).toBeDefined();
        expect(fn.name).toStrictEqual('configurables');
        expect(fn.signature).toStrictEqual('configurables()');
        expect(fn.selector).toStrictEqual('0x00000000fdaf4480');
      });

      it('should get a function by selector', () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        const fn = coder.getFunction('0x00000000fdaf4480');

        expect(fn).toBeDefined();
        expect(fn.name).toStrictEqual('configurables');
        expect(fn.signature).toStrictEqual('configurables()');
        expect(fn.selector).toStrictEqual('0x00000000fdaf4480');
      });

      it('should throw an error if the function is not found', async () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        await expectToThrowFuelError(
          () => coder.getFunction('unknown'),
          new FuelError(
            FuelError.CODES.FUNCTION_NOT_FOUND,
            'Unable to find function with the name or signature or selector of "unknown".'
          )
        );
      });
    });

    describe('getFunction::encodeArguments', () => {
      it('should encode the arguments correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const encoded = fn.encodeArguments([1]);

        expect(encoded).toStrictEqual(new Uint8Array([1]));
      });

      it('should pad the arguments with undefined if the number of arguments is less than the expected number', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_void');

        const encoded = fn.encodeArguments([]);

        expect(encoded).toStrictEqual(new Uint8Array([]));
      });

      it('should throw an error if the number of arguments is less than the expected number', async () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        await expectToThrowFuelError(
          () => fn.encodeArguments([]),
          new FuelError(
            FuelError.CODES.ENCODE_ERROR,
            'Invalid number of arguments. Expected a minimum of 1 arguments, received 0'
          )
        );
      });
    });

    describe('decodeArguments', () => {
      it('should decode the arguments correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const decoded = fn.decodeArguments(new Uint8Array([1]));

        expect(decoded).toStrictEqual([1]);
      });

      it('should arrayify the arguments', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const decoded = fn.decodeArguments('0x01');

        expect(decoded).toStrictEqual([1]);
      });
    });

    describe('encodeOutput', () => {
      it('should encode the output correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const encoded = fn.encodeOutput(1);

        expect(encoded).toStrictEqual(new Uint8Array([1]));
      });
    });

    describe('decodeOutput', () => {
      it('should decode the output correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const decoded = fn.decodeOutput(new Uint8Array([1]));

        expect(decoded).toStrictEqual(1);
      });

      it('should arrayify the output', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const fn = coder.getFunction('types_u8');

        const decoded = fn.decodeOutput('0x01');

        expect(decoded).toStrictEqual(1);
      });
    });
  });

  describe('getConfigurable', () => {
    describe('properties', () => {
      it('should get a configurable by name', () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        const configurable = coder.getConfigurable('U8_VALUE');

        expect(configurable).toBeDefined();
        expect(configurable.name).toBe('U8_VALUE');
        expect(configurable.offset).toBe(113392);
        expect(configurable.encode).toBeDefined();
        expect(configurable.decode).toBeDefined();
      });

      it('should throw an error if the configurable is not found', async () => {
        const coder = AbiCoder.fromAbi(specificationV1);

        await expectToThrowFuelError(
          () => coder.getConfigurable('unknown'),
          new FuelError(
            FuelError.CODES.CONFIGURABLE_NOT_FOUND,
            "Configurable with name 'unknown' doesn't exist in the ABI."
          )
        );
      });
    });

    describe('encode', () => {
      it('should encode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const configurable = coder.getConfigurable('U8_VALUE');

        const encoded = configurable.encode(1);

        expect(encoded).toStrictEqual(new Uint8Array([1]));
      });
    });

    describe('decode', () => {
      it('should decode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const configurable = coder.getConfigurable('U8_VALUE');

        const decoded = configurable.decode(new Uint8Array([1]));

        expect(decoded).toStrictEqual(1);
      });

      it('should arrayify the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const configurable = coder.getConfigurable('U8_VALUE');

        const decoded = configurable.decode('0x01');

        expect(decoded).toStrictEqual(1);
      });
    });
  });

  describe('getLog', () => {
    it('should get a log by id', () => {
      const coder = AbiCoder.fromAbi(specificationV1);

      const log = coder.getLog('8961848586872524460');

      expect(log).toBeDefined();
    });

    it('should throw an error if the log is not found', async () => {
      const coder = AbiCoder.fromAbi(specificationV1);

      await expectToThrowFuelError(
        () => coder.getLog('unknown'),
        new FuelError(
          FuelError.CODES.LOG_TYPE_NOT_FOUND,
          `Log type with logId 'unknown' doesn't exist in the ABI.`
        )
      );
    });

    describe('encode', () => {
      it('should encode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const log = coder.getLog('8961848586872524460');
        const expected = new Uint8Array([
          -1, 58, 156, 113, 34, 38, 148, 86, 145, 26, 238, 58, 41, 126, 101, 222, 26, 221, 83, 216,
          61, 217, 86, 108, 149, 69, 160, 219, 244, 168, 219, 162,
        ]);
        const value = '0xff3a9c7122269456911aee3a297e65de1add53d83dd9566c9545a0dbf4a8dba2';

        const encoded = log.encode(value);

        expect(encoded).toStrictEqual(expected);
      });
    });

    describe('decode', () => {
      it('should decode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const log = coder.getLog('8961848586872524460');
        const expected = '0xff3a9c7122269456911aee3a297e65de1add53d83dd9566c9545a0dbf4a8dba2';
        const data = new Uint8Array([
          -1, 58, 156, 113, 34, 38, 148, 86, 145, 26, 238, 58, 41, 126, 101, 222, 26, 221, 83, 216,
          61, 217, 86, 108, 149, 69, 160, 219, 244, 168, 219, 162, 209,
        ]);

        const decoded = log.decode(data);

        expect(decoded).toStrictEqual(expected);
      });
    });
  });

  describe('getType', () => {
    it('should get a type by concreteTypeId', () => {
      const coder = AbiCoder.fromAbi(specificationV1);

      const type = coder.getType(
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b'
      );

      expect(type).toBeDefined();
    });

    it('should throw an error if the type is not found', async () => {
      const coder = AbiCoder.fromAbi(specificationV1);

      await expectToThrowFuelError(
        () => coder.getType('unknown'),
        new FuelError(
          FuelError.CODES.TYPE_NOT_FOUND,
          `Type with concreteTypeId 'unknown' doesn't exist in the ABI.`
        )
      );
    });

    describe('encode', () => {
      it('should encode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const type = coder.getType(
          '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b'
        );
        const expected = new Uint8Array([
          -1, 58, 156, 113, 34, 38, 148, 86, 145, 26, 238, 58, 41, 126, 101, 222, 26, 221, 83, 216,
          61, 217, 86, 108, 149, 69, 160, 219, 244, 168, 219, 162,
        ]);
        const value = '0xff3a9c7122269456911aee3a297e65de1add53d83dd9566c9545a0dbf4a8dba2';

        const encoded = type.encode(value);

        expect(encoded).toStrictEqual(expected);
      });
    });

    describe('decode', () => {
      it('should decode the value correctly', () => {
        const coder = AbiCoder.fromAbi(specificationV1);
        const type = coder.getType(
          '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b'
        );
        const expected = '0xff3a9c7122269456911aee3a297e65de1add53d83dd9566c9545a0dbf4a8dba2';
        const data = new Uint8Array([
          -1, 58, 156, 113, 34, 38, 148, 86, 145, 26, 238, 58, 41, 126, 101, 222, 26, 221, 83, 216,
          61, 217, 86, 108, 149, 69, 160, 219, 244, 168, 219, 162, 209,
        ]);

        const decoded = type.decode(data);

        expect(decoded).toStrictEqual(expected);
      });
    });
  });
});
