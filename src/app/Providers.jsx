import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AuthProvider from "../context/auth/AuthContext";
import ThemeProvider, { useTheme } from "../context/theme/ThemeContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const Providers = ({ children }) => {

    const querClient = new QueryClient();

    return (
        <ThemeProvider>
            <AuthProvider>
                <QueryClientProvider client={querClient}>
                    <ToastWithTheme />
                    {children}
                </QueryClientProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

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
