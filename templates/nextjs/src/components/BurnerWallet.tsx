import { useContext } from "react";
import { AppContext } from "./Layout";
import { WalletDisplay } from "./WalletDisplay";

export const BurnerWallet = () => {
  const { burnerWallet, burnerWalletBalance } = useContext(AppContext);

  return (
    <WalletDisplay wallet={burnerWallet} walletBalance={burnerWalletBalance} />
  );
};
