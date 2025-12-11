"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import citiesData from "@/data/cities.json";
import type { NepalRegion } from "@/types/map";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapControllerProps {
  selectedCity: { lat: number; lng: number } | null;
}

function MapControllerInner({ selectedCity }: MapControllerProps) {
  const { useMap } = require("react-leaflet");
  const map = useMap();

  useEffect(() => {
    if (selectedCity && map) {
      map.setView([selectedCity.lat, selectedCity.lng], 12, {
        animate: true,
        duration: 1,
      });
    }
  }, [selectedCity, map]);

  return null;
}

const MapController = dynamic(() => Promise.resolve(MapControllerInner), {
  ssr: false,
});

interface NepalLeafletMapSelectorEnhancedProps {
  selectedCity: string | null;
  onCitySelect: (city: NepalRegion | null) => void;
  className?: string;
  darkMode?: boolean;
}

const center: [number, number] = [28.3949, 84.1240]; // Nepal center
const zoom = 7;

export default function NepalLeafletMapSelectorEnhanced({
  selectedCity,
  onCitySelect,
  className = "",
  darkMode = false,
}: NepalLeafletMapSelectorEnhancedProps) {
  const [mounted, setMounted] = useState(false);
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite" | "terrain">(
    "standard"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCityInfo, setSelectedCityInfo] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMarkerClick = useCallback(
    (city: { name: string; lat: number; lng: number }) => {
      setSelectedCityInfo(city);
      const cityRegion: NepalRegion = {
        id: city.name.toLowerCase().replace(/\s+/g, "-"),
        name: city.name,
        type: "city",
        path: "",
      };
      onCitySelect(cityRegion);
    },
    [onCitySelect]
  );

  const handleClearSelection = useCallback(() => {
    setSelectedCityInfo(null);
    onCitySelect(null);
  }, [onCitySelect]);

  // Filter cities based on search
  const filteredCities = citiesData.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSelectedCityData = citiesData.find(
    (city) => city.name.toLowerCase().replace(/\s+/g, "-") === selectedCity
  ) || null;

  // Get tile URL based on map style
  const getTileUrl = () => {
    switch (mapStyle) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  // Get marker icon
  const getMarkerIcon = (isSelected: boolean) => {
    if (typeof window === "undefined") return undefined;
    const L = require("leaflet");

    if (isSelected) {
      return L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [30, 48],
        iconAnchor: [15, 48],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    }

    return L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  if (!mounted) {
    return (
      <div
        className={`relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 ${className}`}
      >
        <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Loading Map...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 ${className} ${
        darkMode ? "bg-gray-900/80 border-gray-700" : ""
      }`}
    >
      {/* Header with Glassmorphism */}
      <div
        className={`p-5 border-b backdrop-blur-sm ${
          darkMode
            ? "bg-gray-800/50 border-gray-700"
            : "bg-white/50 border-gray-200"
        }`}
      >
        <h3
          className={`text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
        >
          Select a City to Explore Local NFTs
        </h3>
        {selectedCity && currentSelectedCityData && (
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-blue-600"
            }`}
          >
            Showing NFTs from:{" "}
            <span className="font-semibold">{currentSelectedCityData.name}</span>
          </p>
        )}

        {/* Search Bar */}
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          {searchQuery && filteredCities.length > 0 && (
            <div
              className={`absolute z-10 mt-1 w-full rounded-lg shadow-xl border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } max-h-48 overflow-y-auto`}
            >
              {filteredCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    handleMarkerClick(city);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                    darkMode ? "hover:bg-gray-700 text-gray-300" : "text-gray-800"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Style Toggle */}
        <div className="flex gap-2 mt-3">
          {(["standard", "satellite", "terrain"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mapStyle === style
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative" style={{ height: "500px" }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution={
              mapStyle === "satellite"
                ? '&copy; <a href="https://www.esri.com">Esri</a>'
                : mapStyle === "terrain"
                ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a>'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
            url={getTileUrl()}
          />
          <MapController selectedCity={currentSelectedCityData || null} />
          {(searchQuery ? filteredCities : citiesData).map((city, index) => {
            const isSelected =
              selectedCity === city.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Marker
                key={index}
                position={[city.lat, city.lng]}
                icon={getMarkerIcon(isSelected)}
                eventHandlers={{
                  click: () => handleMarkerClick(city),
                }}
              >
                <Popup>
                  <div className="p-2 text-center">
                    <div className="font-bold text-gray-800 mb-1">
                      📍 {city.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      Click to filter NFTs
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Clear Selection Button */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 border-t backdrop-blur-sm ${
            darkMode
              ? "bg-gray-800/50 border-gray-700"
              : "bg-blue-50/50 border-blue-200"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearSelection}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Clear Selection (Show All NFTs)
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

