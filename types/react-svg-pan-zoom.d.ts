declare module "react-svg-pan-zoom" {
  import { Component } from "react";

  export interface ReactSVGPanZoomProps {
    value?: any;
    tool?: string;
    onChangeValue?: (value: any) => void;
    width?: number;
    height?: number;
    toolbarProps?: {
      position?: string;
      SVGAlignX?: string;
      SVGAlignY?: string;
    };
    miniatureProps?: {
      position?: string;
      width?: number;
      height?: number;
      background?: string;
    };
    SVGBackground?: string;
    background?: string;
    detectAutoPan?: boolean;
    preventPanOutside?: boolean;
    scaleFactor?: number;
    scaleFactorOnWheel?: number;
    scaleFactorOnPinch?: number;
    onZoom?: (zoom: number) => void;
    onPan?: (x: number, y: number) => void;
    onClick?: (event: MouseEvent) => void;
    onDoubleClick?: (event: MouseEvent) => void;
    children?: React.ReactNode;
  }

  export interface ReactSVGPanZoomRef {
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
    fitSelection: (x: number, y: number, width: number, height: number) => void;
    fitToViewer: () => void;
    pan: (deltaX: number, deltaY: number) => void;
    setPointOnViewerCenter: (x: number, y: number, zoom: number) => void;
  }

  export class ReactSVGPanZoom extends Component<ReactSVGPanZoomProps> {
    zoomIn(): void;
    zoomOut(): void;
    reset(): void;
    fitSelection(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    fitToViewer(): void;
    pan(deltaX: number, deltaY: number): void;
    setPointOnViewerCenter(x: number, y: number, zoom: number): void;
  }

  export class UncontrolledReactSVGPanZoom extends Component<ReactSVGPanZoomProps> {
    zoomIn(): void;
    zoomOut(): void;
    reset(): void;
    fitSelection(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    fitToViewer(): void;
    pan(deltaX: number, deltaY: number): void;
    setPointOnViewerCenter(x: number, y: number, zoom: number): void;
  }
}

