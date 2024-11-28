import { fromText } from 'lucid-cardano';
import React, { useState } from 'react'
import { useLucid } from '../context/LucidProvider';

export const Mint = () => {
    const { lucid } = useLucid();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("");


    const getMintingPolicy = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const { paymentCredential } = lucid.utils.getAddressDetails(
            await lucid.wallet.address(),
        );

        if (!paymentCredential) {
            throw new Error("Payment credential not found");
        }


        const mintingPolicy = lucid.utils.nativeScriptFromJson(
            {
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential.hash },
                    {
                        type: "before",
                        slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                    },
                ],
            },
        );

        const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

        return {
            policyId, mintingPolicy
        }
    }

    const mint = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const { mintingPolicy, policyId } = await getMintingPolicy();

        const assetName = fromText(name);

        // 20 -> FT
        // 721 -> NFT
        const tx = await lucid.newTx()
            .mintAssets({ [policyId + assetName]: 1n })
            .attachMetadata(721, {
                [policyId]: {
                    [name]: {
                        name,
                        description,
                        image,
                        mediaType: "image/png"
                    }
                }
            })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHashResult = await signedTx.submit();
        setTxHash(txHashResult);
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mt-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Mint Token
            </h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Token Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter token name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter token description"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input 
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter image URL"
                    />
                </div>
                <button 
                    onClick={mint}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Mint Token
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
