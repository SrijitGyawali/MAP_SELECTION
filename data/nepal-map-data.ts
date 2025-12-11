import type { NepalRegion } from "@/types/map";

/**
 * Nepal Map Data - Provinces and Major Cities
 * Simplified but recognizable Nepal-shaped regions
 * For production, replace with actual GeoJSON/SVG from GADM or DIVA-GIS
 */
export const nepalRegions: NepalRegion[] = [
  // Provinces - Simplified Nepal shape (roughly rectangular, longer north-south)
  // East to West arrangement
  {
    id: "province-1",
    name: "Koshi Province",
    type: "province",
    path: "M 50 20 L 90 18 L 115 30 L 120 55 L 100 75 L 70 80 L 45 70 L 30 50 L 35 30 Z",
    coordinates: { x: 75, y: 48 },
  },
  {
    id: "province-2",
    name: "Madhesh Province",
    type: "province",
    path: "M 30 75 L 90 72 L 115 85 L 110 110 L 80 115 L 50 120 L 25 110 L 20 90 Z",
    coordinates: { x: 65, y: 95 },
  },
  {
    id: "province-3",
    name: "Bagmati Province",
    type: "province",
    path: "M 115 50 L 165 48 L 185 60 L 190 85 L 170 100 L 140 105 L 115 90 L 105 70 Z",
    coordinates: { x: 150, y: 75 },
  },
  {
    id: "province-4",
    name: "Gandaki Province",
    type: "province",
    path: "M 185 35 L 235 33 L 255 45 L 260 70 L 240 85 L 210 90 L 185 75 L 175 55 Z",
    coordinates: { x: 220, y: 62 },
  },
  {
    id: "province-5",
    name: "Lumbini Province",
    type: "province",
    path: "M 170 90 L 230 88 L 250 100 L 245 125 L 220 130 L 190 135 L 165 120 L 155 100 Z",
    coordinates: { x: 210, y: 112 },
  },
  {
    id: "province-6",
    name: "Karnali Province",
    type: "province",
    path: "M 255 25 L 305 23 L 325 35 L 330 60 L 310 75 L 280 80 L 255 65 L 245 45 Z",
    coordinates: { x: 290, y: 52 },
  },
  {
    id: "province-7",
    name: "Sudurpashchim Province",
    type: "province",
    path: "M 325 30 L 375 28 L 395 40 L 400 65 L 380 80 L 350 85 L 325 70 L 315 50 Z",
    coordinates: { x: 360, y: 57 },
  },
  // Major Cities - Visible as circular markers
  {
    id: "kathmandu",
    name: "Kathmandu",
    type: "city",
    path: "M 150 72 A 6 6 0 1 1 150 84 A 6 6 0 1 1 150 72 Z",
    coordinates: { x: 150, y: 78 },
  },
  {
    id: "pokhara",
    name: "Pokhara",
    type: "city",
    path: "M 220 60 A 6 6 0 1 1 220 72 A 6 6 0 1 1 220 60 Z",
    coordinates: { x: 220, y: 66 },
  },
  {
    id: "biratnagar",
    name: "Biratnagar",
    type: "city",
    path: "M 75 48 A 6 6 0 1 1 75 60 A 6 6 0 1 1 75 48 Z",
    coordinates: { x: 75, y: 54 },
  },
  {
    id: "lalitpur",
    name: "Lalitpur",
    type: "city",
    path: "M 152 76 A 6 6 0 1 1 152 88 A 6 6 0 1 1 152 76 Z",
    coordinates: { x: 152, y: 82 },
  },
  {
    id: "bharatpur",
    name: "Bharatpur",
    type: "city",
    path: "M 165 105 A 6 6 0 1 1 165 117 A 6 6 0 1 1 165 105 Z",
    coordinates: { x: 165, y: 111 },
  },
  {
    id: "janakpur",
    name: "Janakpur",
    type: "city",
    path: "M 65 95 A 6 6 0 1 1 65 107 A 6 6 0 1 1 65 95 Z",
    coordinates: { x: 65, y: 101 },
  },
  {
    id: "butwal",
    name: "Butwal",
    type: "city",
    path: "M 210 120 A 6 6 0 1 1 210 132 A 6 6 0 1 1 210 120 Z",
    coordinates: { x: 210, y: 126 },
  },
  {
    id: "dhangadhi",
    name: "Dhangadhi",
    type: "city",
    path: "M 360 57 A 6 6 0 1 1 360 69 A 6 6 0 1 1 360 57 Z",
    coordinates: { x: 360, y: 63 },
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    type: "city",
    path: "M 155 74 A 6 6 0 1 1 155 86 A 6 6 0 1 1 155 74 Z",
    coordinates: { x: 155, y: 80 },
  },
  {
    id: "hetauda",
    name: "Hetauda",
    type: "city",
    path: "M 160 95 A 6 6 0 1 1 160 107 A 6 6 0 1 1 160 95 Z",
    coordinates: { x: 160, y: 101 },
  },
];

/**
 * Get region by ID
 */
export function getRegionById(id: string): NepalRegion | undefined {
  return nepalRegions.find((region) => region.id === id);
}

/**
 * Search regions by name (case-insensitive)
 */
export function searchRegions(query: string): NepalRegion[] {
  const lowerQuery = query.toLowerCase();
  return nepalRegions.filter((region) =>
    region.name.toLowerCase().includes(lowerQuery)
  );
}
