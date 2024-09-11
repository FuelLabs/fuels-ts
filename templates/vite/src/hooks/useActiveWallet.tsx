import {
  useWallet,
  useIsConnected,
  useNetwork,
  useBalance,
} from "@fuels/react";
import { BN, Account, Network } from "fuels";

export const useActiveWallet: () => {
  wallet: Account | null | undefined;
  walletBalance: BN | null;
  refreshWalletBalance: () => void;
  isPending: boolean | null;
  isConnected: boolean | null;
  network: Network | null;
} = () => {
  const { wallet, isLoading: isWalletLoading } = useWallet();
  const { balance, refetch } = useBalance({
    address: wallet?.address.toB256(),
  });
  const { isConnected, isLoading: isConnectedLoading } = useIsConnected();
  const { network } = useNetwork();

  return {
    wallet,
    walletBalance: balance,
    refreshWalletBalance: refetch,
    isPending: isWalletLoading || isConnectedLoading,
    isConnected,
    network,
  };
};
