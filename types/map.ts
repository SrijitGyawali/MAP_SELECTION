export interface NepalRegion {
  id: string;
  name: string;
  path: string;
  type: "province" | "district" | "city";
  coordinates?: {
    x: number;
    y: number;
  };
}

export interface MapSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (region: NepalRegion) => void;
  selectedRegion?: string;
}





