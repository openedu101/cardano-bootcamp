import React, { useState } from 'react'
import { useLucid } from '../context/LucidProvider';
import { Data, fromText } from 'lucid-cardano';
import { HelloWorldDatum } from '../validators/hello-world/datum';
import getHelloWorldValidator from '../validators/hello-world';
import { HelloWorldRedeemer } from '../validators/hello-world/redeemer';

export const HelloWorldValidator = () => {
  const [ada, setAda] = useState(0);
  const [txHash, setTxHash] = useState<string>("");
  const [lockingLoading, setLockingLoading] = useState(false);
  const [unlockingLoading, setUnlockingLoading] = useState(false);
  const { lucid, address } = useLucid();

  const lockAda = async () => {
    setLockingLoading(true);
    try {
      if (!address) {
        throw new Error("Address not found");
      }

      const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

      if (!ownerPubKeyHash) {
        throw new Error("Owner public key hash not found");
      }

      const datum = Data.to(
        {
          owner: ownerPubKeyHash
        },
        HelloWorldDatum
      )

      const validator = getHelloWorldValidator();

      const contractAddress = lucid?.utils.validatorToAddress(validator)

      if (!contractAddress) {
        throw new Error("Contract address not found");
      }

      const tx = await lucid?.newTx().payToContract(contractAddress, { inline: datum }, {
        lovelace: BigInt(ada) * 10n ** 6n
      }).complete();

      if (!tx) {
        throw new Error("Transaction not found");
      }

      const signedTx = await tx.sign().complete();

      const txHash = await signedTx.submit();

      setTxHash(txHash);
    } catch (error) {
      console.error("Error locking ADA:", error);
    } finally {
      setLockingLoading(false);
    }
  }

  const unlockAda = async () => {
    try {
      setUnlockingLoading(true);

      const redeemer = Data.to({
        msg: fromText("Hello, World!")
      }, HelloWorldRedeemer)

      const validator = getHelloWorldValidator();

      const contractAddress = lucid?.utils.validatorToAddress(validator)

      if (!contractAddress) {
        throw new Error("Contract address not found");
      }

      const utxos = await lucid?.utxosAt(contractAddress); // get utxos at contract address

      if (!address) {
        throw new Error("Address not found");
      }

      const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

      if (!ownerPubKeyHash) {
        throw new Error("Owner public key hash not found");
      }

      // const utxos = scriptUTxOs?.filter((utxo) => {
      //   try {
      //     const temp = Data.from(utxo.datum as string);
      //     return temp.owner === ownerPubKeyHash;
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });

      console.log("Utxo:", utxos);


      if (!utxos || utxos.length === 0) {
        throw new Error("No UTXOs found at contract address");
      }
      console.log("Redeemer:", redeemer);

      const tx = await lucid?.newTx().collectFrom([utxos[0]], redeemer).attachSpendingValidator(validator).addSigner(address).complete();

      if (!tx) {
        throw new Error("Transaction not found");
      }

      const signedTx = await tx.sign().complete();

      const txHash = await signedTx.submit();

      setTxHash(txHash);
    } catch (error) {
      console.error("Error unlocking ADA:", error);
    } finally {
      setUnlockingLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="border-t pt-8">
        <h2 className="text-3xl font-bold mb-6">Hello World Validator</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="ada-amount" className="text-sm font-medium text-gray-700">
              Amount of ADA
            </label>
            <input 
              id="ada-amount"
              type="number" 
              value={ada} 
              onChange={(e) => setAda(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={lockAda} 
              disabled={lockingLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {lockingLoading ? "Locking..." : "Lock Ada"}
            </button>
            
            <button
              onClick={unlockAda}
              disabled={unlockingLoading} 
              className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {unlockingLoading ? "Unlocking..." : "Unlock Ada"}
            </button>
          </div>

          {txHash && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Transaction Hash:</p>
              <a 
                href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm break-all text-blue-500 hover:text-blue-700"
              >
                {txHash}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
