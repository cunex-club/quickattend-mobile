import Axios from "@/utils/axios";

export interface Health {
  response_time: number;
  database_connection: boolean;
  database_responseTime: number;
  memory_consumption: number;
}
interface GetHealthResponse {
  data: Health;
  error: null;
  meta: null;
}

export async function getHealth(): Promise<Health> {
  const response = await Axios.get<GetHealthResponse>(`/health-check`);
  return response.data.data;
}
