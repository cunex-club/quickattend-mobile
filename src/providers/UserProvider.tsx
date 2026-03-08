"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface User {
  id: string;
  ref_id: string;
  firstname_th: string;
  surname_th: string;
  title_th: string;
  firstname_en: string;
  surname_en: string;
  title_en: string;
}

interface UserContextType {
  user: User | null | undefined;
  userLoading: boolean;
  userToken: string;
  setUser: (user: User | null) => void;
  setUserLoading: (loading: boolean) => void;
  setUserToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const [userToken, setToken] = useState("");

  const setUserToken = (token: string) => {
    setToken(token);
    localStorage.setItem("cunex_jwt_token", token);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("cunex_jwt_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userLoading,
        setUser,
        setUserLoading,
        userToken,
        setUserToken,
      }}
    >
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
