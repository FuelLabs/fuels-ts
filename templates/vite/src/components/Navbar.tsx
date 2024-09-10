import { FC, useState } from "react";
import { Link } from "./Link";
import {
  CURRENT_ENVIRONMENT,
  DOCS_URL,
  NODE_URL,
  TESTNET_FAUCET_LINK,
} from "../lib";
import { useConnectUI, useDisconnect } from "@fuels/react";
import { useBrowserWallet } from "../hooks/useBrowserWallet";
import { useActiveWallet } from "../hooks/useActiveWallet";
import { Button } from "./Button";
import { WalletDisplay } from "./WalletDisplay";
import { bn } from "fuels";
import { useFaucet } from "../hooks/useFaucet";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { faucetWallet } = useFaucet();
  const navigate = useNavigate();

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

    // If the current environment is testnet, open the testnet faucet link in a new tab
    if (CURRENT_ENVIRONMENT === "testnet") {
      return window.open(
        `${TESTNET_FAUCET_LINK}?address=${wallet.address.toAddress()}`,
        "_blank",
      );
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
      {/* Larger screens */}
      <nav className="hidden md:flex justify-between items-center p-4 bg-black text-white gap-6">
        <Link href="/">Home</Link>

        <Link href={DOCS_URL} target="_blank">
          Docs
        </Link>

        {showAddNetworkButton && (
          <Button onClick={tryToAddNetwork} className="bg-red-500">
            Wrong Network
          </Button>
        )}

        <div className="ml-auto">
          <WalletDisplay />
        </div>

        {showTopUpButton && (
          <Button
            className="bg-gray-500"
            onClick={() => {
              navigate({ to: "/faucet" });
            }}
          >
            Faucet
          </Button>
        )}

        {isBrowserWalletConnected && (
          <Button className="bg-red-600" onClick={disconnect}>
            Disconnect
          </Button>
        )}

        {!isBrowserWalletConnected && (
          <Button onClick={connect}>Connect Wallet</Button>
        )}
      </nav>

      {/* Mobile. Should be a hamburger menu */}
      <nav className="flex flex-col md:hidden p-4 bg-black text-white items-center gap-4">
        <img
          src={isMobileMenuOpen ? "/close.svg" : "/hamburger.svg"}
          alt="menu"
          className="w-8 h-8 ml-auto cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {isMobileMenuOpen && (
          <>
            <Link href="/">Home</Link>

            <Link href={DOCS_URL} target="_blank">
              Docs
            </Link>

            <Link href="/faucet">Faucet</Link>

            {isBrowserWalletConnected && (
              <Button onClick={disconnect}>Disconnect Wallet</Button>
            )}
            {!isBrowserWalletConnected && (
              <Button onClick={connect}>Connect Wallet</Button>
            )}

            {showAddNetworkButton && (
              <Button onClick={() => toast.success("Adding network")}>
                Add Network
              </Button>
            )}

            <div>
              <WalletDisplay />
            </div>

            {showTopUpButton && (
              <Button onClick={() => topUpWallet()}>Top-up Wallet</Button>
            )}
          </>
        )}
      </nav>
    </>
  );
};
