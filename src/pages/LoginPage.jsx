import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/example");
    }

    return (
        <div className="w-full max-w-xl px-6 py-8 bg-white rounded-3xl shadow-md">
            <h1 className="mb-12 text-center text-4xl font-bold text-slate-900">Login</h1>
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <form className="flex flex-col gap-2">
                    <Input name="email" type="email" label="Email" placeholder="example@gmail.com" />
                    <Input name="password" type="password" label="Password" placeholder="******" />
                    <div className="my-12 flex flex-col">
                        <Button onClick={handleNavigate}>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
