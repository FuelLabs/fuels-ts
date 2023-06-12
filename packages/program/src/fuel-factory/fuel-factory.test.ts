import { Provider } from '@fuel-ts/providers';
import { FuelFactory } from './fuel-factory';
import { complexAbi } from './abis/complexAbi';
import { counterContractAbi } from './abis/counterContractAbi';

describe('Fuel factory', () => {
  const factory = new FuelFactory(
    {
      programName: 'complexContract',
      ...complexAbi,
    } as const,
    {
      programName: 'counterContract',
      ...counterContractAbi,
    } as const
  );

  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const complexContract = factory
    .programs('complexContract')
    .connect('fuel1efz7lf36w9da9jekqzyuzqsfrqrlzwtt3j3clvemm6eru8fe9nvqj5kar8', provider);

  const counterContract = factory
    .programs('counterContract')
    .connect('fuel1efz7lf36w9da9jekqzyuzqsfrqrlzwtt3j3clvemm6eru8fe9nvqj5kar8', provider);

  const singleParamsInputObject = {
    z: {
      propC1: { propA1: 4 },
      propC2: [
        { propB1: { propA1: 1 }, propB2: 4 },
        { propB1: { propA1: 2 }, propB2: 4 },
        { propB1: { propA1: 2 }, propB2: 4 },
      ],
      propC3: {
        propD1: [
          {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 1 }, propB2: 2 },
            propE3: {
              propE1: { propA1: 2 },
              propE2: { propB1: { propA1: 4 }, propB2: 23 },
              propE3: 45,
            },
          },
        ],
        propD2: 123,
        propD3: {
          propE1: { propA1: 1 },
          propE2: { propB1: { propA1: 2 }, propB2: 1 },
          propE3: {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 2 }, propB2: 1 },
            propE3: {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 1 },
              propE3: {
                propF1: 12,
                propF2: 'a',
              },
            },
          },
        },
      },
      propC4: [
        {
          propD1: [
            {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 2 }, propB2: 2 },
                propE3: 34,
              },
            },
          ],
          propD2: 12,
          propD3: {
            propE1: { propA1: 4 },
            propE2: { propB1: { propA1: 123 }, propB2: 33 },
            propE3: {
              propE1: { propA1: 33 },
              propE2: { propB1: { propA1: 1 }, propB2: 3 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 11 }, propB2: 12 },
                propE3: { propF1: 12, propF2: false },
              },
            },
          },
        },
      ],
      propC5: [
        {
          propD1: [
            {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 2 }, propB2: 2 },
                propE3: 34,
              },
            },
          ],
          propD2: 12,
          propD3: {
            propE1: { propA1: 4 },
            propE2: { propB1: { propA1: 123 }, propB2: 33 },
            propE3: {
              propE1: { propA1: 33 },
              propE2: { propB1: { propA1: 1 }, propB2: 3 },
              propE3: {
                propE1: { propA1: 1 },
                propE2: { propB1: { propA1: 11 }, propB2: 12 },
                propE3: { propF1: 12, propF2: [{ propG1: 1 }] },
              },
            },
          },
        },
      ],
    },
    y: { propB1: { propA1: 1 }, propB2: 1 },
    x: {
      propA1: 2,
    },
  };

  const singleParamsInputArray = [
    {
      propA1: 2,
    },
    { propB1: { propA1: 1 }, propB2: 1 },
    {
      propC1: { propA1: 4 },
      propC2: [
        { propB1: { propA1: 1 }, propB2: 4 },
        { propB1: { propA1: 2 }, propB2: 4 },
        { propB1: { propA1: 2 }, propB2: 4 },
      ],
      propC3: {
        propD1: [
          {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 1 }, propB2: 2 },
            propE3: {
              propE1: { propA1: 2 },
              propE2: { propB1: { propA1: 4 }, propB2: 23 },
              propE3: 45,
            },
          },
        ],
        propD2: 123,
        propD3: {
          propE1: { propA1: 1 },
          propE2: { propB1: { propA1: 2 }, propB2: 1 },
          propE3: {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 2 }, propB2: 1 },
            propE3: {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 1 },
              propE3: {
                propF1: 12,
                propF2: 'a',
              },
            },
          },
        },
      },
      propC4: [
        {
          propD1: [
            {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 2 }, propB2: 2 },
                propE3: 34,
              },
            },
          ],
          propD2: 12,
          propD3: {
            propE1: { propA1: 4 },
            propE2: { propB1: { propA1: 123 }, propB2: 33 },
            propE3: {
              propE1: { propA1: 33 },
              propE2: { propB1: { propA1: 1 }, propB2: 3 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 11 }, propB2: 12 },
                propE3: { propF1: 12, propF2: false },
              },
            },
          },
        },
      ],
      propC5: [
        {
          propD1: [
            {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: {
                propE1: { propA1: 2 },
                propE2: { propB1: { propA1: 2 }, propB2: 2 },
                propE3: 34,
              },
            },
          ],
          propD2: 12,
          propD3: {
            propE1: { propA1: 4 },
            propE2: { propB1: { propA1: 123 }, propB2: 33 },
            propE3: {
              propE1: { propA1: 33 },
              propE2: { propB1: { propA1: 1 }, propB2: 3 },
              propE3: {
                propE1: { propA1: 1 },
                propE2: { propB1: { propA1: 11 }, propB2: 12 },
                propE3: { propF1: 12, propF2: [{ propG1: 1 }] },
              },
            },
          },
        },
      ],
    },
  ];

  it('Changes the passed inferred object into array expected by old solution', () => {
    const testTuple = complexContract.functions.single_params(singleParamsInputObject);

    expect(singleParamsInputArray).toEqual(testTuple.getCallConfig().args);
  });

  it('Encodes values when passing inferred input object the same way as old solution', () => {
    const dataEncodedViaInputArray = complexContract.interface.encodeFunctionData(
      'single_params',
      singleParamsInputArray
    );

    const dataEncodedViaInputObject = complexContract.interface.encodeFunctionData(
      'single_params',
      singleParamsInputObject
    );

    expect(dataEncodedViaInputArray).toEqual(dataEncodedViaInputObject);
  });

  it('encodes simple enums properly', () => {
    const enumEncodeViaInputArr = counterContract.interface.encodeFunctionData('testEnum', [
      'Blue',
    ]);

    const testEnumEncodeViaObj = counterContract.interface.encodeFunctionData('testEnum', {
      enm: 'Blue',
    });

    expect(enumEncodeViaInputArr).toEqual(testEnumEncodeViaObj);
  });

  it('encodes complex enums properly', () => {
    const enumEncodeViaInputArr = counterContract.interface.encodeFunctionData('testEnumStruct', [
      { Item: { id: 4, amount: 3, price: 2 } },
    ]);

    const testEnumEncodeViaObj = counterContract.interface.encodeFunctionData('testEnumStruct', {
      enm: { Item: { id: 4, amount: 3, price: 2 } },
    });

    expect(enumEncodeViaInputArr).toEqual(testEnumEncodeViaObj);
  });
});
