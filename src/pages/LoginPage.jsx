import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axiosInstance from "../utils/axiosInstance";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect } from "react";

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const login = useSignIn();
    const auth = useAuthUser();

    useEffect(() => {
        if (auth) {
            if (auth.role === "admin") window.location.href = "/users";
            if (auth.role === "user") window.location.href = "/journals";
        }
    }, [auth])

    const handleLogin = async (formData) => {
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            const { accessToken, refreshToken, id } = response.data.data;
            const role = response.data.data.role.name;

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
                if (role === "admin") {
                    window.location.href = "/users";
                } else if (role === "user") {
                    window.location.href = "/journals";
                }
            } else {
                console.error("Gagal menyimpan token");
            }
        } catch (error) {
            console.error("Login gagal: ", error.response?.data?.message || error.message);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-xl rounded-3xl bg-white px-6 py-8 shadow-md">
                <h1 className="mb-12 text-center text-4xl font-bold text-slate-900">Login</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleLogin)}>
                    {/* TODO: buat validasi setiap field input */}
                    <Input
                        {...register("email")}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="example@gmail.com"
                    />
                    <Input
                        {...register("password")}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="******"
                    />
                    <div className="my-12 flex flex-col">
                        <Button
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
