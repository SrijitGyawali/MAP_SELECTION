import type { Product } from "@/types/product";
import type { NepalRegion } from "@/types/map";
import { getCityByName } from "./cities-data";

/**
 * Mock product data for demonstration
 * In production, this would come from your database/API
 */
// Helper function to safely get city or create fallback
function getCityLocation(cityName: string): NepalRegion {
  const city = getCityByName(cityName);
  if (!city) {
    // Fallback if city doesn't exist
    return {
      id: cityName.toLowerCase().replace(/\s+/g, "-"),
      name: cityName,
      type: "city",
      path: "",
    };
  }
  return city;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Handwoven Thangka Painting",
    description: "Traditional Buddhist thangka painting from Kathmandu, handcrafted by local artisans",
    price: 15000,
    location: getCityLocation("Kathmandu"),
    sellerName: "Ancient Arts Gallery",
    category: "Art",
  },
  {
    id: "2",
    name: "Pokhara Metalwork Sculpture",
    description: "Beautiful metal sculpture featuring traditional Nepali motifs",
    price: 8500,
    location: getCityLocation("Pokhara"),
    sellerName: "Mountain Crafts",
    category: "Handicraft",
  },
  {
    id: "3",
    name: "Terai Cotton Shawl",
    description: "Soft cotton shawl with intricate patterns from the Terai region",
    price: 3500,
    location: getCityLocation("Janakpur"),
    sellerName: "Textile Traditions",
    category: "Textile",
  },
  {
    id: "4",
    name: "Lalitpur Pottery Set",
    description: "Traditional hand-thrown pottery set, perfect for tea ceremonies",
    price: 4200,
    location: getCityLocation("Lalitpur"),
    sellerName: "Clay Masters",
    category: "Pottery",
  },
  {
    id: "5",
    name: "Bhaktapur Wooden Mask",
    description: "Authentic wooden mask used in traditional festivals",
    price: 6800,
    location: getCityLocation("Bhaktapur"),
    sellerName: "Heritage Masks",
    category: "Woodwork",
  },
  {
    id: "6",
    name: "Biratnagar Dhaka Topi",
    description: "Traditional Nepali cap with classic Dhaka fabric pattern",
    price: 2500,
    location: getCityLocation("Biratnagar"),
    sellerName: "Cap Collections",
    category: "Accessories",
  },
  {
    id: "7",
    name: "Butwal Bamboo Basket",
    description: "Eco-friendly bamboo basket, perfect for home storage",
    price: 1800,
    location: getCityLocation("Butwal"),
    sellerName: "Bamboo Works",
    category: "Bamboo",
  },
  {
    id: "8",
    name: "Kathmandu Silver Jewelry",
    description: "Handcrafted silver jewelry with traditional designs",
    price: 12000,
    location: getCityLocation("Kathmandu"),
    sellerName: "Silver Dreams",
    category: "Jewelry",
  },
  {
    id: "9",
    name: "Pokhara Hand-knitted Scarf",
    description: "Warm woolen scarf with mountain-inspired patterns",
    price: 3200,
    location: getCityLocation("Pokhara"),
    sellerName: "Woolen Wonders",
    category: "Textile",
  },
  {
    id: "10",
    name: "Dhangadhi Ceramic Bowl",
    description: "Beautifully glazed ceramic bowl with geometric patterns",
    price: 2900,
    location: getCityLocation("Dhangadhi"),
    sellerName: "Ceramic Creations",
    category: "Pottery",
  },
  {
    id: "11",
    name: "Bharatpur Paper Products",
    description: "Eco-friendly handmade paper notebooks and journals",
    price: 1500,
    location: getCityLocation("Bharatpur"),
    sellerName: "Paper Crafts",
    category: "Paper",
  },
  {
    id: "12",
    name: "Hetauda Stone Carving",
    description: "Traditional stone carving featuring Hindu deities",
    price: 9500,
    location: getCityLocation("Hetauda"),
    sellerName: "Stone Artisans",
    category: "Sculpture",
  },
];

/**
 * Filter products by location
 */
export function filterProductsByLocation(
  products: Product[],
  locationId: string | null
): Product[] {
  if (!locationId) {
    return products;
  }
  return products.filter((product) => product.location.id === locationId);
}

/**
 * Get products by region type (province/city)
 */
export function getProductsByRegionType(
  products: Product[],
  locationId: string | null
): Product[] {
  if (!locationId) {
    return products;
  }
  const selectedProduct = products.find((p) => p.location.id === locationId);
  if (!selectedProduct) {
    return [];
  }

  // If a province is selected, show all products in cities within that province
  // If a city is selected, show only products from that city
  if (selectedProduct.location.type === "province") {
    return products.filter((p) => {
      // This is a simplified logic - in production, you'd have province-city relationships
      return p.location.id === locationId;
    });
  }

  return products.filter((p) => p.location.id === locationId);
}


