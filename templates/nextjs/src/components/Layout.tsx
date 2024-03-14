import { BN, Provider, Wallet, WalletUnlocked } from "fuels";
import { createContext, useCallback, useEffect, useState } from "react";
import { BurnerWallet } from "./BurnerWallet";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { NODE_URL } from "@/lib";

const BURNER_WALLET_LOCAL_STORAGE_KEY = "create-fuels-burner-wallet-pk";

export const AppContext = createContext<{
  faucetWallet?: WalletUnlocked;
  setFaucetWallet?: (wallet: WalletUnlocked) => void;

  burnerWallet?: WalletUnlocked;
  setBurnerWallet?: (wallet: WalletUnlocked) => void;

  burnerWalletBalance?: BN;
  setBurnerWalletBalance?: (balance: BN) => void;

  refreshBurnerWalletBalance?: () => Promise<void>;
}>({});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  const [burnerWallet, setBurnerWallet] = useState<WalletUnlocked>();
  const [burnerWalletBalance, setBurnerWalletBalance] = useState<BN>();

  const [initialTopupDone, setInitialTopupDone] = useState(false);

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
      topUpBurnerWallet();
      setInitialTopupDone(true);
    }
  }, [faucetWallet, burnerWalletBalance, initialTopupDone]);

  const refreshBurnerWalletBalance = useCallback(async () => {
    const burnerWalletBalance = await burnerWallet?.getBalance();
    setBurnerWalletBalance(burnerWalletBalance);
  }, [burnerWallet]);

  const topUpBurnerWallet = async () => {
    if (!burnerWallet) {
      return toast.error("Burner wallet not found.");
    }

    if (!faucetWallet) {
      return toast.error("Faucet wallet not found.");
    }

    const tx = await faucetWallet.transfer(burnerWallet.address, 10_000);
    await tx.waitForResult();

    toast.success("Wallet topped up!");

    await refreshBurnerWalletBalance?.();
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
      }}
    >
      <Toaster />
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link href="/faucet">Faucet</Link>

          <div className="ml-auto">
            <BurnerWallet />
          </div>

          {burnerWalletBalance && burnerWalletBalance.lte(100) && (
            <Button onClick={topUpBurnerWallet}>Top-up Wallet</Button>
          )}
        </nav>

        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
