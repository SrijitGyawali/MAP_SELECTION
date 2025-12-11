"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const NepalLeafletMapSelector = dynamic(
  () => import("./nepal-leaflet-map-selector"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Loading Map...
            </div>
          </div>
        </div>
      </div>
    ),
  }
);
import ProductCard from "./product-card";
import type { NepalRegion } from "@/types/map";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { filterProductsByLocation } from "@/data/mock-products";

export default function MarketplaceView() {
  const [selectedLocation, setSelectedLocation] = useState<NepalRegion | null>(
    null
  );

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
    // If clicking the same region again, clear selection
    if (selectedLocation?.id === region.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(region);
    }
  };

  const handleClearSelection = (): void => {
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Nepal NFT Marketplace
          </h1>
          <p className="text-gray-600 mt-1">
            Discover local art, culture, and handicrafts from across Nepal
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-1">
            <NepalLeafletMapSelector
              selectedCity={selectedLocation?.id || null}
              onCitySelect={handleLocationSelect}
            />
            {selectedLocation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Active Filter:</strong> {selectedLocation.name}
                </p>
                <button
                  onClick={handleClearSelection}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filter to show all products
                </button>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedLocation
                  ? `Products from ${selectedLocation.name}`
                  : "All Products"}
              </h2>
              <span className="text-sm text-gray-600">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedLocation
                    ? `No products available from ${selectedLocation.name} yet.`
                    : "No products available."}
                </p>
                {selectedLocation && (
                  <button
                    onClick={handleClearSelection}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show All Products
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

