import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { getModalContent, getToken } from "../utils/common";
import Modal from "../components/Modal";
import { MESSAGES, MODAL, TABLE_HEADER } from "../constants/string.const";
import CreateUserForm from "../forms/CreateUserForm";
import UpdateUserForm from "../forms/UpdateUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import TableHeader from "../components/TableHeader";
import DetailUserForm from "../forms/DetailUserForm";

const UserPage = () => {
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const authHeader = useAuthHeader();

    const getUsers = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/users?limit=20", {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const users = response.data.data;
            setUsersData(users);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.users.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "index",
            header: "No",
            cell: (prop) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setMode("detail");
                        setUserData(prop.row.original);
                        setIsOpen(true);
                    }}
                    className="flex justify-center hover:text-blue-400 hover:underline">
                    {prop.row.index + 1}
                </span>
            ),
            size: 80
        }),
        columnHelper.accessor("email", {
            cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor("fullName", {
            cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor("role.name", {
            id: "role",
            header: () => (
                <span className="flex justify-center">
                    Role
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center uppercase">
                    {prop.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("class.name", {
            id: "class",
            header: () => (
                <span className="flex justify-center">
                    Class
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center">
                    {prop.getValue() || "N/A"}
                </span>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: () => (
                <span className="flex justify-center">
                    Actions
                </span>
            ),
            cell: (prop) => (
                <div className="flex gap-4 justify-center">
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            setMode("update");
                            setUserData(prop.row.original);
                            setIsOpen(true);
                        }}
                    >
                        <PencilSquareIcon className="size-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            setMode("delete");
                            setUserData(prop.row.original);
                            setIsOpen(true);
                        }}
                    >
                        <TrashIcon className="size-4" />
                    </Button>
                </div>
            ),
            size: 250
        }),
    ], []);

    const { title, description } = getModalContent(mode, MODAL.user);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-2 w-full">
                <TableHeader
                    title={TABLE_HEADER.users.title}
                    description={TABLE_HEADER.users.description}
                    buttonText={TABLE_HEADER.users.buttonText}
                    action={() => {
                        setMode("create");
                        setUserData("null");
                        setIsOpen(true);
                    }}
                />
                <Table
                    columnsDef={columns}
                    data={usersData}
                />
                <Modal
                    title={title}
                    description={description}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    {mode === "create" && (
                        <CreateUserForm
                            afterSubmit={() => {
                                setIsOpen(false);
                                getUsers();
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setUserData(null);
                            }}
                        />
                    )}
                    {mode === "update" && (
                        <UpdateUserForm
                            user={userData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getUsers();
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setUserData(null);
                            }}
                        />
                    )}
                    {mode === "delete" && (
                        <DeleteUserForm
                            user={userData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getUsers();
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setUserData(null);
                            }}
                        />
                    )}
                    {mode === "detail" && (
                        <DetailUserForm
                            user={userData}
                            afterSubmit={() => {
                                setIsOpen(false);
                            }}
                        />
                    )}
                </Modal>
            </div>
        </DashboardLayout>
    )
};

const columnHelper = createColumnHelper();

export default UserPage;
