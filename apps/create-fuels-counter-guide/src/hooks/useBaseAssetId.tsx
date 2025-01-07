import { useNamedQuery, useProvider } from "@fuels/react";

export const useBaseAssetId = () => {
  const { provider } = useProvider();

  return useNamedQuery("baseAssetId", {
    queryKey: ["baseAssetId"],
    queryFn: async () => {
      if (!provider) {
        throw new Error("Provider not found");
      }

      return await provider.getBaseAssetId();
    },
    placeholderData: undefined,
  });
};
