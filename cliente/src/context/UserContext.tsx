/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useState } from "react";
import { IUser } from "@/types";

const userContextInitialState = {
  user: {},
  setUser: () => {},
  isAuthenticated: false,
  setUserData: () => {},
  deleteUserData: () => {},
};
interface UserContextType {
  user: Partial<IUser>;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  isAuthenticated: boolean;
  setUserData: (userData: Partial<IUser>) => void;
  deleteUserData: () => void;
}

const USER_INITIAL_STATE: Partial<IUser> = localStorage.getItem("user")
  ? JSON.parse(localStorage.user)
  : {
      email: "",
      id: "",
      firstName: "",
      lastName: "",
      alias: "",
      token: "",
    };

const UserContext = createContext<UserContextType>(userContextInitialState);

function useUserData() {
  const context = useContext(UserContext);
  return context;
}

function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState(USER_INITIAL_STATE);
  const isAuthenticated = user?.token ? true : false;

  const setUserData = (userData: Partial<IUser>) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const deleteUserData = () => {
    setUser({});
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        isAuthenticated,
        setUserData,
        deleteUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider, useUserData };
