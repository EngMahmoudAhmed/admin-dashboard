import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Footer from "./pages/Footer";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import VerifyEmail from "./auth/VerifyEmail";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoute";

function IndexRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.email_confirmed_at) return <Navigate to="/verify-email" replace />;
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastWithTheme />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<IndexRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

const ToastWithTheme = () => {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnHover
      draggable
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
};

export default App;
