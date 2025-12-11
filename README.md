# Nepal NFT Marketplace - Interactive Map Selector

An interactive marketplace with **OpenStreetMap + Leaflet.js** integration for selecting Nepalese cities. Built for promoting local art, culture, and handicrafts from various regions of Nepal.

## Features

- 🗺️ **Interactive OpenStreetMap** - Real Nepal geography (FREE, no API key needed!)
- 🏙️ **16 Major Cities** marked with clickable markers
- 🔍 **Dynamic Product Filtering** based on selected city
- 📱 **Mobile-responsive** design
- ✨ **Smooth Animations** - map zooms and pans to selected cities
- 🎯 **Visual Feedback** - selected cities highlighted in blue
- 💰 **100% Free** - No Google Maps API key required!

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Leaflet.js + react-leaflet** - OpenStreetMap integration (FREE!)
- **OpenStreetMap tiles** - Free map tiles

## Getting Started

### Prerequisites

- Node.js 18+
- No API keys needed! 🎉

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** No API keys, no billing setup - just works! 🚀

## Project Structure

```
MAP_SELECT/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Home page with marketplace view
│   └── globals.css          # Global styles + Leaflet CSS
├── components/
│   ├── nepal-leaflet-map-selector.tsx    # OpenStreetMap city selector
│   ├── marketplace-view.tsx              # Main marketplace component
│   └── product-card.tsx                  # Product display card
├── data/
│   ├── cities.json          # City coordinates dataset
│   ├── cities-data.ts       # City data utilities
│   └── mock-products.ts     # Sample product listings
├── types/
│   ├── map.ts               # TypeScript interfaces
│   └── product.ts           # Product types
└── package.json
```

## Usage

### City Selection Flow

1. User opens marketplace page
2. OpenStreetMap displays Nepal with 16 major cities marked
3. User clicks a city marker → map zooms to that city
4. Products filter dynamically to show only items from that city
5. Click "Clear Selection" to show all products

### Adding More Cities

Edit `data/cities.json`:

```json
{
  "name": "New City",
  "lat": 28.1234,
  "lng": 84.5678
}
```

The map will automatically show the new city marker.

### Customizing Map

Edit `components/nepal-leaflet-map-selector.tsx`:

- **Map Style**: Change tile layer URL for different map styles
- **Zoom Level**: Adjust `zoom={7}` (lower = more zoomed out)
- **Marker Icons**: Modify icon URLs in `getMarkerIcon()` function
- **Center**: Change `center` coordinates to focus on different areas

### Available Map Tile Providers

You can use different tile layers by changing the `url` in `TileLayer`:

- **OpenStreetMap** (default): `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **CartoDB Positron** (light): `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`
- **CartoDB Dark**: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`
- **Stamen Terrain**: `https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png`

## Cities Included

- Kathmandu
- Pokhara
- Biratnagar
- Lalitpur
- Birgunj
- Dharan
- Bharatpur
- Butwal
- Janakpur
- Hetauda
- Nepalgunj
- Dhangadhi
- Itahari
- Tansen
- Gorkha
- Bhaktapur

## Features in Detail

### Map Interactions

- **Click Marker**: Select city and filter products
- **Zoom**: Use mouse wheel or zoom controls
- **Pan**: Click and drag to move around
- **Popup**: Hover/click markers to see city names
- **Auto-zoom**: Map automatically zooms to selected city

### Product Filtering

- Real-time filtering based on selected city
- Product count updates automatically
- Clear filter to show all products
- Visual feedback when city is selected (blue marker)

## Development

### Build for Production

```bash
npm run build
npm start
```

### Development Server

Use webpack explicitly for better Leaflet compatibility:

```bash
npm run dev
```

This runs with `--webpack` flag automatically (configured in package.json).

## Why OpenStreetMap + Leaflet?

✅ **100% Free** - No API keys, no billing, no usage limits  
✅ **Open Source** - Community-driven, reliable  
✅ **Lightweight** - Faster load times  
✅ **Customizable** - Easy to style and modify  
✅ **Privacy-Friendly** - No tracking or data collection  
✅ **Offline Capable** - Can cache tiles for offline use  

Perfect for hackathon MVPs and budget-conscious projects!

## Future Enhancements

- [ ] Search box with autocomplete for cities
- [ ] Province-level filtering
- [ ] Custom marker icons per city type
- [ ] City details panel with statistics
- [ ] Cluster markers for zoomed-out view
- [ ] Draw polygons to select custom regions
- [ ] Export selected region data
- [ ] Dark mode map theme

## Troubleshooting

### Map Not Loading

1. Check browser console for errors
2. Ensure Leaflet CSS is imported (already done in globals.css)
3. Verify `react-leaflet` and `leaflet` are installed
4. Check that component is client-side only (using dynamic import)

### Markers Not Showing

1. Verify `data/cities.json` has valid coordinates
2. Check marker icon URLs are accessible
3. Ensure coordinates are valid (lat: 26-30, lng: 80-88 for Nepal)

### Build Errors

1. Run `npm install` to ensure all dependencies are installed
2. Use `npm run dev` (which includes --webpack flag)
3. Check TypeScript types in `types/` directory
4. Verify all imports are correct

## License

MIT

## Contributing

This is a hackathon MVP. For production:

- Add proper error handling
- Implement loading states
- Add unit tests
- Optimize bundle size
- Add analytics
- Implement proper authentication
- Add backend API integration
- Cache map tiles for offline support
