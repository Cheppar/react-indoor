"use client";
import React, { useState } from "react";
import {
  useMap,
  MapContainer,
  Marker,
  TileLayer,
  LayersControl,
  Circle,
  FeatureGroup,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import DrawerSearchFiled from "./DrawerSearchFiled";
import Searchplace from "./Searchplace";

const myIcon = L.icon({
  iconUrl: "/next.svg",
  iconSize: [25, 42],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const OsMap = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 13.086, lng: 80.24 });
  const [markers, setMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5);
 
  

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

  const apiKey =
    "pk.eyJ1IjoiY2hlcHBhciIsImEiOiJjbHU5bGE5eHUwNzd3MmpzOG50ZHhtZTdjIn0.mwEX_iE4dhE9b3P_9i7HIA";

  return (
    <div className="relative">
      <Button
        type="button"
        className="absolute top-2 left-2 z-50 text-white hover:bg-red-800"
        onClick={handleMarkerClick}
      >
        <Search />
      </Button>

      <MapContainer center={center} zoom={zoomLevel} zoomControl={false}>
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=JpiQqy5cFkwz1ZdUczu7"
          attribution=""
        />
       
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Marker">
            <Marker
              position={center}
              icon={myIcon}
              eventHandlers={{ click: handleMarkerClick }}
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* <FeatureGroup className='mt-100'>
          <EditControl
            position="topleft"
            draw={{
              rectangle: true,
              circle: false,
            }}
          />
        </FeatureGroup> */}

        {markers.map((marker, index) => (
        <Circle
        key={index}
        center={{ lat: marker.lat, lng: marker.lng }}
        radius={100}
      >
            <Popup>{marker.label}</Popup>
          </Circle>
        ))}

      </MapContainer>

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
