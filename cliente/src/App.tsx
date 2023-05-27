import AppRouter from "./router/AppRouter";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App(): JSX.Element {
  return (
    <UserProvider>
      <AppRouter />
      <Toaster position="bottom-center" />
    </UserProvider>
  );
}

export default App;
