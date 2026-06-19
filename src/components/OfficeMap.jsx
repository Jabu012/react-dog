import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icon paths in webpack/vite environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OFFICES = {
  johannesburg: {
    name: "Johannesburg Office",
    address: "Rosebank Link, 173 Oxford Rd, Rosebank, 2196",
    coords: [-26.1444, 28.0435],
    zoom: 16
  },
  capetown: {
    name: "Cape Town Office",
    address: "Workshop 17, Watershed, V&A Waterfront, 8002",
    coords: [-33.9068, 18.4225],
    zoom: 16
  }
};

export default function OfficeMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeOffice, setActiveOffice] = useState('johannesburg');

  useEffect(() => {
    if (!mapRef.current) return;

    // Initial center is Johannesburg
    const initialCoords = OFFICES.johannesburg.coords;
    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView(initialCoords, 16);

    mapInstanceRef.current = map;

    // Use CartoDB Dark Matter tiles for a sleek dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Position zoom control at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add markers for both offices
    Object.entries(OFFICES).forEach(([key, office]) => {
      const marker = L.marker(office.coords)
        .addTo(map)
        .bindPopup(`
          <div class="map-popup-content">
            <h4 style="font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: #00d2ff; margin: 0 0 6px 0; font-size: 1.05rem;">${office.name}</h4>
            <p style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #cbd5e1; margin: 0; line-height: 1.4;">${office.address}</p>
          </div>
        `);
      
      markersRef.current[key] = marker;
    });

    // Auto-open active office popup
    markersRef.current.johannesburg.openPopup();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectOffice = (key) => {
    setActiveOffice(key);
    const office = OFFICES[key];
    const map = mapInstanceRef.current;
    
    if (map) {
      map.setView(office.coords, office.zoom, {
        animate: true,
        duration: 1.2
      });
      
      setTimeout(() => {
        if (markersRef.current[key]) {
          markersRef.current[key].openPopup();
        }
      }, 600);
    }
  };

  return (
    <div className="office-map-section">
      <div className="office-selector">
        <button
          className={`office-tab ${activeOffice === 'johannesburg' ? 'active' : ''}`}
          onClick={() => handleSelectOffice('johannesburg')}
        >
          <span className="dot"></span>
          <span>Johannesburg HQ</span>
        </button>
        <button
          className={`office-tab ${activeOffice === 'capetown' ? 'active' : ''}`}
          onClick={() => handleSelectOffice('capetown')}
        >
          <span className="dot"></span>
          <span>Cape Town Hub</span>
        </button>
      </div>

      <div className="map-wrapper">
        <div ref={mapRef} className="map-container" />
      </div>
    </div>
  );
}
