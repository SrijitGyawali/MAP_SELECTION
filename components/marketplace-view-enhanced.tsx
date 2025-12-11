"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ProductCardEnhanced from "./product-card-enhanced";
// Fallback to simple card if needed
import type { NepalRegion } from "@/types/map";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { filterProductsByLocation } from "@/data/mock-products";

const NepalLeafletMapSelectorEnhanced = dynamic(
  () => import("./nepal-leaflet-map-selector-enhanced"),
  {
    ssr: false,
    loading: () => (
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Loading Map...
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function MarketplaceViewEnhanced() {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<NepalRegion | null>(
    null
  );
  const [darkMode, setDarkMode] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleClearSelection = (): void => {
    setSelectedLocation(null);
  };

  // Prevent hydration by showing loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading KalaChain...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"
      }`}
    >
      {/* Sticky Header with Glassmorphism */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Tagline */}
            <div>
              <h1
                className={`text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}
                data-enhanced-ui="true"
              >
                KalaChain
              </h1>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Connecting Culture through Blockchain
              </p>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
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

              {/* Connect Wallet Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}
              >
                <span className="relative z-10">Connect Wallet</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

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

            {/* Active Filter Chip */}
            <AnimatePresence>
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-2xl backdrop-blur-xl border ${
                    darkMode
                      ? "bg-gray-800/80 border-gray-700"
                      : "bg-blue-50/80 border-blue-200"
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-xs font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Active Filter
                      </p>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          darkMode ? "text-white" : "text-blue-800"
                        }`}
                      >
                        {selectedLocation.name}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClearSelection}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Clear
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            {/* Header with Filter Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                >
                  {selectedLocation
                    ? `NFTs from ${selectedLocation.name}`
                    : "All NFTs"}
                </h2>
                <span
                  className={`text-sm font-medium px-4 py-2 rounded-full ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } shadow-md`}
                >
                  {filteredProducts.length} NFT
                  {filteredProducts.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {selectedLocation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
                  >
                    <span>📍</span>
                    {selectedLocation.name}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`rounded-2xl shadow-xl p-12 text-center backdrop-blur-xl border ${
                    darkMode
                      ? "bg-gray-800/80 border-gray-700"
                      : "bg-white/80 border-gray-200"
                  }`}
                >
                  <div className="text-7xl mb-6">🔍</div>
                  <h3
                    className={`text-2xl font-semibold mb-3 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    No NFTs found
                  </h3>
                  <p
                    className={`mb-6 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {selectedLocation
                      ? `No NFTs available from ${selectedLocation.name} yet.`
                      : "No NFTs available."}
                  </p>
                  {selectedLocation && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearSelection}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Show All NFTs
                    </motion.button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCardEnhanced
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

