// filepath: src/components/order/OrderMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet + Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  lat: number;
  lng: number;
  address: string;
}

const OrderMap: React.FC<Props> = ({ lat, lng, address }) => (
  <MapContainer center={[lat, lng]} zoom={15} style={{ height: 300, width: "100%", borderRadius: 12, marginTop: 24 }}>
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lng]}>
      <Popup>
        {address}
      </Popup>
    </Marker>
  </MapContainer>
);

export default OrderMap;