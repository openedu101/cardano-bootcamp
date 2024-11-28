import { useEffect, useState } from 'react'
import { useLucid } from './context/LucidProvider'
import { TransferAda } from './components/TransferAda';
import { HelloWorldValidator } from './components/HelloWorldValidator';
import { Mint } from './components/Mint';

function App() {
  const { lucid, connectWallet, address, getUTxOs } = useLucid();

  useEffect(() => {
    async function temp() {
      const utxos = await getUTxOs();
      console.log(utxos);
    }
    temp();
  }, [address])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mb-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Hello Workshop1 - Cardano bootcamp
          </h1>

          <button
            onClick={connectWallet}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 mb-6"
          >
            Connect Wallet
          </button>

          {address && (
            <div className="bg-gray-100 rounded-lg p-4 break-all">
              <p className="text-sm text-gray-600 mb-1">Connected Wallet Address:</p>
              <p className="font-mono text-gray-800">{address}</p>
            </div>
          )}
        </div>
        <TransferAda />
        <HelloWorldValidator />
        <Mint />
      </div>
    </>
  )
}

export default App
