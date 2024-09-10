import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Fuel App</title>
        <link rel="icon" href="/fuel.ico" />
      </Head>
      <Toaster />
      <div className="flex flex-col">
        <Navbar />

        <div className="min-h-screen items-center p-0 md:p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </>
  );
};
