import React, { useState } from 'react';
import { Data, fromText, MintingPolicy, PolicyId, Script, Unit } from "lucid-cardano";
import { useLucid } from '../context/LucidProvider';

export const MintTokenValidator = () => {
    const { lucid } = useLucid();
    const [txHash, setTxHash] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [isFungible, setIsFungible] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFungible(event.target.value === 'ft');
        // Reset quantity to 1 for NFT
        if (event.target.value === 'nft') {
            setQuantity(1);
        }
    };

    const mintingPolicyId = async function () {
        if (!lucid) {
            throw new Error("Lucid instance not found");
        }

        const { paymentCredential } = lucid.utils.getAddressDetails(await lucid.wallet.address());

        if (!paymentCredential) {
            throw new Error("Payment credential not found");
        }

        const mintingPolicy: Script = lucid.utils.nativeScriptFromJson({
            type: "all",
            scripts: [
                { type: "sig", keyHash: paymentCredential.hash },
                { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
            ],
        });

        const policyId: string = lucid.utils.mintingPolicyToId(mintingPolicy);

        return { policyId: policyId, mintingPolicy: mintingPolicy };
    };

    const mintAssetService = async function () {
        try {
            setLoading(true);
            if (!lucid) {
                throw new Error("Lucid instance not found");
            }

            const { mintingPolicy, policyId } = await mintingPolicyId();
            const assetName = fromText(name);
            const tx = await lucid
                .newTx()
                .mintAssets({ [policyId + assetName]: BigInt(quantity) })
                .attachMetadata(isFungible ? 20 : 721, {
                    [policyId]: {
                        [name]: {
                            name: name,
                            description: description,
                            image: image,
                            mediaType: "image/png",
                        },
                    },
                })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);

            setTxHash(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Mint/Burn Tokens</h2>
            <div className="flex flex-col gap-4 p-4 bg-white shadow rounded">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tokenType"
                                value="nft"
                                checked={!isFungible}
                                onChange={handleTypeChange}
                                className="mr-2"
                            />
                            NFT
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tokenType"
                                value="ft"
                                checked={isFungible}
                                onChange={handleTypeChange}
                                className="mr-2"
                            />
                            Fungible Token
                        </label>
                    </div>
                    {isFungible && (
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            placeholder="Quantity"
                            className="border rounded p-2"
                        />
                    )}
                    <input
                        type="text"
                        placeholder="NFT Name"
                        className="border rounded p-2"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description" 
                        className="border rounded p-2"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        className="border rounded p-2"
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={mintAssetService}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Mint Tokens'}
                        </button>
                    </div>
                </div>
                {txHash && (
                    <div className="bg-gray-100 p-4 rounded">
                        <p className="text-sm">
                            Transaction hash:
                            <a 
                                href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono ml-2 break-all text-blue-500 hover:text-blue-700"
                            >
                                {txHash}
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
