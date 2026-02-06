"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  email: string | null;
  facultyCode?: string;
  facultyNameEN?: string;
  facultyNameTH?: string;
  firstNameEN: string;
  firstNameTH: string;
  lastNameEN: string;
  lastNameTH: string;
  refId: string;
  studentYear?: string;
  titleNameEN: string;
  titleNameTH: string;
  userId: string;
  userType: "STUDENT" | "STAFF";
}

// Mock User Data from CUNEX
const mockUser: User = {
  email: null,
  facultyCode: "21",
  facultyNameEN: "FACULTY OF ENGINEERING",
  facultyNameTH: "คณะวิศวกรรมศาสตร์",
  firstNameEN: "Thanagorn",
  firstNameTH: "ธนกร",
  lastNameEN: "Chaiyut",
  lastNameTH: "ไชยยุทธ",
  refId: "6631321321",
  studentYear: "2566",
  titleNameEN: "MISTER",
  titleNameTH: "นาย",
  userId: "55555555-5555-5555-5555-555555555555",
  userType: "STUDENT",
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
