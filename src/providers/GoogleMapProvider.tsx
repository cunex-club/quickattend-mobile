"use client";

import { useJsApiLoader } from "@react-google-maps/api";

export default function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) return <div className="h-[300px]" />;

  return <>{children}</>;
}
