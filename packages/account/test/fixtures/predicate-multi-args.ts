import type { BigNumberish } from '@fuel-ts/math';
import { decompressBytecode } from '@fuel-ts/utils';

import { Predicate } from '../../src';
import type { Provider } from '../../src';

const abi = {
  programType: 'predicate',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: 'bool',
      concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
    {
      type: 'u64',
      concreteTypeId: '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
    },
  ],
  metadataTypes: [],
  functions: [
    {
      name: 'main',
      inputs: [
        {
          name: 'arg1',
          concreteTypeId: '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'arg2',
          concreteTypeId: '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      output: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
  errorCodes: {},
};

const bytecode = decompressBytecode(
  'H4sIAAAAAAAAA5P6YMBQwsDAwgAGjBAKSMf+P8Ao8P8/g9SbAIaJDAwchQ4MzImuTAzCngIMZR4MbEUeDEzCriINZS4MjGZAHYmOTF5AcxiBNE/8WwYGqdcbGBR+GDNE/H7AFPD7AQtQjlfK+QI2cXapl0D1zy+giwuofGFgmMrAwD+NAygPdIeU8wOGWPcFDLGuAgyx3gsYinwYOAQ8VQ7Ev1RgkPoqwCD1k4FhBlDtdKAerx9gvYwwvcLO6xyEHYHsr3A1jCA1AOxRRIgAAQAA'
);

export class PredicateMultiArgs extends Predicate<[BigNumberish, BigNumberish]> {
  constructor({ provider, data }: { provider: Provider; data: [BigNumberish, BigNumberish] }) {
    super({
      bytecode,
      abi,
      provider,
      data,
    });
  }
}
