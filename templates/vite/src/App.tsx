import { useConnectUI, useIsConnected, useNetwork } from "@fuels/react";
import { useEffect } from "react";

import { useRouter } from "./hooks/useRouter";
import Button from "./components/Button";
import Info from "./components/Info";
import Wallet from "./components/Wallet";
import Contract from "./components/Contract";
import Predicate from "./components/Predicate";
import Script from "./components/Script";
import Faucet from "./components/Faucet";
import { providerUrl } from "./lib.tsx";

function App() {
  const { connect } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();
  const { network } = useNetwork();
  const { view, views, setRoute } = useRouter();
  const isConnectedToCorrectNetwork = network?.url === providerUrl;

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main
      data-theme="dark"
      className="flex items-center justify-center lg:pt-6 text-zinc-50/90"
    >
      <div id="container" className="mx-8 mb-32 w-full max-w-6xl">
        <nav id="nav" className="flex items-center justify-center py-1 md:py-6">
          <a href="https://fuel.network/" target="_blank" rel="noreferrer">
            <img src="./logo_white.png" alt="Fuel Logo" className="w-[124px]" />
          </a>
        </nav>

        <div className="gradient-border rounded-2xl">
          <div className="grain rounded-2xl p-1.5 drop-shadow-xl">
            <div
              id="grid"
              className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-12"
            >
              <Info />
              <div className="col-span-5">
                <div className="gradient-border h-full rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950/80">
                  {!isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 lg:px-[25%]">
                      <Button onClick={() => connect()}>Connect Wallet</Button>
                    </section>
                  )}

                  {isConnected && !isConnectedToCorrectNetwork && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8">
                      <p className="text-center">
                        You are connected to the wrong network. Please switch to{" "}
                        <a
                          href={providerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-500/80 transition-colors hover:text-green-500"
                        >
                          {providerUrl}
                        </a>
                        &nbsp;in your wallet.
                      </p>
                    </section>
                  )}

                  {isConnected && isConnectedToCorrectNetwork && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8">
                      <div className="flex flex-col sm:flex-row gap-3">
                        {views.map((viewName) => (
                          <Button
                            key={viewName}
                            className="w-full sm:flex-1 capitalize"
                            color={view === viewName ? "primary" : "inactive"}
                            onClick={() => setRoute(viewName)}
                          >
                            {viewName}
                          </Button>
                        ))}
                      </div>

                      {view === "wallet" && <Wallet />}
                      {view === "contract" && <Contract />}
                      {view === "predicate" && <Predicate />}
                      {view === "script" && <Script />}
                      {view === "faucet" && <Faucet />}
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
