declare namespace google {
  namespace maps {
    class Map {
      panTo(latlng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
    }
    interface Size {
      width: number;
      height: number;
    }
    interface LatLng {
      lat(): number;
      lng(): number;
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
  }
}

declare module "@react-google-maps/api" {
  import { Component, ReactNode } from "react";

  export interface GoogleMapProps {
    mapContainerStyle?: React.CSSProperties;
    center?: { lat: number; lng: number };
    zoom?: number;
    mapTypeId?: string;
    tilt?: number;
    onLoad?: (map: google.maps.Map) => void;
    options?: any;
    children?: ReactNode;
  }

  export interface MarkerProps {
    position: { lat: number; lng: number };
    title?: string;
    onClick?: () => void;
    icon?: {
      url?: string;
      scaledSize?: google.maps.Size;
    };
  }

  export interface InfoWindowProps {
    position: { lat: number; lng: number };
    onCloseClick?: () => void;
    children?: ReactNode;
  }

  export interface LoadScriptProps {
    googleMapsApiKey: string;
    children: ReactNode;
    loadingElement?: ReactNode;
  }

  export class GoogleMap extends Component<GoogleMapProps> {}
  export class Marker extends Component<MarkerProps> {}
  export class InfoWindow extends Component<InfoWindowProps> {}
  export class LoadScript extends Component<LoadScriptProps> {}
}


