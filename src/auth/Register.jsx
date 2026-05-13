// import { useQueryClient } from "@tanstack/react-query";
// import supabase from "../lib/supabase";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useRegister } from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const password = watch("password");

    const navigate = useNavigate()

    const registerMutation = useRegister();
    const googleMutation = useGoogleAuth();

    // 🔐 Email Signup
    const onSubmit = (data) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Check your email to confirm your account");
                navigate("/verify-email", { state: { email: data.email } });
                reset();
            },
            onError: (error) => {
                toast.error(error.message || "Signup failed");
            },
        });
    };

    // 🔴 Google Login
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
                        <label
                            htmlFor="name"
                            className="block text-sm/6 font-medium"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your Name"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters",
                                    },
                                })}
                                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.name && (
                            <span className="text-red-600">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium"
                            >
                                Email
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
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
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.password && (
                            <span className="text-red-600">{errors.password.message}</span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirmpassword"
                                className="block text-sm/6 font-medium"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmpassword", {
                                    required: "Password is required",
                                    validate: (value) =>
                                        value === password || "Password don't match",
                                })}
                                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.confirmpassword && (
                            <span className="text-red-600">
                                {errors.confirmpassword.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className={`w-full cursor-pointer py-2 rounded mt-5 text-white ${registerMutation.isPending
                            ? "bg-gray-400"
                            : "bg-rose-600 hover:bg-rose-700"
                            }`}
                    >
                        {registerMutation.isPending ? "Creating..." : "Sign Up"}
                    </button>

                    <div className="my-4 text-center text-gray-400">or</div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={googleMutation.isPending}
                        className="w-full py-2 cursor-pointer border rounded flex items-center justify-center gap-2 hover:bg-gray-100 hover:text-black"
                    >
                        {googleMutation.isPending ? "Redirecting..." : "Continue with Google"}
                    </button>
                </form>

            </div>
        </div>



    );
};

export default Register;
