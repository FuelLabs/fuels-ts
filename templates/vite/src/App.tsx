import { useConnectUI, useDisconnect } from "@fuels/react";
import { bn } from "fuels";
import { Button } from "./components/Button";
import toast, { Toaster } from "react-hot-toast";
import { useActiveWallet } from "./hooks/useActiveWallet";
import { useBrowserWallet } from "./hooks/useBrowserWallet";
import { WalletDisplay } from "./components/WalletDisplay";
import { CURRENT_ENVIRONMENT, NODE_URL, TESTNET_FAUCET_LINK } from "./lib";
import { useFaucet } from "./hooks/useFaucet";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Counter";
import PredicateExample from "./pages/Predicate";
import ScriptExample from "./pages/Script";
import Faucet from "./pages/Faucet";
import { useBreakpoints } from "./hooks/useBreakpoints";
import "./App.css";
import { NavMenu } from "./components/NavMenu";


// const CONTRACT_ID =
//   "0x74fb4df9671c2e0db969570fa4fec292d338a945e65e633419d5c01fc609b72e";

export default function App() {
  const { wallet, walletBalance, refetchBalance } = useActiveWallet();
  const {
    wallet: browserWallet,
    isConnected: isBrowserWalletConnected,
    network: browserWalletNetwork,
  } = useBrowserWallet();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { isMobile } = useBreakpoints();


  const showAddNetworkButton =
    browserWallet &&
    browserWalletNetwork &&
    browserWalletNetwork?.url !== NODE_URL;

  const tryToAddNetwork = () => {
    return alert(
      `Please add the network ${NODE_URL} to your Fuel wallet, or swtich to it if you have it already, and refresh the page.`
    );
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="flex flex-col bg-black text-white">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          {!isMobile && (
            <>
              <Link className="text-fuel-green hover:underline" to="/">
                Home
              </Link>
              <Link
                to="https://docs.fuel.network"
                target="_blank"
                className="text-fuel-green hover:underline"
              >
                Fuel Docs
              </Link>
            </>
          )}
          {showAddNetworkButton && (
            <Button onClick={tryToAddNetwork} className="bg-red-500">
              Wrong Network
            </Button>
          )}
          <div className="ml-auto">
            <WalletDisplay />
          </div>
          {!isMobile && (
            <Button className="bg-gray-500" onClick={() => navigate("/faucet")}>
              Faucet
            </Button>
          )}
          {isBrowserWalletConnected && !isMobile && (
            <Button className="bg-red-600" onClick={disconnect}>
              Disconnect
            </Button>
          )}
          {!isBrowserWalletConnected && !isMobile && (
            <Button onClick={connect}>Connect Wallet</Button>
          )}
          {isMobile && <NavMenu address={wallet?.address.toString()} />}
        </nav>
        <div className="min-h-screen items-center justify-center flex flex-col gap-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predicate" element={<PredicateExample />} />
            <Route path="/script" element={<ScriptExample />} />
            <Route path="/faucet" element={<Faucet />} />
          </Routes>{" "}
        </div>
      </div>
    </>
  );
}
