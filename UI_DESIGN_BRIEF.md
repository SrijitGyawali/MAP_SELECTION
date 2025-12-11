# UI Design Brief - Nepal NFT Marketplace

## Project Context

**Platform**: NFT Marketplace for promoting Nepalese art, culture, and handicrafts  
**Primary Feature**: Interactive map-based city selector for product filtering  
**Target Users**: Buyers (viewers) and Sellers  
**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, Leaflet.js

---

## Current UI Structure

### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Header                                    │
│  "Nepal NFT Marketplace" + Tagline                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  │  ┌─────────────────────────────────┐  │
│  │              │  │  │  Products Header                 │  │
│  │   MAP        │  │  │  "All Products" / "X products"   │  │
│  │   SECTION    │  │  ├─────────────────────────────────┤  │
│  │              │  │  │  ┌─────┐ ┌─────┐ ┌─────┐        │  │
│  │  - Leaflet   │  │  │  │Card │ │Card │ │Card │ ...     │  │
│  │  - 16 cities │  │  │  └─────┘ └─────┘ └─────┘        │  │
│  │  - Markers   │  │  │  ┌─────┐ ┌─────┐ ┌─────┐        │  │
│  │              │  │  │  │Card │ │Card │ │Card │ ...     │  │
│  │  Clear btn   │  │  │  └─────┘ └─────┘ └─────┘        │  │
│  └──────────────┘  │  └─────────────────────────────────┘  │
│      33% width      │             67% width                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Map Section (Left Column, 33% width)

**Component**: `NepalLeafletMapSelector`

**Visual Elements**:
- White rounded card with shadow
- Header: "Select Location to Filter Products"
- Selected city indicator (blue text)
- Map container (400px height)
  - OpenStreetMap tiles
  - Red markers (unselected cities)
  - Blue markers (selected city)
  - Zoom controls (top-right)
  - Popups on marker hover/click
- Clear selection button (blue, bottom)

**Current Styling**:
- Background: `bg-white`, `rounded-lg`, `shadow-lg`
- Header: `bg-gray-50`, padding, border-bottom
- Map: Rounded corners, full width/height

---

#### 2. Products Section (Right Column, 67% width)

**Component**: `MarketplaceView`

**Visual Elements**:
- Header row:
  - Title: "All Products" or "Products from {City}"
  - Count: "{X} products found"
- Product grid:
  - `sm:grid-cols-2` (2 columns on mobile+)
  - Cards with shadow, hover effects
  - Empty state (centered, icon + message)

**Product Card Elements**:
- Image placeholder (gradient: blue-100 to purple-100)
- Product name (bold, large)
- Description (2 lines max, ellipsis)
- Location badge (📍 icon + city name)
- Category badge (blue pill)
- Price (large, blue, bold)
- Seller name (small, gray)

**Current Styling**:
- Cards: `bg-white`, `rounded-lg`, `shadow-md`, `hover:shadow-lg`
- Empty state: Large emoji, centered text

---

## User Interactions

### Map Interactions

1. **Hover Marker** → Popup appears with city name
2. **Click Marker** → 
   - Marker turns blue (visual feedback)
   - Map zooms to city (smooth animation)
   - Products filter instantly
   - Header updates: "Products from {City}"
3. **Click Same Marker** → Deselects, shows all products
4. **Click Clear** → Resets map and products

### Product Grid

- **Hover Card** → Shadow increases
- **Click Card** → (Future: Product detail page)

---

## Design System

### Colors

**Primary**:
- Blue: `#3b82f6` (selected city, buttons)
- Light Blue: `#60a5fa` (hover states)
- Dark Blue: `#1e40af` (selected city stroke)

**Neutral**:
- Gray: `#e5e7eb` (backgrounds, borders)
- Dark Gray: `#4b5563` (text)
- Light Gray: `#f3f4f6` (card backgrounds)

**Status**:
- Red: `#ef4444` (unselected markers)
- Blue: `#3b82f6` (selected markers)

### Typography

- **Headers**: `font-semibold`, `text-lg` or `text-2xl`
- **Body**: Default Tailwind text sizes
- **Labels**: `text-sm`, `font-medium`
- **Prices**: `text-xl`, `font-bold`

### Spacing

- Container padding: `px-4 sm:px-6 lg:px-8`
- Card padding: `p-4` or `p-6`
- Grid gaps: `gap-4` or `gap-6`
- Section spacing: `py-6`

### Shadows & Borders

- Cards: `shadow-md`, `hover:shadow-lg`
- Map container: `shadow-lg`
- Borders: `border`, `border-gray-300`

---

## Responsive Breakpoints

- **Mobile**: `< 640px` - Single column, stacked layout
- **Tablet**: `640px - 1024px` - 2 column product grid
- **Desktop**: `> 1024px` - Map (33%) + Products (67%)

---

## Current UI Pain Points (For Designer)

1. **Map Container**:
   - Fixed 400px height (could be more dynamic)
   - Limited visual feedback on selection
   - No map style options visible to user

2. **Product Cards**:
   - Placeholder images (no actual product photos)
   - Simple layout (could be more engaging)
   - No hover details/preview

3. **Filter State**:
   - Only shows in header (could be more prominent)
   - No way to see multiple selected cities
   - No filter chips/tags

4. **Empty States**:
   - Basic message (could be more helpful)
   - No suggestions or related products

5. **Loading States**:
   - Simple "Loading..." text
   - No skeleton loaders
   - No progress indication

---

## Suggested UI Enhancements

### High Priority

1. **Enhanced Map Controls**
   - Visible zoom in/out buttons
   - Map style switcher (standard/satellite/terrain)
   - Fullscreen mode
   - Search city input above map

2. **Better Product Cards**
   - Actual product images
   - Quick view on hover
   - Favorite/heart button
   - Share button
   - Better price formatting

3. **Filter UI**
   - Active filter chips/badges
   - Multiple city selection (checkboxes)
   - Price range filter
   - Category filter

4. **Visual Feedback**
   - Skeleton loaders
   - Smooth transitions
   - Loading animations
   - Success/error toasts

### Medium Priority

5. **Map Enhancements**
   - Custom marker icons per city
   - Cluster markers when zoomed out
   - Province overlay boundaries
   - Heatmap showing product density

6. **Product Grid**
   - Infinite scroll / pagination
   - Sort options (price, name, date)
   - Grid/list view toggle
   - Product comparison

### Low Priority

7. **Additional Features**
   - Dark mode toggle
   - Save searches
   - Product recommendations
   - Seller profiles

---

## Component Props & Interfaces

### Map Selector Props
```typescript
{
  selectedCity: string | null        // City ID (e.g., "kathmandu")
  onCitySelect: (city: NepalRegion | null) => void
  className?: string
}
```

### Marketplace View Props
```typescript
// No props - self-contained component
// Uses mockProducts internally
```

### Product Card Props
```typescript
{
  product: Product
}
```

---

## Data Flow for UI Updates

```
User Action (Click City)
  ↓
Map Component: handleMarkerClick()
  ↓
Calls: onCitySelect(cityRegion)
  ↓
Marketplace: setSelectedLocation(city)
  ↓
useMemo: Recalculates filteredProducts
  ↓
React: Re-renders Product Grid
  ↓
UI: Shows filtered products + updates header
```

---

## Accessibility Considerations

**Current State**:
- Basic ARIA labels on buttons
- Semantic HTML structure
- Keyboard navigation (needs improvement)
- Screen reader support (needs testing)

**Needed**:
- Focus states on interactive elements
- Keyboard shortcuts for map navigation
- Alt text for map markers
- Screen reader announcements for filter changes

---

## Performance Characteristics

- **Initial Load**: ~2-3s (map tiles + React hydration)
- **City Selection**: Instant (<100ms)
- **Filter Update**: Instant (memoized)
- **Map Zoom**: Smooth animation (1s duration)

---

## Design Tokens (Tailwind Classes)

```css
/* Colors */
primary: blue-600
primary-hover: blue-700
primary-light: blue-50
accent: blue-600
background: gray-50
card: white
text-primary: gray-800
text-secondary: gray-600

/* Spacing */
container-padding: px-4 sm:px-6 lg:px-8
card-padding: p-4 or p-6
gap: gap-4 or gap-6

/* Shadows */
card: shadow-md
card-hover: shadow-lg
container: shadow-lg

/* Borders */
default: border border-gray-300
radius: rounded-lg
```

---

## Implementation Notes for Designer

1. **Map is 400px height** - Can be adjusted, but ensure tiles load correctly
2. **Markers are custom icons** - URLs can be changed for different styles
3. **Product grid is responsive** - 1 col mobile, 2 cols tablet+, 3+ cols desktop
4. **All styling uses Tailwind** - No custom CSS except Leaflet overrides
5. **Colors follow Tailwind palette** - Easy to theme
6. **Typography is system fonts** - Can add custom fonts

---

## Quick Start for Designer

**Files to Modify**:
- `components/marketplace-view.tsx` - Layout, spacing, product grid
- `components/product-card.tsx` - Card design, hover states
- `components/nepal-leaflet-map-selector.tsx` - Map container styling
- `app/globals.css` - Global styles, Leaflet overrides

**Key Sections**:
- Map header: Lines 142-154 in `nepal-leaflet-map-selector.tsx`
- Product grid: Lines 112-117 in `marketplace-view.tsx`
- Product card: Entire `product-card.tsx` file

**Testing**: Run `npm run dev` and visit http://localhost:3000

---

This architecture provides a solid foundation for UI/UX improvements while maintaining the core map-based filtering functionality.




