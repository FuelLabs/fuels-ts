export const getWalletEnv = (params: { source: Record<string, string | undefined> }) => {
  const { source } = params;

  return {
    FUEL_NETWORK_URL: source.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/graphql',
  };
};
