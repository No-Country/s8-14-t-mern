import React, { useContext } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/utils/Layout";
import { UserContext } from "@/context/ReactContext";
import ResponsPage from "@/pages/ResponsPage";

const Onboarding: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/Onboarding")
);
const AuthPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/AuthPage")
);
const HomePage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/HomePage")
);
const ProfilePage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/ProfilePage")
);
const PersonalDataPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/PersonalDataPage")
);
const ChangeName: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/ChangeName")
);
const ScannerQrPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/ScannerQrPage")
);
const NewTransferReceiverPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("../pages/NewTransfer.receiver"));
const NewTransferAmountPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("../pages/NewTransfer.amount"));
const NewTransferCategoryPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("../pages/NewTransfer.category"));
const NewTransferSendPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/NewTransfer.send")
);
const AddFundsMenuPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("@/pages/AddFundsMenuPage")
);
const AddFundsByTransferPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("@/pages/AddFundsByTransferPage"));
const TransactionsPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("@/pages/TransactionsPage"));

export default function AppRouter(): JSX.Element {
  const { user } = useContext(UserContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {user.data.id && (
            <>
              <Route path="/" element={<Onboarding />} />
              <Route path="/auth/:slug" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {!user.data.id && (
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/personalData" element={<PersonalDataPage />} />
                <Route path="/changename" element={<ChangeName />} />
              </Route>
              <Route
                path="/newTransfer/receiver"
                element={<NewTransferReceiverPage />}
              />
              <Route
                path="/newTransfer/amount"
                element={<NewTransferAmountPage />}
              />
              <Route
                path="/newTransfer/category"
                element={<NewTransferCategoryPage />}
              />
              <Route
                path="/newTransfer/send"
                element={<NewTransferSendPage />}
              />
              <Route path="/addFunds" element={<AddFundsMenuPage />} />
              <Route
                path="/addFunds/transfer"
                element={<AddFundsByTransferPage />}
              />
              <Route
                path="/addFunds/cash"
                element={<AddFundsByTransferPage />}
              />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/scanner" element={<ScannerQrPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route
                path="/response"
                element={<ResponsPage backmsg="Tu envio se realizo con exito" />}
              />
            </>
          )}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
