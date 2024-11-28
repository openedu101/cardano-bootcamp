import React, { useState } from 'react'
import { useLucid } from '../context/LucidProvider';

export const TransferAda = () => {
    const { lucid } = useLucid();
    const [ada, setAda] = useState<number>(0);
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("")

    const transferAda = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const tx = await lucid.newTx()
            .payToAddress(receiverAddress, { lovelace: BigInt(ada) * 1000000n })
            .complete();

        const signedTx = await tx.sign().complete();

        const txHashResult = await signedTx.submit();
        setTxHash(txHashResult);
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mb-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Transfer Ada
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Receiver Address</label>
                    <input 
                        type="text" 
                        value={receiverAddress} 
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter receiver's address"
                    />
                </div>
                <button 
                    onClick={transferAda}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Transfer
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
