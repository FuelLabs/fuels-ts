import { BN, Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";
import { createContext, useEffect, useState } from "react";
import { BurnerWallet } from "./BurnerWallet";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { NODE_URL } from "@/lib";
import { useConnectUI, useDisconnect } from "@fuel-wallet/react";
import { WalletDisplay } from "./WalletDisplay";
import { useBurnerWallet } from "@/hooks/useBurnerWallet";
import { useBrowserWallet } from "@/hooks/useBrowserWallet";

export const AppContext = createContext<{
  faucetWallet?: WalletUnlocked;
  setFaucetWallet?: (wallet: WalletUnlocked) => void;

  burnerWallet?: WalletUnlocked;
  burnerWalletBalance?: BN;
  refreshBurnerWalletBalance?: () => Promise<void>;

  browserWallet?: WalletLocked;
  browserWalletBalance?: BN;
  refreshBrowserWalletBalance?: () => Promise<void>;

  activeWallet: "burner" | "connected";
}>({
  activeWallet: "burner",
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  const { burnerWallet, burnerWalletBalance, refreshBurnerWalletBalance } =
    useBurnerWallet();

  const {
    browserWallet,
    browserWalletBalance,
    isBrowserWalletConnected,
    refreshBrowserWalletBalance,
    browserWalletNetwork,
  } = useBrowserWallet();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const [activeWallet, setActiveWallet] = useState<"burner" | "connected">(
    "burner",
  );

  useEffect(() => {
    if (browserWallet) {
      setActiveWallet("connected");
    } else {
      setActiveWallet("burner");
    }
  }, [browserWallet]);

  useEffect(() => {
    (async () => {
      if (!faucetWallet) {
        const provider = await Provider.create(NODE_URL);
        const wallet = Wallet.fromPrivateKey("0x01", provider);
        setFaucetWallet(wallet);
      }
    })().catch(console.error);
  }, [faucetWallet]);

  const topUpWallet = async (walletType: "burner" | "connected") => {
    const wallet = walletType === "burner" ? burnerWallet : browserWallet;

    if (!wallet) {
      return console.error("Unable to topup wallet because wallet is not set.");
    }

    if (!faucetWallet) {
      return toast.error("Faucet wallet not found.");
    }

    const tx = await faucetWallet?.transfer(wallet.address, 10_000);
    await tx?.waitForResult();

    toast.success("Wallet topped up!");

    if (walletType === "burner") {
      await refreshBurnerWalletBalance?.();
    } else {
      await refreshBrowserWalletBalance?.();
    }
  };

  const shouldShowTopUpButton =
    (browserWallet && browserWalletBalance?.lt(10_000)) ||
    (!browserWallet && burnerWallet && burnerWalletBalance?.lt(10_000));

  const shouldShowAddNetworkButton =
    browserWallet &&
    browserWalletNetwork &&
    browserWalletNetwork?.url !== NODE_URL;

  const tryToAddNetwork = () => {
    return alert(
      `Please add the network ${NODE_URL} to your Fuel wallet, or swtich to it if you have it already, and refresh the page.`,
    );
  };

  return (
    <AppContext.Provider
      value={{
        faucetWallet,
        setFaucetWallet,
        burnerWallet,
        burnerWalletBalance,
        refreshBurnerWalletBalance,
        browserWallet,
        browserWalletBalance,
        refreshBrowserWalletBalance,
        activeWallet,
      }}
    >
      <Toaster />
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link href="/faucet">Faucet</Link>

          {isBrowserWalletConnected && (
            <Button onClick={disconnect}>Disconnect Wallet</Button>
          )}
          {!isBrowserWalletConnected && (
            <Button onClick={connect}>Connect Wallet</Button>
          )}

          {shouldShowAddNetworkButton && (
            <Button onClick={tryToAddNetwork} className="bg-red-500">
              Wrong Network
            </Button>
          )}

          <div className="ml-auto">
            {isBrowserWalletConnected ? (
              <WalletDisplay
                wallet={browserWallet}
                walletBalance={browserWalletBalance}
              />
            ) : (
              <BurnerWallet />
            )}
          </div>

          {shouldShowTopUpButton && (
            <Button
              onClick={() =>
                topUpWallet(isBrowserWalletConnected ? "connected" : "burner")
              }
            >
              Top-up Wallet
            </Button>
          )}
        </nav>

        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
