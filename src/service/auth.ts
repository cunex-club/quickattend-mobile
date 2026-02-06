import Axios from "@/utils/axios";
import { User } from "@/providers/UserProvider";

interface UserProfileResponse {
  data: User;
  error: null;
  meta: null;
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await Axios.get<UserProfileResponse>(`/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}
