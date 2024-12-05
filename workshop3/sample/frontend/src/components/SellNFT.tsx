import React, { useState } from 'react';

export const SellNFT = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement NFT selling logic
    };

    return (
        <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-8">List Your NFT</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-white text-lg mb-2">NFT Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none"
                        placeholder="Enter NFT name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-white text-lg mb-2">Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none"
                        placeholder="Enter NFT description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-white text-lg mb-2">Price (ADA)</label>
                    <input
                        type="number"
                        id="price"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none"
                        placeholder="Enter price in ADA"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-white text-lg mb-2">NFT Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:transition-colors"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                    List NFT for Sale
                </button>
            </form>
        </div>
    );
};
