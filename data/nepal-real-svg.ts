import type { NepalRegion } from "@/types/map";

/**
 * Nepal Real Map Data - Actual Nepal Shape
 * Based on real geographic boundaries (approximately 80-88°E, 26-30°N)
 * Nepal is roughly rectangular, elongated east-west, with irregular borders
 */
export const nepalRealRegions: NepalRegion[] = [
  // Province 1: Koshi (Easternmost)
  {
    id: "province-1",
    name: "Koshi Province",
    type: "province",
    path: "M 85 35 L 100 34 L 108 38 L 112 45 L 110 55 L 106 62 L 98 65 L 90 63 L 84 58 L 82 50 L 83 42 Z",
    coordinates: { x: 96, y: 50 },
  },
  // Province 2: Madhesh (Southern belt)
  {
    id: "province-2",
    name: "Madhesh Province",
    type: "province",
    path: "M 82 60 L 110 58 L 108 65 L 105 68 L 95 70 L 85 72 L 78 70 L 75 65 L 77 62 Z",
    coordinates: { x: 92, y: 65 },
  },
  // Province 3: Bagmati (Kathmandu region)
  {
    id: "province-3",
    name: "Bagmati Province",
    type: "province",
    path: "M 108 45 L 128 44 L 135 48 L 138 55 L 133 62 L 125 64 L 115 63 L 108 58 L 105 52 Z",
    coordinates: { x: 123, y: 54 },
  },
  // Province 4: Gandaki (Pokhara region)
  {
    id: "province-4",
    name: "Gandaki Province",
    type: "province",
    path: "M 135 38 L 155 37 L 163 41 L 166 48 L 161 55 L 153 57 L 143 56 L 135 51 L 132 45 Z",
    coordinates: { x: 150, y: 47 },
  },
  // Province 5: Lumbini
  {
    id: "province-5",
    name: "Lumbini Province",
    type: "province",
    path: "M 125 58 L 145 57 L 153 61 L 156 68 L 151 75 L 143 77 L 133 76 L 125 71 L 122 65 Z",
    coordinates: { x: 140, y: 67 },
  },
  // Province 6: Karnali
  {
    id: "province-6",
    name: "Karnali Province",
    type: "province",
    path: "M 158 30 L 178 29 L 186 33 L 189 40 L 184 47 L 176 49 L 166 48 L 158 43 L 155 37 Z",
    coordinates: { x: 173, y: 39 },
  },
  // Province 7: Sudurpashchim (Westernmost)
  {
    id: "province-7",
    name: "Sudurpashchim Province",
    type: "province",
    path: "M 186 35 L 206 34 L 214 38 L 217 45 L 212 52 L 204 54 L 194 53 L 186 48 L 183 42 Z",
    coordinates: { x: 201, y: 44 },
  },
  // Major Cities with real positions
  {
    id: "kathmandu",
    name: "Kathmandu",
    type: "city",
    path: "M 123 52 A 3 3 0 1 1 123 58 A 3 3 0 1 1 123 52 Z",
    coordinates: { x: 123, y: 55 },
  },
  {
    id: "pokhara",
    name: "Pokhara",
    type: "city",
    path: "M 150 45 A 3 3 0 1 1 150 51 A 3 3 0 1 1 150 45 Z",
    coordinates: { x: 150, y: 48 },
  },
  {
    id: "biratnagar",
    name: "Biratnagar",
    type: "city",
    path: "M 96 50 A 3 3 0 1 1 96 56 A 3 3 0 1 1 96 50 Z",
    coordinates: { x: 96, y: 53 },
  },
  {
    id: "lalitpur",
    name: "Lalitpur",
    type: "city",
    path: "M 122 56 A 3 3 0 1 1 122 62 A 3 3 0 1 1 122 56 Z",
    coordinates: { x: 122, y: 59 },
  },
  {
    id: "bharatpur",
    name: "Bharatpur",
    type: "city",
    path: "M 128 60 A 3 3 0 1 1 128 66 A 3 3 0 1 1 128 60 Z",
    coordinates: { x: 128, y: 63 },
  },
  {
    id: "janakpur",
    name: "Janakpur",
    type: "city",
    path: "M 92 65 A 3 3 0 1 1 92 71 A 3 3 0 1 1 92 65 Z",
    coordinates: { x: 92, y: 68 },
  },
  {
    id: "butwal",
    name: "Butwal",
    type: "city",
    path: "M 140 68 A 3 3 0 1 1 140 74 A 3 3 0 1 1 140 68 Z",
    coordinates: { x: 140, y: 71 },
  },
  {
    id: "dhangadhi",
    name: "Dhangadhi",
    type: "city",
    path: "M 201 44 A 3 3 0 1 1 201 50 A 3 3 0 1 1 201 44 Z",
    coordinates: { x: 201, y: 47 },
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    type: "city",
    path: "M 125 53 A 3 3 0 1 1 125 59 A 3 3 0 1 1 125 53 Z",
    coordinates: { x: 125, y: 56 },
  },
  {
    id: "hetauda",
    name: "Hetauda",
    type: "city",
    path: "M 130 58 A 3 3 0 1 1 130 64 A 3 3 0 1 1 130 58 Z",
    coordinates: { x: 130, y: 61 },
  },
];

export function getRegionById(id: string): NepalRegion | undefined {
  return nepalRealRegions.find((region) => region.id === id);
}

export function searchRegions(query: string): NepalRegion[] {
  const lowerQuery = query.toLowerCase();
  return nepalRealRegions.filter((region) =>
    region.name.toLowerCase().includes(lowerQuery)
  );
}





