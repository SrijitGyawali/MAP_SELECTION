"use client";

import { useState, useCallback, useEffect } from "react";
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

interface NepalLeafletMapSelectorProps {
  selectedCity: string | null;
  onCitySelect: (city: NepalRegion | null) => void;
  className?: string;
}

const center: [number, number] = [28.3949, 84.1240]; // Nepal center
const zoom = 7;

export default function NepalLeafletMapSelector({
  selectedCity,
  onCitySelect,
  className = "",
}: NepalLeafletMapSelectorProps) {
  const [mounted, setMounted] = useState(false);
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

  // Find current selected city data
  const currentSelectedCityData = citiesData.find(
    (city) => city.name.toLowerCase().replace(/\s+/g, "-") === selectedCity
  ) || null;

  // Get icons (only available client-side)
  const getMarkerIcon = (isSelected: boolean) => {
    if (typeof window === "undefined") return undefined;
    const L = require("leaflet");

    if (isSelected) {
      return L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
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
      <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">
            Select Location to Filter Products
          </h3>
        </div>
        <div className="h-[400px] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Loading Map...
            </div>
            <div className="text-sm text-gray-500">Please wait</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">
          Select Location to Filter Products
        </h3>
        {selectedCity && currentSelectedCityData && (
          <p className="text-sm text-blue-600 mt-1">
            Showing products from:{" "}
            <span className="font-medium">{currentSelectedCityData.name}</span>
          </p>
        )}
      </div>

      <div className="relative" style={{ height: "400px" }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController selectedCity={currentSelectedCityData || null} />
          {citiesData.map((city, index) => {
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
                  <div className="p-2">
                    <div className="font-semibold text-gray-800">
                      📍 {city.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Click to filter products
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {selectedCity && (
        <div className="p-3 border-t bg-blue-50">
          <button
            onClick={handleClearSelection}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Selection (Show All Products)
          </button>
        </div>
      )}
    </div>
  );
}
