import type { NepalRegion } from "@/types/map";
import citiesJson from "./cities.json";

/**
 * Convert cities.json to NepalRegion format for compatibility
 */
export const nepalCitiesRegions: NepalRegion[] = citiesJson.map((city) => ({
  id: city.name.toLowerCase().replace(/\s+/g, "-"),
  name: city.name,
  type: "city" as const,
  path: "",
  coordinates: { x: city.lng, y: city.lat },
}));

/**
 * Get city region by name or ID
 */
export function getCityRegionById(idOrName: string): NepalRegion | undefined {
  return nepalCitiesRegions.find(
    (city) =>
      city.id === idOrName ||
      city.name.toLowerCase() === idOrName.toLowerCase()
  );
}

/**
 * Get city by name
 */
export function getCityByName(name: string): NepalRegion | undefined {
  return nepalCitiesRegions.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}





