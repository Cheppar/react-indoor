
import React, { useEffect } from 'react';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

const Searchplace = ({apiKey}) => {
    const provider = new MapBoxProvider({
        params: {
          access_token: apiKey, // Your MapBox API key
        },
      });
    
      const searchControl = new GeoSearchControl({
        provider,
        style: 'button', // Customize as needed (e.g., 'bar' for a search bar)
      });
    
      const map = useMap();
    
      useEffect(() => {
        map.addControl(searchControl);
        return () => {
          map.removeControl(searchControl);
        };
      }, [map]);
    
      return null;
}

export default Searchplace