import { Data } from 'lucid-cardano';
import React, { useState } from 'react'
import { HelloWorldDatum } from '../validator/datum';
import { useLucid } from '../context/LucidProvider';
import { getValidator } from '../validator';

export const HelloWorldValidator = () => {
    const [ada, setAda] = useState<number>(0);
    const [txHash, setTxHash] = useState<string>("");

    const { lucid, address } = useLucid();

    const lockAda = async () => {
        try {
            if (!lucid || !address) {
                throw new Error("Lucid or address not found");
            }

            const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

            if (!ownerPubKeyHash) {
                throw new Error("Owner public key hash not found");
            }

            const datum = Data.to({
                owner: ownerPubKeyHash
            }, HelloWorldDatum)

            const validator = getValidator();

            const contractAddress = await lucid.utils.validatorToAddress(validator);

            if (!contractAddress) {
                throw new Error("Contract address not found");
            }

            const tx = await lucid.newTx().payToContract(contractAddress, {
                inline: datum
            }, {
                lovelace: BigInt(ada * 10 ** 6)
            }).complete();

            const signedTx = await tx.sign().complete();

            const txHashResult = await signedTx.submit();

            setTxHash(txHashResult);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Lock Ada with Validator
            </h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ADA)</label>
                    <input 
                        type="number" 
                        value={ada} 
                        onChange={(e) => setAda(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter ADA amount"
                    />
                </div>
                <button 
                    onClick={lockAda}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Lock Ada
                </button>
                {txHash && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Transaction Hash:</p>
                        <p className="font-mono text-gray-800 break-all">{txHash}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
