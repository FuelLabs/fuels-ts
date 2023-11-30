import "@/styles/globals.css";
import { FuelProvider } from "@fuel-wallet/react";
import {
  createTheme,
  darkTheme,
  setFuelThemes,
  ThemeProvider,
} from "@fuel-ui/react";
import type { AppProps } from "next/app";

setFuelThemes({
  themes: {
    dark: darkTheme,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <FuelProvider>
        <Component {...pageProps} />
      </FuelProvider>
    </ThemeProvider>
  );
}
