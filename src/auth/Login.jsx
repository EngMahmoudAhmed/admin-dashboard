import supabase from "../lib/supabase";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const googleMutation = useGoogleAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        const { data: signInData, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        const signedUser = signInData?.user ?? signInData?.session?.user;

        if (!signedUser) {
            toast.success("Login succeeded but no user returned. Check console for details.");
            return;
        }

        if (!signedUser.email_confirmed_at) {
            toast.warn("Please confirm your email before logging in.");
            navigate("/verify-email");
            reset();
            return;
        }
        // { state: { email: signedUser.email } }
        setTimeout(() => {
            toast.success("Logged in successfully");
            navigate("/home");
            reset();
        }, 100);
    };

    const handleGoogleLogin = () => {
        googleMutation.mutate(undefined, {
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-b-black">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    action="#"
                    // method="POST"
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-600">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                {...register("password", {
                                    required: "password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        <div className="text-sm mt-4">
                            {errors.password && (
                                <span className="text-red-600">{errors.password.message}</span>
                            )}
                        </div>
                        <div className="text-end mt-3">
                            <a
                                href="#"
                                className="font-semibold text-indigo-400 hover:text-indigo-300"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "loading..." : "Login"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6">
                    Not a member?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                        Start a 14 day free trial
                    </button>

                    <div className="my-4 text-center text-gray-400">or</div>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={googleMutation.isPending}
                        className="w-full py-2 cursor-pointer border rounded flex items-center justify-center gap-2 hover:bg-gray-100 hover:text-black"
                    >
                        {googleMutation.isPending ? "Redirecting..." : "Continue with Google"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
