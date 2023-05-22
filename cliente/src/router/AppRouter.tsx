import NavBar from "@/components/NavBar";
import React, { useState } from "react";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/utils/Layout";

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

export default function AppRouter(): JSX.Element {
  const [user, setUser] = useState(true);
  console.log("change");
  /* useEffect(() => {
    console.log("useEffect");
    const storedUser = localStorage.getItem("user");
    const token: any | null = storedUser ? JSON.parse(storedUser) : null;
    if (token) {
      console.log("show", token);
      setUser(true);
    }
  }, [user]); */

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Onboarding />} />
              <Route path="/auth/:slug" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {user && (
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
              <Route path="/scanner" element={<ScannerQrPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
