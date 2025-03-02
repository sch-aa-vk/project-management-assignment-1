import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { notification } from "antd";
import { useCallback } from "react";
import {
  NotificationsContext,
  NotificationType,
} from "./services/notificationsContext";
import Header from "./components/Header";
import { useAppSelector } from "./store/hooks/useAppSelector";
import { isAuthenticatedSelector } from "./store/selectors/authSelectors";
import AccountManagement from "./pages/AccountManagement";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  const openNotification = useCallback(
    (message: string, description: string, type: NotificationType) => {
      api[type]({
        message,
        description,
        placement: "top",
      });
    },
    [api]
  );

  return (
    <BrowserRouter>
      {contextHolder}
      <NotificationsContext.Provider value={{ openNotification }}>
        <Header />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/account" element={<AccountManagement />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </NotificationsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
