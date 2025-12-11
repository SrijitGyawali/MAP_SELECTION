"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import ProductCardSimple from "./product-card-simple";
import type { NepalRegion } from "@/types/map";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { filterProductsByLocation } from "@/data/mock-products";

const NepalLeafletMapSelectorEnhanced = dynamic(
  () => import("./nepal-leaflet-map-selector-enhanced"),
  {
    ssr: false,
  }
);

export default function MarketplaceViewEnhancedSimple() {
  const [selectedLocation, setSelectedLocation] = useState<NepalRegion | null>(
    null
  );
  const [darkMode, setDarkMode] = useState(false);

  const filteredProducts = useMemo(() => {
    return filterProductsByLocation(
      mockProducts,
      selectedLocation?.id || null
    );
  }, [selectedLocation]);

  const handleLocationSelect = (region: NepalRegion | null): void => {
    if (region === null) {
      setSelectedLocation(null);
      return;
    }
    if (selectedLocation?.id === region.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(region);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                style={{ 
                  background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                🎨 KALACHAIN ✨ ENHANCED UI ✨
              </h1>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Connecting Culture through Blockchain
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-1">
            <NepalLeafletMapSelectorEnhanced
              selectedCity={selectedLocation?.id || null}
              onCitySelect={handleLocationSelect}
              darkMode={darkMode}
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {selectedLocation ? `NFTs from ${selectedLocation.name}` : "All NFTs"}
              </h2>
              <span className={`text-sm font-medium px-4 py-2 rounded-full ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
              } shadow-md`}>
                {filteredProducts.length} NFT{filteredProducts.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className={`rounded-2xl shadow-xl p-12 text-center backdrop-blur-xl border ${
                darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"
              }`}>
                <div className="text-7xl mb-6">🔍</div>
                <h3 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  No NFTs found
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {selectedLocation ? `No NFTs available from ${selectedLocation.name} yet.` : "No NFTs available."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCardSimple key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

