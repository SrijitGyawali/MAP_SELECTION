import type { NepalRegion } from "./map";

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  contact: string;
  image?: string;
  location: NepalRegion;
  lastDonation: string;
  availability: string;
}
