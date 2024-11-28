import { Blockfrost, Lucid, UTxO } from "lucid-cardano";
import { createContext, useContext, useEffect, useState } from "react";

interface LucidContextType {
    lucid: Lucid | null
    address: string | null
    setLucid: (lucid: Lucid) => void
    connectWallet: () => Promise<void>
    getUTxOs: () => Promise<UTxO[]>
}

const LucidContext = createContext<LucidContextType | undefined>(undefined);

export const LucidProvider = ({ children }: { children: React.ReactNode }) => {
    const [lucid, setLucid] = useState<Lucid | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        async function initLucid() {
            const lucidInstance = await Lucid.new(
                new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprod2scEVYsLhCZ4PB6AiE4yuzTaNEsXe8SK"),
                "Preprod",
            );
            //   console.log(lucidInstance);
            setLucid(lucidInstance);
        }
        initLucid();
    }, [])

    const connectWallet = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const api = await window.cardano.nami.enable();
        lucid.selectWallet(api);
        
        const addressResult = await lucid.wallet.address(); 
        setAddress(addressResult);
    }

    const getUTxOs = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const utxos = await lucid.wallet.getUtxos();
        return utxos;
    }

    return (
        <LucidContext.Provider value={{ lucid, setLucid, address, connectWallet, getUTxOs }}>
            {children}
        </LucidContext.Provider>
    )
}

export const useLucid = () => {
    const context = useContext(LucidContext);
    if (!context) {
        throw new Error('useLucid must be used within a LucidProvider');
    }
    return context;
}
