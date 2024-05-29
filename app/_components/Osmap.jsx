"use client";
import React, { useState , useEffect} from "react";
import {
  useMap,
  MapContainer,
  Marker,
  TileLayer,
  LayersControl,
  Circle,
  FeatureGroup, 
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DrawerSearchField from "./DrawerSearchFiled";


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DrawerSearchFiled from "./DrawerSearchFiled";
import Searchplace from "./Searchplace";
import Touchbar from "./Touchbar";


function getFirstThreeWords(text) {
  if (!text) return '';
  const words = text.split(' '); 
  return words.slice(0, 3).join(' ');
}

const OsMap = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 0.7798, lng: 37.7282 });
  const [markers, setMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(7);
  const [minZoom, setminZoom] = useState(1)

  const handleMarkerClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = (results) => {
    if (results.length > 0) {
      const { y: lat, x: lng, label } = results[0];
      setCenter({ lat, lng }); // Re-center the map
      setZoomLevel(18);
      setMarkers([{ lat, lng, label }]); // Update the markers state with the search results
      const bounds = L.latLngBounds([{ lat, lng }]);
      setMarkers((prevMarkers) => {
        const newMarkers = [...prevMarkers, { lat, lng, label }];
        bounds.extend(newMarkers.map((m) => [m.lat, m.lng]));
        return newMarkers;
      });
      setIsDrawerOpen(false);
    }
  };

  const MapContent = () => {
    const map = useMap();

    useEffect(() => {
      if (markers.length > 0) {
        const bounds = L.latLngBounds();

        markers.forEach((marker) => {
          bounds.extend([
            [marker.lat + 0.001, marker.lng + 0.001], // Adding some leeway
            [marker.lat - 0.001, marker.lng - 0.001],
          ]);
        });

        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [markers, map]);

  

    return null; // No actual visual content
  };

  

  const apiKey =
    "pk.eyJ1IjoiY2hlcHBhciIsImEiOiJjbHU5bGE5eHUwNzd3MmpzOG50ZHhtZTdjIn0.mwEX_iE4dhE9b3P_9i7HIA";

  return (
  
    
    <div className="relative fixed">
      {/* <Button
        type="button"
        className="absolute top-2 left-2 z-50 text-white hover:bg-red-800"
        onClick={handleMarkerClick}
      >
        <Search />
      </Button> */}

      <MapContainer center={center} zoom={zoomLevel} zoomControl={false} minZoom={minZoom}>
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=JpiQqy5cFkwz1ZdUczu7"
          attribution=""
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Marker">
          {markers.map((marker, index) => (
          <Circle
            key={index}
            center={{ lat: marker.lat, lng: marker.lng }}
            radius={100}
          >
            <Popup>{getFirstThreeWords(marker.label)}</Popup>
          </Circle>
        ))}
          </LayersControl.Overlay>
        </LayersControl>

        <MapContent />
      </MapContainer>

      <div className="absolute fixed w-full align-center">
      <Touchbar />
      </div>
  
      

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Search for a Location</DrawerTitle>
          </DrawerHeader>
          <DrawerSearchFiled onSearch={handleSearch} />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
   
  );
};

export default OsMap;
