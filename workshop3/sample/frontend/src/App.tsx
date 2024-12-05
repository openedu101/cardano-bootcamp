import { MintTokenValidator } from "./components/MintTokenValidator";
import NFTMarketplace from "./components/NFTMarketplace";
import Header from "./components/Header";
import { SellNFT } from "./components/SellNFT";
import { MarketplaceValidator } from "./components/MarketplaceValidator";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 animate-gradient-slow">
      <div className="container mx-auto p-8 backdrop-blur-sm">
        <Header />
        <div className="grid gap-8">
          <NFTMarketplace />
          <MintTokenValidator />
          <MarketplaceValidator />
        </div>
      </div>
    </div>
  )
}

export default App
