import Axios from "@/utils/axios";

export type Role = "OWNER" | "STAFF" | "MANAGER" | "Attendee" | null;

export interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
  };
}

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
  meta: PaginationMeta | null;
}

export async function getEvents(
  token: string,
  isMyEventSection: boolean | undefined,
  page: number = 1,
  pageSize: number = 8
): Promise<{ events: Event[]; meta: PaginationMeta | null }> {
  const path =
    isMyEventSection == undefined
      ? `/events?page=${page}&pageSize=${pageSize}`
      : isMyEventSection == false
        ? `/events?page=${page}&myevents=${isMyEventSection}&pageSize=${pageSize}`
        : `/events?myevents=${isMyEventSection}`;
  const response = await Axios.get<EventsResponse>(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    events: response.data.data,
    meta: response.data.meta,
  };
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
  location_lat: number;
  location_long: number;
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
