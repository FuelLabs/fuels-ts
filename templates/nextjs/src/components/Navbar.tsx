import { FC, useState } from "react";
import { Link } from "./Link";
import {
  CURRENT_ENVIRONMENT,
  DOCS_URL,
  NODE_URL,
  TESTNET_FAUCET_LINK,
} from "@/lib";
import { useConnectUI, useDisconnect } from "@fuels/react";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { Button } from "./Button";
import { WalletDisplay } from "./WalletDisplay";
import { bn } from "fuels";
import { useFaucet } from "@/hooks/useFaucet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { faucetWallet } = useFaucet();

  const router = useRouter();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const { wallet, network, isConnected } = useActiveWallet();

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const showAddNetworkButton = wallet && network && network?.url !== NODE_URL;

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

        {isConnected && (
          <Button
            className="bg-gray-500"
            onClick={() => {
              if (isSafari && wallet) {
                const redirectUrl = new URL(
                  "https://faucet-testnet.fuel.network/",
                );
                redirectUrl.searchParams.append(
                  "address",
                  wallet.address.toString(),
                );
                redirectUrl.searchParams.append(
                  "redirectUrl",
                  window.location.href,
                );
                window.location.href = redirectUrl.href;
              } else {
                router.push("/faucet");
              }
            }}
          >
            Faucet
          </Button>
        )}

        {isConnected && (
          <Button className="bg-red-600" onClick={disconnect}>
            Disconnect
          </Button>
        )}
        {!isConnected && <Button onClick={connect}>Connect Wallet</Button>}
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

            {isConnected && wallet && (
              <Button
                className="bg-gray-500"
                onClick={() => {
                  const redirectUrl = new URL(
                    "https://faucet-testnet.fuel.network/",
                  );
                  redirectUrl.searchParams.append(
                    "address",
                    wallet.address.toString(),
                  );
                  redirectUrl.searchParams.append(
                    "redirectUrl",
                    window.location.href,
                  );
                  window.location.href = redirectUrl.href;
                }}
              >
                Faucet
              </Button>
            )}
            {isConnected && (
              <Button onClick={disconnect}>Disconnect Wallet</Button>
            )}
            {!isConnected && <Button onClick={connect}>Connect Wallet</Button>}

            {showAddNetworkButton && (
              <Button onClick={() => toast.success("Adding network")}>
                Add Network
              </Button>
            )}

            <div>
              <WalletDisplay />
            </div>
          </>
        )}
      </nav>
    </>
  );
};
