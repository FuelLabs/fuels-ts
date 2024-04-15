import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { FuelProvider } from "@fuels/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FuelConfig } from "fuels";
import { defaultConnectors } from "@fuels/connectors";
import { ENABLE_FUEL_DEV_CONNECTOR } from "@/lib";
import React from "react";

export const queryClient: QueryClient = new QueryClient()
export const fuelConfig: FuelConfig = {
  connectors: defaultConnectors({
    devMode: ENABLE_FUEL_DEV_CONNECTOR,
  })
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <FuelProvider fuelConfig={fuelConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FuelProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
