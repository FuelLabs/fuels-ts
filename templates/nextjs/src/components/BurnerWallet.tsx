import { useContext } from "react";
import { AppContext } from "./Layout";
import toast from "react-hot-toast";

const getTruncatedAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Address copied to clipboard");
};

export const BurnerWallet = () => {
  const { burnerWallet, burnerWalletBalance } = useContext(AppContext);

  if (!burnerWallet) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center">
      <span className="text-gray-400">
        {getTruncatedAddress(burnerWallet.address.toB256() as string)}
      </span>
      <img
        src="/copy.svg"
        alt="copy"
        className="cursor-pointer h-5 hover:opacity-80 active:scale-[90%]"
        onClick={() => copyToClipboard(burnerWallet.address.toB256() as string)}
      />
      <span className="text-gray-400">
        Balance: {burnerWalletBalance?.toString()}
      </span>
    </div>
  );
};
