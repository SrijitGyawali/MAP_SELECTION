"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import DonorCardEnhanced from "./donor-card-enhanced";
// Fallback to simple card if needed
import type { NepalRegion } from "@/types/map";
import type { Product } from "@/types/product";
import { mockDonors } from "@/data/mock-donors";
import { filterDonorsByLocation } from "@/data/mock-donors";

import NepalLeafletMapSelectorEnhanced from "./nepal-leaflet-map-selector-enhanced";

export default function MarketplaceViewEnhanced() {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<NepalRegion | null>(
    null
  );
  const [darkMode, setDarkMode] = useState(false);
  const [showDonorsList, setShowDonorsList] = useState(false); // New state for toggling donors list

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return filterDonorsByLocation(
      mockDonors,
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
            Loading BloodLink...
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
                className={`text-3xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent`}
                data-enhanced-ui="true"
              >
                BloodLink
              </h1>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Connecting Donors, Saving Lives
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

              {/* Login/Register Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}
              >
                <span className="relative z-10">Login / Register</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative h-screen w-screen">
        {/* Map Section - Full Screen */}
        <div className="w-full h-full">
          <NepalLeafletMapSelectorEnhanced
            selectedCity={selectedLocation?.id || null}
            onCitySelect={handleLocationSelect}
            darkMode={darkMode}
          />
        </div>

        {/* Active Filter Chip - Overlay */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-4 left-4 z-10 p-4 rounded-2xl backdrop-blur-xl border ${
                darkMode
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-red-50/80 border-red-200"
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
                      darkMode ? "text-white" : "text-red-800"
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
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Clear
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Donors List Button */}
        <motion.button
          className={`absolute bottom-4 right-4 z-10 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r ${
            showDonorsList
              ? "from-gray-600 to-gray-500"
              : "from-red-600 to-red-500"
          } text-white shadow-lg hover:shadow-xl transition-all`}
          onClick={() => setShowDonorsList(!showDonorsList)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showDonorsList ? "Hide Donors" : "Show Donors"}
        </motion.button>

        <AnimatePresence>
          {showDonorsList && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 p-4 z-20 overflow-y-auto ${
                darkMode
                  ? "bg-gray-900/90 border-l border-gray-700"
                  : "bg-white/90 border-l border-gray-200"
              } backdrop-blur-xl shadow-2xl`}
            >
              <div className="flex justify-end mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDonorsList(false)}
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  ✖️
                </motion.button>
              </div>

              {/* Header with Filter Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent`}
                  >
                    {selectedLocation
                      ? `Donors from ${selectedLocation.name}`
                      : "All Donors"}
                  </h2>
                  <span
                    className={`text-sm font-medium px-4 py-2 rounded-full ${
                      darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-white text-gray-700"
                    } shadow-md`}
                  >
                    {filteredProducts.length} Donor
                    {filteredProducts.length !== 1 ? "s" : ""} found
                  </span>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {selectedLocation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
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
                      No Donors found
                    </h3>
                    <p
                      className={`mb-6 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {selectedLocation
                        ? `No Donors available from ${selectedLocation.name} yet.`
                        : "No Donors available."}
                    </p>
                    {selectedLocation && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearSelection}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Show All Donors
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
                                          <DonorCardEnhanced
                                            key={product.id}
                                            donor={product}
                                            index={index}
                                          />                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        {/* I will add a button here to toggle this section */}
      </div>

    </div>
  );
}

