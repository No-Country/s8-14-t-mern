import AppRouter from "./router/AppRouter";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { RechargeProvider } from "./context/RechargeContext";

import "./App.css";

function App(): JSX.Element {
  return (
    <RechargeProvider>
    <UserProvider>
      <AppRouter />
      <Toaster position="bottom-center" />
    </UserProvider>
    </RechargeProvider>
  );
}

export default App;
