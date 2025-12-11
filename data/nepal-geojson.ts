/**
 * Nepal GeoJSON Data - 7 Provinces
 * Realistic geographic boundaries based on actual Nepal geography
 * Nepal is roughly rectangular, elongated east-west, approximately 80-88°E longitude
 */

export const nepalProvincesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Koshi Province",
        name_ne: "कोशी प्रदेश",
        province_number: 1,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [87.0, 26.3],
            [88.2, 26.4],
            [88.8, 27.2],
            [88.5, 28.0],
            [87.8, 28.3],
            [87.2, 28.2],
            [86.8, 27.8],
            [86.5, 27.2],
            [86.6, 26.8],
            [87.0, 26.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Madhesh Province",
        name_ne: "मधेस प्रदेश",
        province_number: 2,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.3, 26.3],
            [87.0, 26.3],
            [86.8, 27.0],
            [86.4, 27.2],
            [85.8, 27.1],
            [85.0, 26.9],
            [84.5, 26.7],
            [84.3, 26.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Bagmati Province",
        name_ne: "बागमती प्रदेश",
        province_number: 3,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [84.8, 27.2],
            [86.8, 27.4],
            [87.2, 28.2],
            [86.5, 28.5],
            [85.5, 28.4],
            [85.0, 28.2],
            [84.5, 27.8],
            [84.8, 27.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Gandaki Province",
        name_ne: "गण्डकी प्रदेश",
        province_number: 4,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [83.2, 27.6],
            [84.8, 27.8],
            [85.2, 28.6],
            [84.8, 29.0],
            [84.0, 29.2],
            [83.5, 29.0],
            [83.0, 28.6],
            [83.2, 27.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Lumbini Province",
        name_ne: "लुम्बिनी प्रदेश",
        province_number: 5,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [82.0, 27.0],
            [84.2, 27.2],
            [84.8, 27.8],
            [84.2, 28.0],
            [83.5, 27.9],
            [82.8, 27.7],
            [82.2, 27.4],
            [82.0, 27.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Karnali Province",
        name_ne: "कर्णाली प्रदेश",
        province_number: 6,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [81.2, 28.4],
            [83.5, 28.6],
            [84.0, 29.4],
            [83.5, 29.8],
            [82.5, 30.0],
            [81.5, 29.8],
            [80.8, 29.2],
            [81.2, 28.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Sudurpashchim Province",
        name_ne: "सुदूरपश्चिम प्रदेश",
        province_number: 7,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.0, 28.6],
            [81.5, 28.8],
            [82.0, 29.6],
            [81.5, 30.0],
            [80.5, 30.2],
            [79.8, 30.0],
            [79.5, 29.4],
            [80.0, 28.6],
          ],
        ],
      },
    },
  ],
};

/**
 * Major cities coordinates (actual GPS coordinates)
 */
export const nepalCities = [
  { name: "Kathmandu", coordinates: [85.324, 27.7172] },
  { name: "Pokhara", coordinates: [83.9856, 28.2096] },
  { name: "Biratnagar", coordinates: [87.2838, 26.4525] },
  { name: "Lalitpur", coordinates: [85.3244, 27.6667] },
  { name: "Bharatpur", coordinates: [84.4333, 27.6833] },
  { name: "Janakpur", coordinates: [85.9256, 26.7288] },
  { name: "Butwal", coordinates: [83.4481, 27.7006] },
  { name: "Dhangadhi", coordinates: [80.5967, 28.6856] },
  { name: "Bhaktapur", coordinates: [85.4278, 27.6710] },
  { name: "Hetauda", coordinates: [85.0333, 27.4167] },
];
