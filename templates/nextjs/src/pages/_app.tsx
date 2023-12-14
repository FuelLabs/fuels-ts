import "@/styles/globals.css";
import { darkTheme, setFuelThemes, ThemeProvider } from "@fuel-ui/react";
import type { AppProps } from "next/app";

setFuelThemes({
  themes: {
    dark: darkTheme,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
