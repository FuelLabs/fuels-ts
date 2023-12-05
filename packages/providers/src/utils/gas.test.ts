import { BN, bn } from '@fuel-ts/math';
import type { InputCoin, InputMessage } from '@fuel-ts/transactions';
import { getBytesCopy } from 'ethers';

import { MOCK_CHAIN } from '../../test/fixtures/chain';
import {
  MOCK_COIN_INPUT,
  MOCK_MESSAGE_INPUT,
  MOCK_REQUEST_COIN_INPUT,
  MOCK_REQUEST_MESSAGE_INPUT,
  MOCK_REQUEST_PREDICATE_INPUT,
} from '../../test/fixtures/inputs-and-outputs';
import type { GqlDependentCost } from '../__generated__/operations';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
  TransactionRequestInput,
} from '../transaction-request';

import {
  calculateMetadataGasForTxCreate,
  calculateMetadataGasForTxScript,
  gasUsedByInputs,
  getMaxGas,
  getMinGas,
  resolveGasDependentCosts,
} from './gas';

describe('gas', () => {
  describe('resolveGasDependentCosts', () => {
    it('calculates cost correctly for LightOperation', () => {
      const byteSize = new BN('100');
      const gasDependentCost: GqlDependentCost = {
        __typename: 'LightOperation',
        base: '10',
        unitsPerGas: '10',
      };
      const expected = new BN('20');
      expect(resolveGasDependentCosts(byteSize, gasDependentCost).toString()).toEqual(
        expected.toString()
      );
    });

    it('calculates cost correctly for HeavyOperation', () => {
      const byteSize = new BN('500');
      const gasDependentCost: GqlDependentCost = {
        __typename: 'HeavyOperation',
        base: '10',
        gasPerUnit: '2',
      };
      const expected = new BN('1010');
      expect(resolveGasDependentCosts(byteSize, gasDependentCost).toString()).toEqual(
        expected.toString()
      );
    });
  });

  describe('gasUsedByInputs', () => {
    it('should properly calculate gas used by coin and message inputs request', () => {
      const coinInput1: CoinTransactionRequestInput = { ...MOCK_REQUEST_COIN_INPUT };
      const coinInput2: CoinTransactionRequestInput = {
        ...MOCK_REQUEST_COIN_INPUT,
        witnessIndex: 1,
      };

      const messageInput: MessageTransactionRequestInput = {
        ...MOCK_REQUEST_MESSAGE_INPUT,
        witnessIndex: 0,
      };

      const inputs = [coinInput1, coinInput2, messageInput];
      const txBytesSize = 520;
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;

      // only two witnesses
      const expectedGas = bn(gasCosts.ecr1).mul(2);

      expect(gasUsedByInputs(inputs, txBytesSize, gasCosts).toNumber()).toBe(
        expectedGas.toNumber()
      );
    });

    it('should properly calculate gas used by coin and message inputs', () => {
      const coinInput1: InputCoin = { ...MOCK_COIN_INPUT };
      const coinInput2: InputCoin = {
        ...MOCK_COIN_INPUT,
        witnessIndex: 1,
      };

      const messageInput: InputMessage = {
        ...MOCK_MESSAGE_INPUT,
        witnessIndex: 2,
      };

      const inputs = [coinInput1, coinInput2, messageInput];
      const txBytesSize = 820;
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;

      // three witnesses
      const expectedGas = bn(gasCosts.ecr1).mul(3);

      expect(gasUsedByInputs(inputs, txBytesSize, gasCosts).toNumber()).toBe(
        expectedGas.toNumber()
      );
    });

    it('should properly calculate gas used by coin and message predicates', () => {
      const predicateGasUsed1 = 650;
      const predicateGasUsed2 = 270;

      const coinInput: CoinTransactionRequestInput = { ...MOCK_REQUEST_COIN_INPUT };
      const predicateInput1: CoinTransactionRequestInput = {
        ...MOCK_REQUEST_PREDICATE_INPUT,
        predicateGasUsed: predicateGasUsed1,
      };
      const predicateInput2: CoinTransactionRequestInput = {
        ...MOCK_REQUEST_PREDICATE_INPUT,
        predicateGasUsed: predicateGasUsed2,
      };

      const messageInput: MessageTransactionRequestInput = {
        ...MOCK_REQUEST_MESSAGE_INPUT,
        witnessIndex: 0,
      };

      const inputs = [coinInput, predicateInput1, predicateInput2, messageInput];
      const txBytesSize = 820;
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;

      // only one witnesses
      const expectedGasFromInputs = bn(gasCosts.ecr1).mul(1);

      const vmCost = resolveGasDependentCosts(txBytesSize, gasCosts.vmInitialization);

      const expectedGasFromPredicate1 = vmCost.add(
        resolveGasDependentCosts(
          getBytesCopy(predicateInput1?.predicate || '0x').length,
          gasCosts.contractRoot
        ).add(predicateGasUsed1)
      );

      const expectedGasFromPredicate2 = vmCost.add(
        resolveGasDependentCosts(
          getBytesCopy(predicateInput2?.predicate || '0x').length,
          gasCosts.contractRoot
        ).add(predicateGasUsed2)
      );

      const expectedTotal = expectedGasFromInputs
        .add(expectedGasFromPredicate1)
        .add(expectedGasFromPredicate2);

      expect(gasUsedByInputs(inputs, txBytesSize, gasCosts).toNumber()).toBe(
        expectedTotal.toNumber()
      );
    });

    it('should return 0 when no inputs are were given', () => {
      const inputs: TransactionRequestInput[] = [];
      const txBytesSize = 670;
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;

      expect(gasUsedByInputs(inputs, txBytesSize, gasCosts).toNumber()).toBe(0);
    });
  });

  describe('getMinGas', () => {
    it('should properly calculate min gas', () => {
      const txBytesSize = 1190;
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;
      const gasPerByte = bn(MOCK_CHAIN.consensusParameters.feeParams.gasPerByte);
      const inputs = [MOCK_COIN_INPUT, MOCK_REQUEST_MESSAGE_INPUT];
      const metadataGas = bn(710);

      const vmInitGas = resolveGasDependentCosts(txBytesSize, gasCosts.vmInitialization);
      const inputGas = gasUsedByInputs(inputs, txBytesSize, gasCosts);

      const expectedMinGas = vmInitGas
        .add(bn(txBytesSize).mul(gasPerByte))
        .add(inputGas)
        .add(metadataGas)
        .maxU64();

      const minGas = getMinGas({
        inputs,
        gasCosts,
        txBytesSize,
        metadataGas,
        gasPerByte,
      });

      expect(expectedMinGas.eq(minGas)).toBeTruthy();
    });
  });

  describe('getMaxGas', () => {
    it('should properly calculate max gas (W/ WITNESS LIMIT)', () => {
      const gasPerByte = bn(MOCK_CHAIN.consensusParameters.feeParams.gasPerByte);
      const witnessLimit = bn(800);
      const witnessesLength = 128;
      const minGas = bn(567);
      const gasLimit = bn(10_000);

      const expectedMaxGas = witnessLimit
        .sub(bn(witnessesLength))
        .mul(gasPerByte)
        .add(minGas)
        .add(gasLimit);

      const maxGas = getMaxGas({
        gasPerByte,
        witnessLimit,
        witnessesLength,
        minGas,
        gasLimit,
      });

      expect(expectedMaxGas.eq(maxGas)).toBeTruthy();
    });

    it('should properly calculate max gas (W/ WITNESS LIMIT EXCEEDED)', () => {
      const gasPerByte = bn(MOCK_CHAIN.consensusParameters.feeParams.gasPerByte);
      const witnessLimit = bn(200);
      const witnessesLength = 500;
      const minGas = bn(210);

      const expectedMaxGas = minGas;

      const maxGas = getMaxGas({
        gasPerByte,
        witnessLimit,
        witnessesLength,
        minGas,
      });

      expect(expectedMaxGas.eq(maxGas)).toBeTruthy();
    });

    it('should properly calculate max gas (W/O WITNESS LIMIT)', () => {
      const gasPerByte = bn(MOCK_CHAIN.consensusParameters.feeParams.gasPerByte);
      const witnessLimit = undefined;
      const witnessesLength = 64;
      const minGas = bn(350);

      const expectedMaxGas = minGas;

      const maxGas = getMaxGas({
        gasPerByte,
        witnessLimit,
        witnessesLength,
        minGas,
      });

      expect(expectedMaxGas.eq(maxGas)).toBeTruthy();
    });
  });

  describe('calculateMetadataGasForTxScript', () => {
    it('should properly calculate metadata gas for Script Transaction', () => {
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;
      const txBytesSize = 666;

      const expectedMetadataGas = resolveGasDependentCosts(txBytesSize, gasCosts.s256);

      const metadataGas = calculateMetadataGasForTxScript({
        gasCosts,
        txBytesSize,
      });

      expect(expectedMetadataGas.eq(metadataGas)).toBeTruthy();
    });
  });
  describe('calculateMetadataGasForTxCreate', () => {
    it('should properly calculate metadata gas for Create Transaction', () => {
      const gasCosts = MOCK_CHAIN.consensusParameters.gasCosts;
      const contractBytesSize = bn(450);
      const stateRootSize = 200;
      const txBytesSize = 910;

      const contractRootGas = resolveGasDependentCosts(contractBytesSize, gasCosts.contractRoot);
      const stateRootGas = resolveGasDependentCosts(stateRootSize, gasCosts.stateRoot);
      const txIdGas = resolveGasDependentCosts(txBytesSize, gasCosts.s256);
      const contractIdInputSize = bn(4 + 32 + 32 + 32);
      const contractIdGas = resolveGasDependentCosts(contractIdInputSize, gasCosts.s256);
      const expectedMetadataGas = contractRootGas.add(stateRootGas).add(txIdGas).add(contractIdGas);

      const metadataGas = calculateMetadataGasForTxCreate({
        gasCosts,
        contractBytesSize,
        stateRootSize,
        txBytesSize,
      });

      expect(expectedMetadataGas.eq(metadataGas)).toBeTruthy();
    });
  });
});
