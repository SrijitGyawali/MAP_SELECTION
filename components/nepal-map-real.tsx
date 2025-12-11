"use client";

import { useState, useCallback, useRef } from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { nepalRealRegions, getRegionById } from "@/data/nepal-real-svg";
import type { NepalRegion } from "@/types/map";

interface NepalMapRealProps {
  selectedRegion: string | null;
  onRegionSelect: (region: NepalRegion | null) => void;
  className?: string;
}

export default function NepalMapReal({
  selectedRegion,
  onRegionSelect,
  className = "",
}: NepalMapRealProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const viewerRef = useRef<any>(null);

  const handleRegionClick = useCallback(
    (region: NepalRegion) => {
      // If clicking the same region, clear selection
      if (selectedRegion === region.id) {
        onRegionSelect(null);
      } else {
        onRegionSelect(region);
      }
    },
    [selectedRegion, onRegionSelect]
  );

  const getRegionFill = (region: NepalRegion): string => {
    if (selectedRegion === region.id) {
      return "#3b82f6";
    }
    if (hoveredRegion === region.id) {
      return "#60a5fa";
    }
    if (region.type === "province") {
      return "#e5e7eb";
    }
    return "#f87171";
  };

  const getRegionStroke = (region: NepalRegion): string => {
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
              {getRegionById(selectedRegion)?.name || ""}
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
          SVGBackground="#e0f2fe"
          detectAutoPan={false}
          preventPanOutside={false}
        >
          <svg
            width="800"
            height="400"
            viewBox="0 0 260 90"
            className="w-full h-full"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          >
            {nepalRealRegions.map((region) => (
              <g key={region.id}>
                <path
                  d={region.path}
                  fill={getRegionFill(region)}
                  stroke={getRegionStroke(region)}
                  strokeWidth={selectedRegion === region.id ? "3" : "1.5"}
                  className="cursor-pointer transition-all duration-200 touch-manipulation"
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleRegionClick(region)}
                />
                {/* Province labels */}
                {region.type === "province" && region.coordinates && (
                  <text
                    x={region.coordinates.x}
                    y={region.coordinates.y}
                    fill={selectedRegion === region.id ? "#1e40af" : "#4b5563"}
                    fontSize="9"
                    fontWeight={selectedRegion === region.id ? "700" : "600"}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="select-none"
                  >
                    {region.name.split(" ")[0]}
                  </text>
                )}
                {/* City labels */}
                {region.type === "city" && region.coordinates && (
                  <text
                    x={region.coordinates.x}
                    y={region.coordinates.y - 6}
                    fill="#dc2626"
                    fontSize="8"
                    fontWeight="600"
                    textAnchor="middle"
                    pointerEvents="none"
                    className="select-none"
                  >
                    {region.name}
                  </text>
                )}
                {/* Hover tooltip */}
                {hoveredRegion === region.id && region.coordinates && (
                  <g>
                    <rect
                      x={region.coordinates.x - 45}
                      y={region.coordinates.y - 28}
                      width={90}
                      height={20}
                      fill="rgba(0, 0, 0, 0.85)"
                      rx={4}
                    />
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y - 14}
                      fill="white"
                      fontSize="10"
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

