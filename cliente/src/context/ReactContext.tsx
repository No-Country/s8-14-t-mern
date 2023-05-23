import React, { ReactNode, createContext, useMemo, useRef } from 'react';
type User = {
  msg: string;
  data: Data;
}
type Data = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  alias: string;
  token: string;
}
type ContextTypes = {
  isLogin: React.MutableRefObject<boolean>,
  user: User,
}
const INITIAL_STATE: ContextTypes = {
  user: localStorage.user ? JSON.parse(localStorage.user) : {
    msg: '',
    data: {
      email: '',
      id: '',
      firstName: '',
      lastName: '',
      alias: '',
      token: ''
    }
  },
  isLogin: {
    current: false
  }
}
const UserContext = createContext<ContextTypes>(INITIAL_STATE);

function UserProvider({ children }: { children: ReactNode }): JSX.Element {
  const isLogin: ContextTypes["isLogin"] = useRef<boolean>(false)
  const user: ContextTypes["user"] = useMemo(() => {
    return localStorage.user ? JSON.parse(localStorage.user) : {
      msg: '',
      data: {
        email: '',
        id: '',
        firstName: '',
        lastName: '',
        alias: '',
        token: ''
      }
    }
  }, [isLogin])
  return (
    <UserContext.Provider value={{
      isLogin,
      user
    }}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext, UserProvider }