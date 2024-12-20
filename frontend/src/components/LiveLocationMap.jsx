import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";

const LiveLocationMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 15,
        }),
      });

      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSource });
      mapInstanceRef.current.addLayer(vectorLayer);

      markerRef.current = new Feature({
        geometry: new Point(fromLonLat([0, 0])),
      });

      markerRef.current.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 1.5,
          }),
        })
      );

      vectorSource.addFeature(markerRef.current);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location && mapInstanceRef.current && markerRef.current) {
      const [longitude, latitude] = location;
      const newCoords = fromLonLat([longitude, latitude]);
      markerRef.current.getGeometry().setCoordinates(newCoords);

      const view = mapInstanceRef.current.getView();
      view.setCenter(newCoords);
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        User's Live Location
      </h1>
      <div className="w-[375px] h-[677px] shadow-md rounded-lg overflow-hidden border border-gray-300">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default LiveLocationMap;
