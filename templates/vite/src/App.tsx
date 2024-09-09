import { useConnectUI, useIsConnected } from "@fuels/react";

import Button from "./components/button";
import { useEffect, useState } from "react";

import Info from "./components/Info";
import { Account } from "./components/Wallet";
import Contract from "./components/Contract";

function App() {
  const { connect } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();
  const [tab, setTab] = useState<
    "wallet" | "contract" | "predicate" | "script"
  >("wallet");

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main
      data-theme="dark"
      className="flex items-center justify-center lg:h-screen dark:text-zinc-50/90"
    >
      <div id="container" className="mx-8 mb-32 w-full max-w-5xl lg:mb-0">
        <nav
          id="nav"
          className="flex items-center justify-center py-6 lg:pb-10 lg:pt-0"
        >
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

              <div className="col-span-4">
                <div className="gradient-border h-full rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950/80">
                  {!isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 ">
                      <Button onClick={() => connect()}>Connect Wallet</Button>
                    </section>
                  )}

                  {isConnected && (
                    <section className="flex h-full flex-col justify-center space-y-6 px-4 py-8 ">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          className="w-full sm:flex-1"
                          color={tab === "wallet" ? "primary" : "inactive"}
                          onClick={() => setTab("wallet")}
                        >
                          Wallet
                        </Button>
                        <Button
                          className="w-full sm:flex-1"
                          color={tab === "contract" ? "primary" : "inactive"}
                          onClick={() => setTab("contract")}
                        >
                          Contract
                        </Button>
                        <Button
                          className="w-full sm:flex-1"
                          color={tab === "predicate" ? "primary" : "inactive"}
                          onClick={() => setTab("predicate")}
                        >
                          Predicate
                        </Button>
                        <Button
                          className="w-full sm:flex-1"
                          color={tab === "script" ? "primary" : "inactive"}
                          onClick={() => setTab("script")}
                        >
                          Script
                        </Button>
                      </div>

                      {tab === "wallet" && <Account />}
                      {tab === "contract" && <Contract />}
                      {/* {tab === "predicate" && <Predicate />}
                      {tab === "script" && <Script />} */}
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
