import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axiosInstance from "../utils/axiosInstance";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const loginFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
}).required();

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        shouldFocusError: false,
        mode: "onChange",
        resolver: yupResolver(loginFormSchema)
    });

    const login = useSignIn();
    const auth = useAuthUser();

    useEffect(() => {
        if (auth) {
            const redirectPath = auth.role === "admin" ? "/users" : "/journals";
            window.location.href = redirectPath;
        }
    }, [auth])

    const handleLogin = async (formData) => {
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            const {
                accessToken,
                refreshToken,
                id,
                role: { name: role }
            } = response.data.data;

            if (login({
                auth: {
                    token: accessToken,
                    type: "Bearer",
                },
                refresh: refreshToken,
                userState: {
                    uid: id,
                    role: role,
                }
            })) {
                const redirectPath = role === "admin" ? "/users" : "/journals";
                window.location.href = redirectPath;
            } else {
                toast.error("Gagal menyimpan token");
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Terjadi kesalahan. Silahkan coba lagi.";
            toast.error(msg);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-xl rounded-3xl bg-white px-6 py-8 shadow-md">
                <h1 className="mb-12 text-center text-4xl font-bold text-slate-900">Login</h1>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <Input
                        {...register("email")}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="example@gmail.com"
                        invalid={!!errors.email}
                    />
                    <p className="text-sm text-red-400">
                        {errors.email?.message}
                    </p>
                    <Input
                        {...register("password")}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="******"
                        invalid={!!errors.password}
                    />
                    <p className="text-sm text-red-400">
                        {errors.password?.message}
                    </p>
                    <div className="my-12 flex flex-col">
                        <Button
                            type="submit"
                        >
                            {isSubmitting ? "Logining..." : "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
