import toast from "react-hot-toast";
import type { WalletUnlocked, WalletLocked, BN } from "fuels";

const getTruncatedAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Address copied to clipboard");
};

export const WalletDisplay = ({
  wallet,
  walletBalance,
}: {
  wallet?: WalletUnlocked | WalletLocked;
  walletBalance?: BN;
}) => {
  if (!wallet) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center">
      <span className="text-gray-400">
        {getTruncatedAddress(wallet.address.toB256() as string)}
      </span>
      <img
        src="/copy.svg"
        alt="copy"
        className="cursor-pointer h-5 hover:opacity-80 active:scale-[90%]"
        onClick={() => copyToClipboard(wallet.address.toB256() as string)}
      />
      <span className="text-gray-400">
        Balance: {walletBalance?.toString()}
      </span>
    </div>
  );
};
