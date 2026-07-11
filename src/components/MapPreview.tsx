import { Map, MapMarker } from "@/components/map/Map";

interface MapPreviewProps {
  lat: number;
  lng: number;
}

export type LocationPoint = {
  location_lat: number;
  location_long: number;
};

export const DEFAULT_CENTER: LocationPoint = {
  location_lat: 13.7386,
  location_long: 100.5321,
};

const MapPreview = ({ lat, lng }: MapPreviewProps) => {
  return (
    <div style={{ width: "100%", height: "180px" }}>
      <Map
        center={[lng, lat]}
        zoom={15}
        interactive={false}
        attributionControl={false}
      >
        <MapMarker longitude={lng} latitude={lat} />
      </Map>
    </div>
  );
};

export default MapPreview;
