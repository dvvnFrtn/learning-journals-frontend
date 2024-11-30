import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const UserPage = () => {
    const authHeader = useAuthHeader();
    console.log(authHeader)
    const getToken = (header) => {
        if (header && header.startsWith('Bearer ')) {
            return header.slice(7);
        }
    }

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get("/users", {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const users = response.data.data;
            console.log(users);
        } catch (error) {
            console.error("Gagal mengambil data users: ", error.response?.data?.message || error.message)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-6xl text-slate-900">User</h1>
                    <Button
                        onClick={getUsers}
                        variant="primary"
                    >
                        <PlusIcon className="size-6 fill-white" />
                        <span>Add User</span>
                    </Button>
                </div>
                <p className="text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </DashboardLayout>
    )
}

export default UserPage;
