import "@/styles/globals.css";
import { FuelProvider } from "@fuel-wallet/react";
import type { AppProps } from "next/app";

// #region wallet-sdk-react-provider
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FuelProvider>
      <Component {...pageProps} />
    </FuelProvider>
  );
}
// #endregion wallet-sdk-react-provider
