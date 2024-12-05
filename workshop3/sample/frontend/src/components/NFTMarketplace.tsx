import React, { useState, useEffect } from 'react';

interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  owner: string;
}

const NFTMarketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<string>('');

  // Mock data - replace with actual NFT contract calls
  useEffect(() => {
    const fetchNFTs = async () => {
      // Simulate API call
      const mockNFTs: NFT[] = [
        {
          id: 1,
          name: "Cool NFT #1",
          description: "A very cool NFT",
          image: "https://placeholder.com/150",
          price: "0.1",
          owner: "0x123..."
        },
        // Add more mock NFTs here
      ];
      setNfts(mockNFTs);
      setLoading(false);
    };

    fetchNFTs();
  }, []);

  const buyNFT = async (nftId: number, price: string) => {
    try {
      // Add your web3 logic here to purchase NFT
      console.log(`Buying NFT ${nftId} for ${price} ETH`);
      // Implement actual purchase logic with smart contract
    } catch (error) {
      console.error('Error buying NFT:', error);
    }
  };

  const sellNFT = async (nftId: number) => {
    try {
      if (!price) return;
      // Add your web3 logic here to list NFT for sale
      console.log(`Listing NFT ${nftId} for ${price} ETH`);
      // Implement actual listing logic with smart contract
    } catch (error) {
      console.error('Error selling NFT:', error);
    }
  };

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          NFT Marketplace
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Discover unique digital assets and join the future of digital collectibles. Buy, sell, and trade NFTs with ease.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-purple-600 text-sm">{nft.name}</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  {/* Owner avatar placeholder */}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 truncate">{nft.owner}</p>
                  <p className="text-sm font-medium">{nft.price} Ⓝ</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>PolicyID</span>
                  <span className="font-mono">{nft.id.toString(16).padStart(8, '0')}</span>
                </div>
                <button className="text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;
