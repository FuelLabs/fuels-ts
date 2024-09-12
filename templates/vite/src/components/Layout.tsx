import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <div className="flex flex-col bg-black text-white">
        <Navbar />

        <div className="min-h-screen items-center px-0 py-24 md:p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </>
  );
};
