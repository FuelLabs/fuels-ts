import {
  useWallet,
  useIsConnected,
  useNetwork,
  useBalance,
} from "@fuels/react";

export const useActiveWallet = () => {
  const { wallet, isLoading: isWalletLoading } = useWallet();
  const { balance, refetch } = useBalance({
    address: wallet?.address.toB256(),
  });
  const { isConnected, isLoading: isConnectedLoading } = useIsConnected();
  const { network } = useNetwork();

  return {
    wallet,
    walletBalance: balance,
    refetchBalance: refetch,
    isPending: isWalletLoading || isConnectedLoading,
    isConnected,
    network,
  };
};
