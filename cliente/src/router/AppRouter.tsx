import React, { useContext } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUserData } from "@/context/UserContext";
import { NewTransferProvider } from "@/context/NewTransferContext";

import MainLayout from "@/utils/Layout";
import ResponsPage from "@/pages/ResponsPage";
import BenefitPage from "@/pages/BenefitPage";

const OnboardingPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/OnboardingPage")
);

const AuthPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/AuthPage")
);
const ResetPasswordRequestPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("../pages/ResetPassword.request"));
const ResetPasswordPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/ResetPassword")
);
const VerifyAccountPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/VerifyAccountPage")
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
const TransactionsPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("@/pages/TransactionsPage")
);
const RechargePage: React.LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/Recharge")
);
const RechargeCardNumberPage: React.LazyExoticComponent<() => JSX.Element> =
  lazy(() => import("../pages/Recharge.CardNumber"));
const RechargeSendPage: React.LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/Recharge.send")
);
const RechargeAmountPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/Recharge.Amount")
);
const CriptoPage: React.LazyExoticComponent<() => JSX.Element> = lazy(
  () => import("../pages/CriptoPage")
);

export default function AppRouter(): JSX.Element {
  const { isAuthenticated } = useUserData();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/auth/:slug" element={<AuthPage />} />
              <Route
                path="/resetPassword/request"
                element={<ResetPasswordRequestPage />}
              />
              <Route
                path="/olvide-password/:token"
                element={<ResetPasswordPage />}
              />
              <Route path="/confirmar/:token" element={<VerifyAccountPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/personalData" element={<PersonalDataPage />} />
                <Route path="/changename" element={<ChangeName />} />
                <Route path="/benefit" element={<BenefitPage />} />
              </Route>

              <Route element={<NewTransferProvider />}>
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
                <Route path="/scanner" element={<ScannerQrPage />} />
              </Route>

              <Route path="/addFunds" element={<AddFundsMenuPage />} />
              <Route
                path="/addFunds/transfer"
                element={<AddFundsByTransferPage />}
              />
              <Route
                path="/addFunds/cash"
                element={<AddFundsByTransferPage />}
              />
              <Route path="/recharge" element={<RechargePage />} />
              <Route
                path="/recharge/cardnumber"
                element={<RechargeCardNumberPage />}
              />
              <Route path="/recharge/amount" element={<RechargeAmountPage />} />
              <Route path="/recharge/send" element={<RechargeSendPage />} />
              <Route path="/cripto" element={<CriptoPage />} />

              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/response" element={<ResponsPage backmsg="" />} />
            </>
          )}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
