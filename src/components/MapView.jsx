import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import L from "leaflet";

function ClickHandler({ onMapClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

function createPinIcon(color) {
  return L.divIcon({
    className: "",
    html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z" fill="${color}"/>
      <circle cx="15" cy="15" r="7" fill="white" opacity="0.9"/>
    </svg>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
}

const targetIcon = createPinIcon("#22c55e");

export default function MapView({ guess, onGuess, actualLocation, showResult, accentColor }) {
  const guessIcon = createPinIcon(accentColor || "#f59e0b");

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-700/50">
      <MapContainer
        center={[48.5, 10]}
        zoom={4}
        minZoom={3}
        maxZoom={12}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        {/* Base map without labels */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        {/* Labels layer on top with higher visibility */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          pane="shadowPane"
          className="map-labels-layer"
        />
        <ClickHandler onMapClick={onGuess} disabled={showResult} />

        {guess && (
          <Marker position={[guess.lat, guess.lng]} icon={guessIcon}>
            <Popup>Your guess</Popup>
          </Marker>
        )}

        {showResult && actualLocation && (
          <>
            <Marker position={[actualLocation.lat, actualLocation.lng]} icon={targetIcon}>
              <Popup>Actual location</Popup>
            </Marker>
            {guess && (
              <Polyline
                positions={[
                  [guess.lat, guess.lng],
                  [actualLocation.lat, actualLocation.lng],
                ]}
                color="#f59e0b"
                weight={2}
                dashArray="8 8"
                opacity={0.7}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
}
