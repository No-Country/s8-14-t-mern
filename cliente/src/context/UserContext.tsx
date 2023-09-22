/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useState } from "react";
import { IUser } from "@/types";
import apiUsers from "@/services/users";

const userContextInitialState = {
  user: {},
  setUser: () => { },
  isAuthenticated: false,
  setUserData: () => { },
  deleteUserData: () => { },
  fetchUserData: () => { },
};
interface UserContextType {
  user: Partial<IUser>;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  isAuthenticated: boolean;
  setUserData: (userData: Partial<IUser>) => void;
  deleteUserData: () => void;
  fetchUserData: () => void;
}

const USER_INITIAL_STATE: Partial<IUser> = localStorage.getItem("user")
  ? JSON.parse(localStorage.user)
  : {
    email: "usuario@example.com",
    id: "",
    firstName: "Usuario",
    lastname: "Invitado",
    alias: "usuario.invitado.usua",
    token: "sda",
    balance: 0
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
    const user = {
      ...userData,
      lastname: userData?.lastName || userData?.lastname,
    };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const deleteUserData = () => {
    setUser({});
    localStorage.removeItem("user");
  };
  const fetchUserData = async () => {
    try {
      if (user.id) {
        const { data } = await apiUsers.getUser(user?.id);
        setUserData({ ...data, token: user?.token });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        isAuthenticated,
        setUserData,
        deleteUserData,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider, useUserData };
