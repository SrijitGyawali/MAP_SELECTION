"use client";

import { useState } from "react";
import NepalMapSelector from "./nepal-map-selector";
import type { NepalRegion } from "@/types/map";

export default function ProductListingForm() {
  const [selectedLocation, setSelectedLocation] = useState<NepalRegion | null>(
    null
  );
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleLocationSelect = (region: NepalRegion): void => {
    setSelectedLocation(region);
    setIsMapOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!selectedLocation) {
      alert("Please select a location");
      return;
    }
    console.log({
      productName,
      productDescription,
      price,
      location: selectedLocation,
    });
    alert(`Product listing created for ${productName} in ${selectedLocation.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Product Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your product..."
            />
          </div>

          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700"
              >
                {selectedLocation ? (
                  <span className="text-blue-600 font-medium">
                    {selectedLocation.name}
                  </span>
                ) : (
                  <span>Select Location on Map</span>
                )}
              </button>
              {selectedLocation && (
                <button
                  type="button"
                  onClick={() => setSelectedLocation(null)}
                  className="px-4 py-2 text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Clear selection"
                >
                  Clear
                </button>
              )}
            </div>
            {selectedLocation && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: <span className="font-medium">{selectedLocation.name}</span> (
                <span className="capitalize">{selectedLocation.type}</span>)
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price (NPR)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Listing
          </button>
        </form>

        {/* Map Selector Modal */}
        <NepalMapSelector
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          onSelect={handleLocationSelect}
          selectedRegion={selectedLocation?.id}
        />
      </div>
    </div>
  );
}

