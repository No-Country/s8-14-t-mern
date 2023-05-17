import NavBar from "@/components/NavBar";
import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
)

export default function AppRouter(): JSX.Element {
  const user = true;
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
              <Route path="/home" element={<HomePage />}>
                <Route path="" element={<NavBar />} />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/changename" element={<ChangeName />} />
              <Route path="/personalData" element={<PersonalDataPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
