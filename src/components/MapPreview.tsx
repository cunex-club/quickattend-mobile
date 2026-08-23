import { Map, MapMarker, MarkerContent } from "@/components/map/Map";

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

const isValidLat = (value: number) => value >= -90 && value <= 90;
const isValidLng = (value: number) => value >= -180 && value <= 180;

const MapPreview = ({ lat, lng }: MapPreviewProps) => {
  const safeLat = isValidLat(lat) ? lat : DEFAULT_CENTER.location_lat;
  const safeLng = isValidLng(lng) ? lng : DEFAULT_CENTER.location_long;

  return (
    <div style={{ width: "100%", height: "180px" }}>
      <Map
        center={[safeLng, safeLat]}
        zoom={15}
        interactive={false}
        attributionControl={false}
      >
        <MapMarker longitude={safeLng} latitude={safeLat}>
          <MarkerContent />
        </MapMarker>
      </Map>
    </div>
  );
};

export default MapPreview;
