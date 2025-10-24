'use client';

import { useParams } from 'next/navigation';

function EventDetailDiscovery() {
  const { id } = useParams();
  return <p>This is Event {id} from Discovery Page</p>;
}

export default EventDetailDiscovery;
