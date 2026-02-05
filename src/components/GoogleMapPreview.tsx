import GoogleMapsProvider from "@/providers/GoogleMapProvider";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface MapPreviewProps {
  lat: number;
  lng: number;
}

export const DEFAULT_CENTER = { lat: 13.7386, lng: 100.5321 };
const GoogleMapContainerStyle = { width: "100%", height: "180px" };

export const MapPreviewComponent = ({ lat, lng }: MapPreviewProps) => {
  return (
    <GoogleMap
      mapContainerStyle={GoogleMapContainerStyle}
      center={{ lat, lng }}
      zoom={15}
      options={{
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: false,
        zoomControl: false,
        keyboardShortcuts: false,
        clickableIcons: false,
        gestureHandling: "none",
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

const GoogleMapPreview = ({ lat, lng }: MapPreviewProps) => {
  return (
    <GoogleMapsProvider>
      <MapPreviewComponent lat={lat} lng={lng} />
    </GoogleMapsProvider>
  );
};

export default GoogleMapPreview;
