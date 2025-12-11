declare module "react-simple-maps" {
  import { Component, ReactNode } from "react";

  export interface GeographyProps {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      scale?: number;
    };
    width?: number;
    height?: number;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: any;
    children: (params: { geographies: any[] }) => ReactNode;
  }

  export class ComposableMap extends Component<ComposableMapProps> {}
  export class Geography extends Component<GeographyProps> {}
  export class Marker extends Component<MarkerProps> {}
  export class ZoomableGroup extends Component<ZoomableGroupProps> {}
  export class Geographies extends Component<GeographiesProps> {}
}





