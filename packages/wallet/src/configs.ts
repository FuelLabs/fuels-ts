export const getFuelNetworkURL = (params: {
  source: Record<string, string | undefined> | undefined;
}) => {
  const { source } = params;

  return {
    FUEL_NETWORK_URL: source?.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/graphql',
  };
};
