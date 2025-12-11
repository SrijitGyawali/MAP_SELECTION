"use client";

import { useState, useCallback, useRef } from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import type { NepalRegion, MapSelectorProps } from "@/types/map";
import { nepalRegions, searchRegions } from "@/data/nepal-map-data";

export default function NepalMapSelector({
  isOpen,
  onClose,
  onSelect,
  selectedRegion,
}: MapSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<NepalRegion[]>([]);
  const viewerRef = useRef<any>(null);

  if (!isOpen) {
    return null;
  }

  const handleRegionClick = useCallback(
    (region: NepalRegion) => {
      onSelect(region);
      setSearchQuery("");
      setSearchResults([]);
    },
    [onSelect]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (query.trim()) {
        const results = searchRegions(query);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    []
  );

  const handleSearchSelect = useCallback(
    (region: NepalRegion) => {
      handleRegionClick(region);
      if (viewerRef.current && region.coordinates) {
        viewerRef.current.fitSelection(
          region.coordinates.x - 20,
          region.coordinates.y - 20,
          40,
          40
        );
      }
    },
    [handleRegionClick]
  );

  const handleZoomIn = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.zoomIn();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.zoomOut();
    }
  }, []);

  const handleReset = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.reset();
    }
  }, []);

  const getRegionColor = (region: NepalRegion): string => {
    if (selectedRegion === region.id) {
      return "#3b82f6";
    }
    if (hoveredRegion === region.id) {
      return "#60a5fa";
    }
    if (region.type === "province") {
      return "#e5e7eb";
    }
    return "#f3f4f6";
  };

  const getRegionStrokeColor = (region: NepalRegion): string => {
    if (selectedRegion === region.id) {
      return "#1e40af";
    }
    return "#9ca3af";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
      <div className="relative w-full max-w-4xl h-[95vh] sm:h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            <span className="block sm:inline">Select Location</span>
            {selectedRegion && (
              <span className="block sm:inline sm:ml-2 text-sm font-normal text-blue-600">
                {nepalRegions.find((r) => r.id === selectedRegion)?.name}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 active:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center touch-manipulation"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a city or province..."
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchResults.length > 0 && (
            <div className="absolute left-3 right-3 sm:left-4 sm:right-4 top-16 sm:top-20 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {searchResults.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleSearchSelect(region)}
                  className="w-full text-left px-3 sm:px-4 py-2 hover:bg-blue-50 active:bg-blue-100 transition-colors touch-manipulation"
                >
                  <div className="font-medium text-sm sm:text-base text-gray-800">
                    {region.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 capitalize">
                    {region.type}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden">
          <UncontrolledReactSVGPanZoom
            ref={viewerRef}
            width={800}
            height={600}
            tool="auto"
            toolbarProps={{ position: "none" }}
            miniatureProps={{ position: "none" }}
            SVGBackground="#f9fafb"
            detectAutoPan={false}
            preventPanOutside={false}
          >
            <svg
              width="800"
              height="600"
              viewBox="0 0 450 160"
              className="w-full h-full"
              style={{ touchAction: "pan-x pan-y pinch-zoom" }}
            >
              {nepalRegions.map((region) => (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={getRegionColor(region)}
                    stroke={getRegionStrokeColor(region)}
                    strokeWidth={selectedRegion === region.id ? "3" : "1"}
                    className="cursor-pointer transition-all duration-200 touch-manipulation"
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onTouchStart={() => setHoveredRegion(region.id)}
                    onClick={() => handleRegionClick(region)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleRegionClick(region);
                    }}
                  />
                  {/* Permanent labels for provinces */}
                  {region.type === "province" && region.coordinates && (
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y}
                      fill={selectedRegion === region.id ? "#1e40af" : "#4b5563"}
                      fontSize="10"
                      fontWeight={selectedRegion === region.id ? "700" : "600"}
                      textAnchor="middle"
                      pointerEvents="none"
                      className="select-none"
                    >
                      {region.name.split(" ")[0]}
                    </text>
                  )}
                  {/* Hover tooltip for cities and detailed province info */}
                  {hoveredRegion === region.id && region.coordinates && (
                    <g>
                      <rect
                        x={region.coordinates.x - 50}
                        y={region.coordinates.y - 30}
                        width={100}
                        height={24}
                        fill="rgba(0, 0, 0, 0.85)"
                        rx={4}
                      />
                      <text
                        x={region.coordinates.x}
                        y={region.coordinates.y - 14}
                        fill="white"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {region.name}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </UncontrolledReactSVGPanZoom>

          {/* Zoom Controls */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="bg-white border border-gray-300 rounded-lg px-2.5 sm:px-3 py-2 shadow-md hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
              aria-label="Zoom in"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-white border border-gray-300 rounded-lg px-2.5 sm:px-3 py-2 shadow-md hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
              aria-label="Zoom out"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <button
              onClick={handleReset}
              className="bg-white border border-gray-300 rounded-lg px-2.5 sm:px-3 py-2 shadow-md hover:bg-gray-50 active:bg-gray-100 transition-colors text-xs sm:text-sm touch-manipulation"
              aria-label="Reset view"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedRegion) {
                const region = nepalRegions.find((r) => r.id === selectedRegion);
                if (region) {
                  onSelect(region);
                }
              }
              onClose();
            }}
            disabled={!selectedRegion}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}

