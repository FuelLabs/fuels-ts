import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { FuelProvider } from "@fuels/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FuelConfig } from "fuels";
import { defaultConnectors } from "@fuels/connectors";
import { ENABLE_FUEL_DEV_CONNECTOR } from "@/lib";
import React, { useEffect } from "react";
import { ActiveWalletProvider } from "@/hooks/useActiveWallet";

const queryClient: QueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  let fuelConfig: FuelConfig = {};

  useEffect(() => {
    fuelConfig = {
      connectors: defaultConnectors({
        devMode: ENABLE_FUEL_DEV_CONNECTOR,
      }),
    };
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <FuelProvider fuelConfig={fuelConfig}>
          <ActiveWalletProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ActiveWalletProvider>
        </FuelProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
