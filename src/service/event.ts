import Axios from "@/utils/axios";

export type Role = "OWNER" | "STAFF" | "MANAGER";

export interface Event {
  id: string;
  name: string;
  organizer: string;
  description?: string;
  start_time: string;
  end_time: string;
  location: string;
  role: Role;
  evaluation_form: string;
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

  console.log(response);
  return response.data.data;
}
