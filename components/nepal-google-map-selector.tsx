"use client";

import { useState, useCallback, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import citiesData from "@/data/cities.json";
import type { NepalRegion } from "@/types/map";

interface NepalGoogleMapSelectorProps {
  selectedCity: string | null;
  onCitySelect: (city: NepalRegion | null) => void;
  className?: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const center = { lat: 28.3949, lng: 84.1240 }; // Nepal center

// Define Google Maps API key - REPLACE WITH YOUR ACTUAL KEY
const GOOGLE_MAPS_API_KEY =
  (typeof window !== "undefined" &&
    (window as any).ENV?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) ||
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "";

export default function NepalGoogleMapSelector({
  selectedCity,
  onCitySelect,
  className = "",
}: NepalGoogleMapSelectorProps) {
  const [selectedCityInfo, setSelectedCityInfo] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

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

      // Pan to city and zoom in
      if (map) {
        map.panTo({ lat: city.lat, lng: city.lng });
        map.setZoom(12);
      }
    },
    [map, onCitySelect]
  );

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Filter selected city from data
  const currentSelectedCityData = useMemo(() => {
    if (!selectedCity) return null;
    return citiesData.find(
      (city) => city.name.toLowerCase().replace(/\s+/g, "-") === selectedCity
    ) || null;
  }, [selectedCity]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>⚠️ Google Maps API Key Required</strong>
          </p>
          <p className="text-xs text-yellow-700 mb-3">
            To use the interactive map, please set your Google Maps API key:
          </p>
          <ol className="text-xs text-yellow-700 list-decimal list-inside space-y-1">
            <li>Get API key from{" "}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Cloud Console
              </a>
            </li>
            <li>Create <code className="bg-yellow-100 px-1 rounded">.env.local</code></li>
            <li>Add: <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here</code></li>
          </ol>
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

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          mapTypeId="hybrid"
          tilt={45}
          onLoad={handleMapLoad}
          options={{
            mapTypeControl: true,
            mapTypeControlOptions: {
              mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain"],
            },
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
          }}
        >
          {citiesData.map((city, index) => {
            const isSelected =
              selectedCity === city.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Marker
                key={index}
                position={{ lat: city.lat, lng: city.lng }}
                title={city.name}
                onClick={() => handleMarkerClick(city)}
                icon={{
                  url: isSelected
                    ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: isSelected
                    ? new window.google.maps.Size(50, 50)
                    : new window.google.maps.Size(40, 40),
                }}
              />
            );
          })}

          {selectedCityInfo && (
            <InfoWindow
              position={{
                lat: selectedCityInfo.lat,
                lng: selectedCityInfo.lng,
              }}
              onCloseClick={() => setSelectedCityInfo(null)}
            >
              <div className="p-2">
                <div className="text-sm font-semibold text-gray-800">
                  📍 {selectedCityInfo.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Click to filter products
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {selectedCity && (
        <div className="p-3 border-t bg-blue-50">
          <button
            onClick={() => {
              setSelectedCityInfo(null);
              onCitySelect(null);
              if (map) {
                map.panTo(center);
                map.setZoom(7);
              }
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Selection (Show All Products)
          </button>
        </div>
      )}
    </div>
  );
}

