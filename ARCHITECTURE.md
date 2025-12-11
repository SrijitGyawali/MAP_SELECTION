# Nepal NFT Marketplace - System Architecture

## Overview

Interactive marketplace platform for promoting local art, culture, and handicrafts from Nepal. Core feature: **Interactive map-based city selector** that allows viewers to filter products by location in real-time.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Map Library**: Leaflet.js + react-leaflet
- **Map Tiles**: OpenStreetMap (free, no API key)
- **State Management**: React Hooks (useState, useMemo, useCallback)

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface Layer                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────────────┐ │
│  │  Marketplace View │         │  Product Listing Form     │ │
│  │  (Main Page)      │         │  (Seller Interface)      │ │
│  └────────┬─────────┘         └───────────┬────────────────┘ │
│           │                              │                   │
│           └──────────┬───────────────────┘                   │
│                      │                                         │
│            ┌─────────▼─────────┐                              │
│            │  Map Selector     │                              │
│            │  Component        │                              │
│            └─────────┬─────────┘                              │
│                      │                                         │
└──────────────────────┼─────────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                    Map Layer (Leaflet)                       │
│  ┌────────────────────────────────────────────────────┐     │
│  │  OpenStreetMap Tiles + City Markers               │     │
│  │  - 16 Major Cities                                │     │
│  │  - Click Handler → Filter Products                │     │
│  │  - Auto-zoom on Selection                         │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────┐         ┌──────────────────────┐    │
│  │  cities.json     │         │  mock-products.ts     │    │
│  │  - 16 cities     │         │  - Product listings   │    │
│  │  - Coordinates   │         │  - Location mapping    │    │
│  └──────────────────┘         └──────────────────────┘    │
└───────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Marketplace View (`components/marketplace-view.tsx`)
**Purpose**: Main marketplace interface for buyers/viewers

**Features**:
- Grid layout: Map (left) + Products (right)
- Real-time product filtering based on selected city
- Product count display
- Empty state handling

**State Management**:
```typescript
selectedLocation: NepalRegion | null
filteredProducts: Product[] (computed via useMemo)
```

**Data Flow**:
```
User clicks city on map
  → handleLocationSelect(city)
  → setSelectedLocation(city)
  → filteredProducts recalculates
  → UI updates automatically
```

---

### 2. Nepal Leaflet Map Selector (`components/nepal-leaflet-map-selector.tsx`)
**Purpose**: Interactive OpenStreetMap with city markers

**Technology**: Leaflet.js + react-leaflet + OpenStreetMap tiles

**Key Features**:
- 16 city markers (red = unselected, blue = selected)
- Click marker → zoom to city + filter products
- Popup on hover/click showing city name
- Auto-zoom to level 12 on city selection
- Clear selection button

**Map Configuration**:
- Center: `[28.3949, 84.1240]` (Nepal center)
- Default Zoom: 7 (country view)
- Tile Provider: OpenStreetMap
- Marker Icons: Custom colored markers (red/blue)

**Component Structure**:
```
NepalLeafletMapSelector
├── MapContainer (react-leaflet)
│   ├── TileLayer (OpenStreetMap tiles)
│   ├── MapController (auto-zoom handler)
│   └── Marker[] (16 cities)
│       └── Popup (city name on hover)
└── Clear Selection Button (conditional)
```

**State**:
- `mounted`: boolean (SSR handling)
- `selectedCityInfo`: { name, lat, lng } | null
- `selectedCity`: string | null (from props)

**User Interactions**:
1. **Click Marker** → `handleMarkerClick()`
   - Sets selected city info
   - Calls `onCitySelect(cityRegion)`
   - Map zooms to city (via MapController)

2. **Clear Selection** → `handleClearSelection()`
   - Resets state
   - Calls `onCitySelect(null)`
   - Map resets to country view

---

### 3. Product Card (`components/product-card.tsx`)
**Purpose**: Display individual product information

**Shows**:
- Product name, description
- Price (NPR)
- Location (city name)
- Category badge
- Seller name

---

### 4. Product Listing Form (`components/product-listing-form.tsx`)
**Purpose**: Seller interface for creating product listings

**Features**:
- Product name, description, price inputs
- Location selection via map modal
- Form validation
- Submit handler

**Note**: Currently uses old SVG map selector, can be updated to use Leaflet.

---

## Data Architecture

### City Data (`data/cities.json`)
```json
{
  "name": "City Name",
  "lat": 27.7172,
  "lng": 85.3240
}
```

**Cities Included**: 16 major Nepalese cities
- Kathmandu, Pokhara, Biratnagar, Lalitpur, Birgunj, Dharan
- Bharatpur, Butwal, Janakpur, Hetauda, Nepalgunj, Dhangadhi
- Itahari, Tansen, Gorkha, Bhaktapur

### Product Data (`data/mock-products.ts`)
```typescript
Product {
  id: string
  name: string
  description: string
  price: number
  location: NepalRegion  // Links to city
  sellerName: string
  category?: string
}
```

**Filtering Logic**:
- `filterProductsByLocation(products, locationId)`
- Returns products where `product.location.id === locationId`
- `null` locationId returns all products

---

## Type Definitions

### NepalRegion (`types/map.ts`)
```typescript
{
  id: string              // e.g., "kathmandu"
  name: string           // e.g., "Kathmandu"
  type: "city" | "province" | "district"
  path?: string          // SVG path (for legacy SVG map)
  coordinates?: { x, y }  // For tooltip positioning
}
```

### Product (`types/product.ts`)
```typescript
{
  id: string
  name: string
  description: string
  price: number
  image?: string
  location: NepalRegion
  sellerName: string
  category?: string
}
```

---

## Data Flow

### Selection Flow
```
1. User clicks city marker on map
   ↓
2. handleMarkerClick(city) fires
   ↓
3. Creates NepalRegion object
   ↓
4. Calls onCitySelect(cityRegion)
   ↓
5. MarketplaceView receives update
   ↓
6. setSelectedLocation(cityRegion)
   ↓
7. useMemo recalculates filteredProducts
   ↓
8. UI re-renders with filtered products
```

### Clear Selection Flow
```
1. User clicks "Clear Selection"
   ↓
2. handleClearSelection() fires
   ↓
3. Calls onCitySelect(null)
   ↓
4. setSelectedLocation(null)
   ↓
5. filteredProducts = all products
   ↓
6. UI shows all products again
```

---

## File Structure

```
MAP_SELECT/
├── app/
│   ├── layout.tsx              # Root layout, metadata
│   ├── page.tsx                # Home route → MarketplaceView
│   └── globals.css             # Global styles + Leaflet CSS
│
├── components/
│   ├── nepal-leaflet-map-selector.tsx    # Main map component ⭐
│   ├── marketplace-view.tsx              # Main marketplace UI ⭐
│   ├── product-card.tsx                   # Product display card
│   ├── product-listing-form.tsx           # Seller form (legacy)
│   └── nepal-map-viewer.tsx               # SVG fallback (legacy)
│
├── data/
│   ├── cities.json             # City coordinates ⭐
│   ├── cities-data.ts          # City data utilities
│   └── mock-products.ts        # Product listings ⭐
│
├── types/
│   ├── map.ts                  # NepalRegion, MapSelectorProps
│   └── product.ts               # Product interface
│
├── next.config.mjs             # Next.js config (webpack for Leaflet)
├── package.json                # Dependencies
└── README.md                   # Documentation
```

⭐ = Core files for map functionality

---

## Key Design Decisions

### 1. Why OpenStreetMap + Leaflet?
- ✅ Free (no API key, no billing)
- ✅ Lightweight and fast
- ✅ Open source
- ✅ Privacy-friendly
- ✅ Perfect for hackathon MVP

### 2. Component Separation
- **Marketplace View**: Orchestrates map + products
- **Map Selector**: Pure map component, emits city selections
- **Product Card**: Pure display component

### 3. State Management
- Local component state (no Redux/Context needed for MVP)
- Props drilling for parent-child communication
- `useMemo` for computed values (filtered products)

### 4. SSR Handling
- Leaflet components dynamically imported (`ssr: false`)
- `mounted` state prevents hydration errors
- Map only renders client-side

---

## Integration Points for UI Design

### 1. Map Component
**Location**: `components/nepal-leaflet-map-selector.tsx`

**Customizable**:
- Map height (currently 400px)
- Tile layer style (currently OpenStreetMap standard)
- Marker icons (red/blue custom icons)
- Popup styling
- Zoom levels

**Props Interface**:
```typescript
{
  selectedCity: string | null
  onCitySelect: (city: NepalRegion | null) => void
  className?: string
}
```

### 2. Marketplace Layout
**Location**: `components/marketplace-view.tsx`

**Layout**:
- Grid: `lg:grid-cols-3` (1 column map, 2 columns products)
- Responsive: Stacks on mobile

**Customizable Areas**:
- Header section (title, description)
- Map container width/height
- Product grid columns (currently `sm:grid-cols-2`)
- Filter indicator styling

### 3. Product Display
**Location**: `components/product-card.tsx`

**Structure**:
- Image placeholder (gradient background)
- Product name, description
- Location badge
- Category badge
- Price display
- Seller name

---

## API Surface (for Future Backend)

### Current (Mock Data)
```typescript
// Cities
GET /api/cities → cities.json

// Products
GET /api/products → mock-products.ts
GET /api/products?city=kathmandu → filtered products
```

### Suggested Backend Schema

**Cities Table**:
```sql
id, name, lat, lng, province_id
```

**Products Table**:
```sql
id, name, description, price, city_id, seller_id, category, image_url
```

**API Endpoints**:
```
GET /api/cities
GET /api/products
GET /api/products?city={cityId}
POST /api/products (create listing)
```

---

## Current Limitations & Future Enhancements

### Current State (MVP)
- ✅ Map with 16 cities
- ✅ Product filtering by city
- ✅ Real-time updates
- ✅ Mobile responsive

### Suggested UI/UX Improvements

1. **Search Bar**
   - Autocomplete city search
   - Jump to city on map

2. **Map Enhancements**
   - Cluster markers when zoomed out
   - Province boundaries overlay
   - Custom map themes (dark mode)
   - Draw custom selection areas

3. **Product Grid**
   - Infinite scroll
   - Sort/filter options
   - Product images
   - Favorites/wishlist

4. **Visual Polish**
   - Loading skeletons
   - Smooth transitions
   - Animation on filter change
   - Better empty states

---

## Performance Considerations

- **Map Loading**: Dynamically imported (code splitting)
- **Product Filtering**: Memoized with `useMemo`
- **Re-renders**: Optimized with `useCallback`
- **Bundle Size**: Leaflet loaded client-side only

---

## Testing Strategy

### Components to Test
1. `NepalLeafletMapSelector`
   - Marker click handling
   - Zoom functionality
   - State management

2. `MarketplaceView`
   - Filter logic
   - Product display
   - Clear selection

3. `filterProductsByLocation`
   - Filter by city
   - Null handling
   - Edge cases

---

## Deployment Notes

- **Build**: Uses webpack (not Turbopack) for Leaflet compatibility
- **Environment**: No environment variables needed (all free)
- **Assets**: Map tiles loaded from OpenStreetMap CDN
- **Dependencies**: All standard npm packages

---

## Summary

**Core Flow**: Map Selection → State Update → Product Filter → UI Render

**Key Technologies**: Next.js, React, Leaflet.js, OpenStreetMap

**Data Source**: JSON files (easily replaceable with API calls)

**State**: React hooks (local state, no global store needed for MVP)

This architecture provides a solid foundation for a marketplace with interactive map-based filtering. The UI can be enhanced while maintaining this core data flow and component structure.




