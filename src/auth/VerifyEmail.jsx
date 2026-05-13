import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [checkingEmail, setCheckingEmail] = useState(false);

    // Get email from location state (if passed from register/login) or from user
    const email = location.state?.email || user?.email;

    useEffect(() => {
        // Wait for auth to finish loading
        if (authLoading) return;

        // If user is already verified, redirect to home
        if (user?.email_confirmed_at) {
            navigate("/home", { replace: true });
        }

        // Check if we're coming from email confirmation (hash in URL)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get("type");
        const accessToken = hashParams.get("access_token");

        if (type === "email" && accessToken) {
            setCheckingEmail(true);
            // Email confirmation is being processed by AuthContext
            // Wait a moment and check if user is now verified
            setTimeout(() => {
                supabase.auth.getSession().then(({ data }) => {
                    if (data.session?.user?.email_confirmed_at) {
                        setMessage("Email verified successfully! Redirecting...");
                        toast.success("Email verified successfully!");
                        setTimeout(() => {
                            navigate("/login", { replace: true });
                        }, 1500);
                    } else {
                        setCheckingEmail(false);
                        setMessage("Email verification link may have expired. Please try resending.");
                        toast.warn("Email verification link may have expired. Please try resending.");
                    }
                });
            }, 1000);
        }
    }, [user, authLoading, navigate]);

    const handleResendEmail = async () => {
        if (!email) {
            setMessage("No email address found. Please register again.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/verify-email`,
                },
            });

            if (error) {
                setMessage(`Error: ${error.message}`);
                toast.error(`Error: ${error.message}`);
            } else {
                setMessage("Verification email sent! Please check your inbox (and spam folder).");
                toast.success("Verification email sent! Please check your inbox (and spam folder).");
            }
        } catch (err) {
            const errorMsg = err.message || "Failed to send verification email";
            setMessage(`Error: ${errorMsg}`);
            toast.error(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    // Show loading while auth is loading
    if (authLoading || checkingEmail) {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-4 text-sm text-gray-600">
                            {checkingEmail ? "Verifying your email..." : "Loading..."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // If no email is available, show error
    if (!email) {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-800">
                            No email address found. Please register or login first.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/register")}
                        className="mt-4 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
                    >
                        Go to Register
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-70">
                    Verify Your Email
                </h2>
                <p className="mt-4 text-center text-sm text-gray-500">
                    We've sent a confirmation email to:
                </p>
                <p className="mt-2 text-center text-sm font-medium text-gray-700">
                    {email}
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="rounded-md bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                        Please click the confirmation link in your email to verify your
                        account. After verification, you'll be able to access all features.
                    </p>
                </div>

                {message && (
                    <div
                        className={`mt-4 rounded-md p-4 ${message.startsWith("Error") || message.includes("expired")
                            ? "bg-red-50 text-red-800"
                            : message.includes("successfully")
                                ? "bg-green-50 text-green-800"
                                : "bg-blue-50 text-blue-800"
                            }`}
                    >
                        <p className="text-sm">{message}</p>
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    <button
                        onClick={handleResendEmail}
                        disabled={loading}
                        className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Resend Verification Email"}
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 cursor-pointer"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;