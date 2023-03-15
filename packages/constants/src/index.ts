import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

// TODO: provider is any for now to avoid a circular dependency between @fuel-ts/constants and @fuel-ts/provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchConsensusParam = async (provider: any, paramName: string) => {
  if (!provider) {
    throw new Error('Provider is required to fetch consensus parameters.');
  }

  const chain = await provider.getChain();
  const consensusParams = chain.consensusParameters;

  return consensusParams[paramName];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnv = (params: { provider?: any } = {}) => {
  const { provider } = params;

  return {
    ZeroBytes32: '0x0000000000000000000000000000000000000000000000000000000000000000',
    get NativeAssetId() {
      return this.ZeroBytes32;
    },

    EmptyRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',

    /** Maximum contract size, in bytes. */
    getContractMaxSize: async () => fetchConsensusParam(provider, 'contractMaxSize') as Promise<BN>,

    /** Maximum number of witnesses. */
    getMaxWitnesses: async () => fetchConsensusParam(provider, 'maxWitnesses') as Promise<BN>,

    /** Maximum gas per transaction. */
    getMaxGasPerTx: async () => fetchConsensusParam(provider, 'maxGasPerTx') as Promise<BN>,

    // TODO: remove this once we figure out a way to properly fetch this and supply it to our `InvocationScope`s
    MAX_GAS_PER_TX: bn(100000000),

    /**
     * Gas Price factor
     * This is used to calculate the gas fee in Native Coins.
     * Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);
     */
    getGasPriceFactor: async () => fetchConsensusParam(provider, 'gasPriceFactor') as Promise<BN>,

    /** Gas charged per byte of the transaction. */
    getGasPerByte: async () => fetchConsensusParam(provider, 'gasPerByte') as Promise<BN>,

    /** Maximum length of script, in instructions. */
    getMaxScriptLength: async () => fetchConsensusParam(provider, 'maxScriptLength') as Promise<BN>,

    /** Maximum length of script data, in bytes. */
    getMaxScriptDataLength: async () =>
      fetchConsensusParam(provider, 'maxScriptDataLength') as Promise<BN>,

    /** Maximum number of static contracts. */
    MAX_STATIC_CONTRACTS: 255,

    /** Maximum length of predicate, in instructions. */
    getMaxPredicateLength: async () =>
      fetchConsensusParam(provider, 'maxPredicateLength') as Promise<BN>,

    /** Maximum length of predicate data, in bytes. */
    getMaxPredicateDataLength: async () =>
      fetchConsensusParam(provider, 'maxPredicateDataLength') as Promise<BN>,

    FAILED_TRANSFER_TO_ADDRESS_SIGNAL: '0xffffffffffff0001',
  };
};
