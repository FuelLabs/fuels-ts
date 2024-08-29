import toast, { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { CURRENT_ENVIRONMENT, NODE_URL } from "../lib";
import { useConnectUI, useDisconnect } from "@fuels/react";
import { WalletDisplay } from "./WalletDisplay";
import { useBrowserWallet } from "../hooks/useBrowserWallet";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { useFaucet } from "../hooks/useFaucet";
import { bn } from "fuels";
import { useRouter } from "@tanstack/react-router";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { faucetWallet } = useFaucet();

  const { navigate } = useRouter();

  const {
    wallet: browserWallet,
    isConnected: isBrowserWalletConnected,
    network: browserWalletNetwork,
  } = useBrowserWallet();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const { wallet, refreshWalletBalance, walletBalance } = useActiveWallet();

  const topUpWallet = async () => {
    if (!wallet) {
      return console.error("Unable to topup wallet because wallet is not set.");
    }

    /**
     * If the current environment is local, transfer 5 ETH to the wallet
     * from the local faucet wallet
     */
    if (CURRENT_ENVIRONMENT === "local") {
      if (!faucetWallet) {
        return toast.error("Faucet wallet not found.");
      }

      const tx = await faucetWallet?.transfer(
        wallet.address,
        bn.parseUnits("5"),
      );
      await tx?.waitForResult();

      toast.success("Wallet topped up!");

      return await refreshWalletBalance?.();
    }

    // If the current environment is testnet, open the faucet page
    if (CURRENT_ENVIRONMENT === "testnet") {
      return navigate({
        to: "/faucet",
      });
    }
  };

  const showTopUpButton = walletBalance?.lt(bn.parseUnits("5"));

  const showAddNetworkButton =
    browserWallet &&
    browserWalletNetwork &&
    browserWalletNetwork?.url !== NODE_URL;

  const tryToAddNetwork = () => {
    return alert(
      `Please add the network ${NODE_URL} to your Fuel wallet, or swtich to it if you have it already, and refresh the page.`,
    );
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col bg-black text-white">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link href="/faucet">Faucet</Link>

          {isBrowserWalletConnected && (
            <Button onClick={disconnect}>Disconnect Wallet</Button>
          )}
          {!isBrowserWalletConnected && (
            <Button onClick={connect}>Connect Wallet</Button>
          )}

          {showAddNetworkButton && (
            <Button onClick={tryToAddNetwork} className="bg-red-500">
              Wrong Network
            </Button>
          )}

          <div className="ml-auto">
            <WalletDisplay />
          </div>

          {showTopUpButton && (
            <Button onClick={() => topUpWallet()}>Top-up Wallet</Button>
          )}
        </nav>

        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </>
  );
};
