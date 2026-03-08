"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  setUser: (user: User | null) => void;
  setUserLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [userLoading, setUserLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{ user, userLoading, setUser, setUserLoading }}
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
