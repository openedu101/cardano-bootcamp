import { useEffect } from "react";
import { useLucid } from "./context/LucidProvider";
import { HelloWorldValidator } from "./components/HelloWorldValidator";

function App() {
  const { connectWallet, address, getUTxOs, lucid } = useLucid();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      const utxos = await getUTxOs(address);
      // const datum = await getDatum(utxos[0].datumHash);
      console.log(utxos);
    }
    fetchData();
  }, [address])

  const sendAda = async () => {
    const tx = await lucid?.newTx()
      .payToAddress("addr_test1qpj8sz5w3znw9nhgj9pps9y8pmxly38nv2s4vmu9p0wh0x5mrs4zxnqcw24vwee22a69quzfqvsnhhgx56n40x8uxgwq3l2vjt", { lovelace: 5000000n })
      .complete(); // 10000000000n

    const signedTx = await tx?.sign().complete();

    const txHash = await signedTx?.submit();

    console.log(txHash);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cardano Wallet Demo</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>

        {address && (
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">Connected Address:</p>
            <p className="font-mono break-all">{address}</p>
          </div>
        )}

        <button
          onClick={sendAda}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={!address}
        >
          Send ADA
        </button>
      </div>

      <HelloWorldValidator />
    </div>
  )
}

export default App
