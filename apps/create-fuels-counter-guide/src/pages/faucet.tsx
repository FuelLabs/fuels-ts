import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { useFaucet } from "@/hooks/useFaucet";
import { BN, bn } from "fuels";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Faucet() {
  const { faucetWallet } = useFaucet();

  const { refreshWalletBalance } = useActiveWallet();

  const [receiverAddress, setReceiverAddress] = useState<string>();
  const [amountToSend, setAmountToSend] = useState<BN>();

  const sendFunds = async () => {
    if (!faucetWallet) {
      return toast.error("Faucet wallet not found.");
    }

    if (!receiverAddress) {
      return toast.error("Receiver address not set");
    }

    if (!amountToSend) {
      return toast.error("Amount cannot be empty");
    }

    const tx = await faucetWallet.transfer(receiverAddress, amountToSend);
    await tx.waitForResult();

    toast.success("Funds sent!");

    await refreshWalletBalance?.();
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">Local Faucet</h3>

      <div className="flex gap-4 items-center">
        <span className="text-gray-400">Receiving address:</span>
        <Input
          className="w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-gray-400">Amount:</span>
        <Input
          className="w-full"
          value={amountToSend?.toString()}
          onChange={(e) =>
            setAmountToSend(e.target.value ? bn(e.target.value) : undefined)
          }
          placeholder="100"
          type="number"
        />
      </div>

      <Button onClick={sendFunds}>Send Funds</Button>
    </>
  );
}
