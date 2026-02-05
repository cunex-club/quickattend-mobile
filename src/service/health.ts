import Axios from "@/utils/axios";

interface GetHealthResponse {
  data: {
    response_time: number;
    database_connection: boolean;
    database_responseTime: number;
    memory_consumption: number;
  };
  error: null;
  meta: null;
}

export async function getHealth(): Promise<GetHealthResponse> {
  const response = await Axios.get<GetHealthResponse>("/health-check");
  return response.data;
}
