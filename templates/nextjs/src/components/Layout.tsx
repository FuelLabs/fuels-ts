import { BN, Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";
import { createContext, useCallback, useEffect, useState } from "react";
import { BurnerWallet } from "./BurnerWallet";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { NODE_URL } from "@/lib";
import {
  useAddNetwork,
  useConnectUI,
  useDisconnect,
  useIsConnected,
  useNetwork,
  useWallet,
} from "@fuel-wallet/react";
import { WalletDisplay } from "./WalletDisplay";

const BURNER_WALLET_LOCAL_STORAGE_KEY = "create-fuels-burner-wallet-pk";

export const AppContext = createContext<{
  faucetWallet?: WalletUnlocked;
  setFaucetWallet?: (wallet: WalletUnlocked) => void;

  burnerWallet?: WalletUnlocked;
  setBurnerWallet?: (wallet: WalletUnlocked) => void;

  burnerWalletBalance?: BN;
  setBurnerWalletBalance?: (balance: BN) => void;

  refreshBurnerWalletBalance?: () => Promise<void>;

  connectedWallet?: WalletLocked;
  setConnectedWallet?: (wallet: WalletLocked) => void;

  connectedWalletBalance?: BN;
  setConnectedWalletBalance?: (balance: BN) => void;

  refreshConnectedWalletBalance?: () => Promise<void>;

  activeWallet: "burner" | "connected";
}>({
  activeWallet: "burner",
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  const [burnerWallet, setBurnerWallet] = useState<WalletUnlocked>();
  const [burnerWalletBalance, setBurnerWalletBalance] = useState<BN>();

  const [initialTopupDone, setInitialTopupDone] = useState(false);

  const [connectedWallet, setConnectedWallet] = useState<WalletLocked>();
  const [connectedWalletBalance, setConnectedWalletBalance] = useState<BN>();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { wallet: walletFromExtension } = useWallet();
  const { network } = useNetwork();
  const { addNetwork } = useAddNetwork();

  const [activeWallet, setActiveWallet] = useState<"burner" | "connected">(
    "burner",
  );

  useEffect(() => {
    if (walletFromExtension) {
      setActiveWallet("connected");

      const networkUrl = network?.url;

      if (networkUrl !== NODE_URL) {
        addNetwork(NODE_URL);
      }
    } else {
      setActiveWallet("burner");
    }
    setConnectedWallet(walletFromExtension);
    if (walletFromExtension) {
      (walletFromExtension as WalletLocked).getBalance().then((balance) => {
        setConnectedWalletBalance(balance);
      });
    } else {
      setConnectedWalletBalance(undefined);
    }
  }, [walletFromExtension]);

  useEffect(() => {
    (async () => {
      if (!faucetWallet) {
        const provider = await Provider.create(NODE_URL);
        const wallet = Wallet.fromPrivateKey("0x01", provider);
        setFaucetWallet(wallet);
      }
    })().catch(console.error);
  }, [faucetWallet]);

  useEffect(() => {
    (async () => {
      // check if burner wallet pk is stored in local storage
      const burnerWalletPk = localStorage.getItem(
        BURNER_WALLET_LOCAL_STORAGE_KEY,
      );

      let wallet: WalletUnlocked;

      if (burnerWalletPk) {
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.fromPrivateKey(burnerWalletPk, provider);
        setBurnerWallet(wallet);
      } else {
        // if not, create a new burner wallet
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.generate({ provider });

        localStorage.setItem(
          BURNER_WALLET_LOCAL_STORAGE_KEY,
          wallet.privateKey,
        );
        setBurnerWallet(wallet);
      }

      const burnerWalletBalance = await wallet?.getBalance();
      setBurnerWalletBalance(burnerWalletBalance);
    })().catch(console.error);
  }, []);

  useEffect(() => {
    if (faucetWallet && burnerWalletBalance?.lt(10_000) && !initialTopupDone) {
      topUpWallet("burner");
      setInitialTopupDone(true);
    }
  }, [faucetWallet, burnerWalletBalance, initialTopupDone]);

  const refreshBurnerWalletBalance = useCallback(async () => {
    const burnerWalletBalance = await burnerWallet?.getBalance();
    setBurnerWalletBalance(burnerWalletBalance);
  }, [burnerWallet]);

  const refreshConnectedWalletBalance = useCallback(async () => {
    const connectedWalletBalance = await connectedWallet?.getBalance();
    setConnectedWalletBalance(connectedWalletBalance);
  }, [connectedWallet]);

  const topUpWallet = async (walletType: "burner" | "connected") => {
    const wallet = walletType === "burner" ? burnerWallet : connectedWallet;

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
      await refreshConnectedWalletBalance?.();
    }
  };

  const shouldShowTopUpButton =
    (connectedWallet && connectedWalletBalance?.lt(10_000)) ||
    (!connectedWallet && burnerWallet && burnerWalletBalance?.lt(10_000));

  const shouldShowAddNetworkButton =
    connectedWallet && network && network?.url !== NODE_URL;

  const tryToAddNetwork = () => {
    try {
      addNetwork(NODE_URL);
    } catch (error) {
      console.error(error);
      toast.error(
        "You might already have localhost in your wallet. Just switch to it.",
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        faucetWallet,
        setFaucetWallet,
        burnerWallet,
        setBurnerWallet,
        burnerWalletBalance,
        setBurnerWalletBalance,
        refreshBurnerWalletBalance,
        connectedWallet,
        setConnectedWallet,
        connectedWalletBalance,
        setConnectedWalletBalance,
        refreshConnectedWalletBalance,
        activeWallet,
      }}
    >
      <Toaster />
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link href="/faucet">Faucet</Link>

          {isConnected && (
            <Button onClick={disconnect}>Disconnect Wallet</Button>
          )}
          {!isConnected && <Button onClick={connect}>Connect Wallet</Button>}

          {shouldShowAddNetworkButton && (
            <Button onClick={tryToAddNetwork} className="bg-red-500">
              Wrong Network
            </Button>
          )}

          <div className="ml-auto">
            {connectedWallet ? (
              <WalletDisplay
                wallet={connectedWallet}
                walletBalance={connectedWalletBalance}
              />
            ) : (
              <BurnerWallet />
            )}
          </div>

          {shouldShowTopUpButton && (
            <Button
              onClick={() =>
                topUpWallet(connectedWallet ? "connected" : "burner")
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
