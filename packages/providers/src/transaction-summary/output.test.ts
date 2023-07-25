import {
  MOCK_OUTPUT_CONTRACT,
  MOCK_OUTPUT_CHANGE,
  MOCK_OUTPUT_VARIABLE,
  MOCK_OUTPUT_CONTRACT_CREATED,
  MOCK_OUTPUT_COIN,
} from '../../test/fixtures/transaction-summary';

import { getOutputsCoin, getOutputsContract, getOutputsContractCreated } from './output';

describe('transaction-summary/output', () => {
  it('should ensure getOutputsCoin return correct outputs', () => {
    const coinsOutputs = getOutputsCoin([
      MOCK_OUTPUT_COIN,
      MOCK_OUTPUT_CONTRACT,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
      MOCK_OUTPUT_CONTRACT_CREATED,
    ]);

    expect(coinsOutputs.length).toEqual(1);
    expect(coinsOutputs[0]).toStrictEqual(MOCK_OUTPUT_COIN);

    const emptyOutputs = getOutputsCoin([
      MOCK_OUTPUT_CONTRACT,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
      MOCK_OUTPUT_CONTRACT_CREATED,
    ]);

    expect(emptyOutputs.length).toEqual(0);
  });

  it('should ensure getOutputsContract return correct outputs', () => {
    const contractOutputs = getOutputsContract([
      MOCK_OUTPUT_COIN,
      MOCK_OUTPUT_CONTRACT,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
      MOCK_OUTPUT_CONTRACT_CREATED,
    ]);

    expect(contractOutputs.length).toEqual(1);
    expect(contractOutputs[0]).toStrictEqual(MOCK_OUTPUT_CONTRACT);

    const emptyOutputs = getOutputsContract([
      MOCK_OUTPUT_COIN,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
      MOCK_OUTPUT_CONTRACT_CREATED,
    ]);

    expect(emptyOutputs.length).toEqual(0);
  });

  it('should ensure getOutputsContractCreated return correct outputs', () => {
    const contractOutputs = getOutputsContractCreated([
      MOCK_OUTPUT_COIN,
      MOCK_OUTPUT_CONTRACT,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
      MOCK_OUTPUT_CONTRACT_CREATED,
    ]);

    expect(contractOutputs.length).toEqual(1);
    expect(contractOutputs[0]).toStrictEqual(MOCK_OUTPUT_CONTRACT_CREATED);

    const emptyOutputs = getOutputsContractCreated([
      MOCK_OUTPUT_COIN,
      MOCK_OUTPUT_CONTRACT,
      MOCK_OUTPUT_CHANGE,
      MOCK_OUTPUT_VARIABLE,
    ]);

    expect(emptyOutputs.length).toEqual(0);
  });
});
