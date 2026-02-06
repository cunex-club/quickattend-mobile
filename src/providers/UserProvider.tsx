"use client";

import { getUserProfile } from "@/service/auth";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: String;
  ref_id: String;
  firstname_th: String;
  surname_th: String;
  title_th: String;
  firstname_en: String;
  surname_en: String;
  title_en: String;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = process.env.NEXT_PUBLIC_MOCK_JWT_TOKEN ?? "";

      if (token) {
        try {
          const fetchedUser = await getUserProfile(token);
          setUser(fetchedUser);
          console.log("UserProvider: User Information:", fetchedUser);
        } catch (error) {
          console.error("UserProvider: Error fetching user profile");
        }
      } else {
        console.log("UserProvider: No token found");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
