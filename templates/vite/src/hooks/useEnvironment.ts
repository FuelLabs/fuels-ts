import contractIds from '../sway-api/contract-ids.json';
import { TESTNET_NETWORK_URL } from 'fuels';

/**
 * Hook to get environment dependent values.
 */
export const useEnvironment = () => {
  const environments = { LOCAL: 'local', TESTNET: 'testnet' };
  const environment = process.env.VITE_DAPP_ENVIRONMENT || environments.LOCAL;
  const isLocal = environment === environments.LOCAL;
  const isTestnet = environment === environments.TESTNET;

  const localProviderUrl = `http://127.0.0.1:${process.env.VITE_FUEL_NODE_PORT || 4000}/v1/graphql`;
  const testnetProviderUrl = TESTNET_NETWORK_URL;
  const providerUrl = isLocal ? localProviderUrl : testnetProviderUrl;
  const playgroundUrl = providerUrl.replace('v1/graphql', 'v1/playground');

  const localContractId = contractIds.testContract;
  const testnetContractId = process.env.VITE_TESTNET_CONTRACT_ID as string;
  const contractId = isLocal ? localContractId : testnetContractId;

  const testnetFaucetUrl = 'https://faucet-testnet.fuel.network/';

  return {
    environment,
    environments,
    isLocal,
    isTestnet,
    contractId,
    localContractId,
    testnetContractId,
    testnetFaucetUrl,
    localProviderUrl,
    testnetProviderUrl,
    providerUrl,
    playgroundUrl,
  };
};
