"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

interface Props {
  coords: [number, number];
}

function MapRecenter({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [map, coords]);
  return null;
}

export function LeafletMap({ coords }: Props) {
  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div style="
          width:18px;height:18px;
          background:#1D4ED8;
          border-radius:50%;
          border:2.5px solid #fff;
          box-shadow:0 0 0 5px rgba(29,78,216,0.22),0 0 18px 6px rgba(29,78,216,0.35);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    []
  );

  return (
    <MapContainer
      center={coords}
      zoom={14}
      zoomControl={false}
      attributionControl={false}
      className="fixed inset-0 z-0 h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      <MapRecenter coords={coords} />
      <Marker position={coords} icon={userIcon} />
    </MapContainer>
  );
}
