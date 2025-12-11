import type { NepalRegion } from "./map";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  location: NepalRegion;
  sellerName: string;
  category?: string;
}






