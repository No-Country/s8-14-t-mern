import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextProps {
  user: boolean | null;
  setUser: Dispatch<SetStateAction<boolean | null>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

export default UserContext;
