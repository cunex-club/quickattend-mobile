import Axios from "@/utils/axios";
import { User } from "@/providers/UserProvider";

interface LoginResponse {
  data: {
    access_token: string;
  };
  error: null;
  meta: null;
}

interface UserProfileResponse {
  data: User;
  error: null;
  meta: null;
}

export async function loginWithLLEToken(token: string): Promise<string> {
  console.log("token:", token);
  const response = await Axios.post<LoginResponse>(
    `/auth/cunex?token=${token}`,
    {}
  );
  console.log("response:", response.data);
  return response.data.data.access_token;
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await Axios.get<UserProfileResponse>(`/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
}
