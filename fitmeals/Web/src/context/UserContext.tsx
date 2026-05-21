"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { logedUser } from "../types/logedUser.types";

const UserContext = createContext<logedUser | null>(null);

type UserProviderProps = {
  children: ReactNode;
  user: logedUser;
};

export const UserProvider = ({ children, user }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<logedUser>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
