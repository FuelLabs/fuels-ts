import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { FuelProvider } from "@fuel-wallet/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FuelProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FuelProvider>
  );
}
