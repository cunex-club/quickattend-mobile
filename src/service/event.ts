import Axios from "@/utils/axios";

export type Role = "OWNER" | "STAFF" | "MANAGER" | null;

export interface Event {
  id: string;
  name: string;
  organizer: string;
  description?: string;
  start_time: string;
  end_time: string;
  location: string;
  role: Role;
  evaluation_form: string | null;
}

interface EventsResponse {
  data: Event[];
  error: null;
  meta: null;
}

export async function getEvents(
  token: string,
  isManaged: boolean,
  page: number = 1,
  pageSize: number = 8
): Promise<Event[]> {
  const response = await Axios.get<EventsResponse>(
    `/events?page=${page}&managed=${isManaged}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export interface Agenda {
  activity_name: string;
  start_time: string;
  end_time: string;
}
export interface EventDetail {
  id: string;
  name: string;
  organizer: string;
  description?: string;
  start_time: string;
  end_time: string;
  location: string;
  role: Role;
  evaluation_form: string;
  agenda: Agenda[];
}

interface EventDetailResponse {
  data: EventDetail;
  error: null;
  meta: null;
}

export async function getEventById(
  token: string,
  eventId: string
): Promise<EventDetail> {
  const response = await Axios.get<EventDetailResponse>(`/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}
