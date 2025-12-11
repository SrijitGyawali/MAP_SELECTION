"use client";

import { useState, useCallback, useRef } from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import type { NepalRegion } from "@/types/map";
import { nepalRegions } from "@/data/nepal-map-data";

interface NepalMapViewerProps {
  selectedRegion: string | null;
  onRegionSelect: (region: NepalRegion | null) => void;
  className?: string;
}

export default function NepalMapViewer({
  selectedRegion,
  onRegionSelect,
  className = "",
}: NepalMapViewerProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const viewerRef = useRef<any>(null);

  const handleRegionClick = useCallback(
    (region: NepalRegion) => {
      onRegionSelect(region);
    },
    [onRegionSelect]
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
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">
          Select Location to Filter Products
        </h3>
        {selectedRegion && (
          <p className="text-sm text-blue-600 mt-1">
            Showing products from:{" "}
            <span className="font-medium">
              {nepalRegions.find((r) => r.id === selectedRegion)?.name}
            </span>
          </p>
        )}
      </div>

      <div className="relative" style={{ height: "400px" }}>
        <UncontrolledReactSVGPanZoom
          ref={viewerRef}
          width={800}
          height={400}
          tool="auto"
          toolbarProps={{ position: "none" }}
          miniatureProps={{ position: "none" }}
          SVGBackground="#f9fafb"
          detectAutoPan={false}
          preventPanOutside={false}
        >
          <svg
            width="800"
            height="400"
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
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
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

      {selectedRegion && (
        <div className="p-3 border-t bg-blue-50">
          <button
            onClick={() => onRegionSelect(null)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Selection (Show All Products)
          </button>
        </div>
      )}
    </div>
  );
}

