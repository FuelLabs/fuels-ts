import { configurableFragmentMock, jsonFlatAbiMock } from '../test/fixtures/mocks';

import FunctionFragment from './fragments/function-fragment';
import * as interfaceMod from './interface';
import Interface from './interface';
import type { ConfigurableFragment, JsonAbiFragment } from './json-abi';
import * as jsonAbiMod from './json-abi';

describe('Interface', () => {
  afterEach(jest.restoreAllMocks);

  const { convertConfigurablesToDict } = interfaceMod;

  const jsonFragment: JsonAbiFragment = {
    type: 'function',
    inputs: [{ name: 'arg', type: 'u64' }],
    name: 'entry_one',
    outputs: [],
  };

  const fragment = FunctionFragment.fromObject(jsonFragment);
  let functionInterface: Interface;

  it('removes duplicates if function signatures are repeated', () => {
    functionInterface = new Interface([jsonFragment, jsonFragment]);
    expect(Object.values(functionInterface.functions)).toHaveLength(1);
  });

  it('can retrieve a function fragment', () => {
    functionInterface = new Interface([jsonFragment]);

    expect(Object.values(functionInterface.functions)).toHaveLength(1);

    expect(functionInterface.getFunction('entry_one(u64)')).toEqual(fragment);
    expect(functionInterface.getFunction('entry_one')).toEqual(fragment);
    expect(functionInterface.getFunction('0x000000000c36cb9c')).toEqual(fragment);
  });

  it('raises an error if the function is not found', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(() => functionInterface.encodeFunctionData('entry_two', [42])).toThrow(
      'function entry_two not found'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_two', '0x00000000000000000000000000000000')
    ).toThrow('function entry_two not found');
  });

  it('raises an error if the arguments do not match the function input types', () => {
    expect(() => functionInterface.encodeFunctionData('entry_one', [11, 11])).toThrow(
      'Types/values length mismatch'
    );
  });

  it('should ensure `convertConfigurablesToDict` creates dictionary just fine', () => {
    const result = convertConfigurablesToDict(configurableFragmentMock);

    expect(configurableFragmentMock.length).toBeGreaterThan(0);

    configurableFragmentMock.forEach((value, i) => {
      expect(result[value.name]).toStrictEqual(configurableFragmentMock[i]);
    });
  });

  it('should ensure constructor calls `convertConfigurablesToDict` (CALLED W/ JsonAbiFragment)', () => {
    const abiUnflattenConfigurablesSpy = jest
      .spyOn(jsonAbiMod.ABI.prototype, 'unflattenConfigurables')
      .mockImplementation(() => configurableFragmentMock);

    const mockedConfigurableDict: { [name: string]: ConfigurableFragment } = {
      dummy: configurableFragmentMock[0],
    };
    const convertConfigurablesToDictSpy = jest
      .spyOn(interfaceMod, 'convertConfigurablesToDict')
      .mockReturnValue(mockedConfigurableDict);

    const abiInterface = new Interface([jsonFragment]);

    expect(abiUnflattenConfigurablesSpy).not.toHaveBeenCalled();

    expect(convertConfigurablesToDictSpy).toHaveBeenCalledTimes(1);
    expect(convertConfigurablesToDictSpy).toHaveBeenCalledWith([]);

    expect(abiInterface.configurables).toStrictEqual(mockedConfigurableDict);
  });

  it('should ensure constructor calls `convertConfigurablesToDict` (CALLED W/ JsonFlatAbi)', () => {
    const abiUnflattenConfigurablesSpy = jest
      .spyOn(jsonAbiMod.ABI.prototype, 'unflattenConfigurables')
      .mockImplementation(() => configurableFragmentMock);

    const mockedConfigurableDict: { [name: string]: ConfigurableFragment } = {
      dummy: configurableFragmentMock[1],
    };
    const convertConfigurablesToDictSpy = jest
      .spyOn(interfaceMod, 'convertConfigurablesToDict')
      .mockReturnValue(mockedConfigurableDict);

    const abiInterface = new Interface(jsonFlatAbiMock);

    expect(abiUnflattenConfigurablesSpy).toHaveBeenCalledTimes(1);

    expect(convertConfigurablesToDictSpy).toHaveBeenCalledTimes(1);
    expect(convertConfigurablesToDictSpy).toHaveBeenCalledWith(configurableFragmentMock);

    expect(abiInterface.configurables).toStrictEqual(mockedConfigurableDict);
  });
});
