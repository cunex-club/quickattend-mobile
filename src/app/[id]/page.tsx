"use client";

import { useParams } from "next/navigation";

function EventDetailDiscovery() {
  const { id } = useParams();
  return <p>This is Event {id} from Landing Page</p>;
}

export default EventDetailDiscovery;
