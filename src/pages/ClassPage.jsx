import { useCallback, useEffect, useState } from "react";
import TableHeader from "../components/TableHeader";
import Card from "../components/Card";
import { MESSAGES, MODAL, TABLE_HEADER } from "../constants/string.const";
import DashboardLayout from "../layouts/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { getModalContent, getToken } from "../utils/common";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import CreateClassForm from "../forms/class/CreateClassForm";
import DropdownActions from "../components/DropdownActions";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DeleteClassForm from "../forms/class/DeleteClassForm";
import UpdateClassForm from "../forms/class/UpdateClassForm";

const ClassPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [classesData, setClassesData] = useState([]);
    const [classData, setClassData] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(8);
    const [hasMoreData, setHasMoreData] = useState(true);
    const authHeader = useAuthHeader();
    const offset = pageIndex * pageSize;
    const navigate = useNavigate();

    const getClasses = useCallback(async (limit, offset) => {
        try {
            const response = await axiosInstance.get(`/class?limit=${limit}&offset=${offset}`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const classes = response.data.data;
            setClassesData(classes);
            setHasMoreData(response.data.data.length === pageSize);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.classes.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, pageSize]);

    useEffect(() => {
        getClasses(pageSize, offset);
    }, [getClasses, pageSize, offset]);

    const { title, description } = getModalContent(mode, MODAL.dataClass);

    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <TableHeader
                    title={TABLE_HEADER.classes.title}
                    description={TABLE_HEADER.classes.description}
                    buttonText={TABLE_HEADER.classes.buttonText}
                    action={() => {
                        setMode("create");
                        setIsOpen(true);
                    }}
                />
                <Modal
                    title={title}
                    description={description}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    {mode === "create" && (
                        <CreateClassForm
                            afterSubmit={() => {
                                setIsOpen(false);
                                getClasses(pageSize, offset);
                                setClassData(null);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setClassData(null);
                            }}
                        />
                    )}
                    {mode === "update" && (
                        <UpdateClassForm
                            dataClass={classData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getClasses(pageSize, offset);
                                setClassData(null);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setClassData(null);
                            }}
                        />
                    )}
                    {mode === "delete" && (
                        <DeleteClassForm
                            dataClass={classData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getClasses(pageSize, offset);
                                setClassData(null);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setClassData(null);
                            }}
                        />
                    )}
                </Modal>
                <div className="w-full grid grid-cols-2 gap-4">
                    {classesData && classesData.map((c) => (
                        <Card
                            key={c.id}
                            title={c.name}
                            onClick={() => navigate(`/classes/${c.id}`)}
                            actions={() => {
                                return (
                                    <DropdownActions
                                        idItem={c.id}
                                        onUpdate={() => {
                                            setMode("update");
                                            setClassData(c);
                                            setIsOpen(true);
                                        }}
                                        onDelete={() => {
                                            setMode("delete");
                                            setClassData(c);
                                            setIsOpen(true);
                                        }}
                                    />
                                )
                            }}
                        >
                            <p className="text-slate-400">
                                {c.description}
                            </p>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between items-center py-6">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setPageIndex((old) => Math.max(old - 1, 0));
                        }}
                        disabled={pageIndex === 0}
                    >
                        Previous
                    </Button>
                    <span className="text-slate-900">Page {pageIndex + 1}</span>
                    <Button
                        variant="outline"
                        disabled={!hasMoreData}
                        onClick={() => {
                            setPageIndex((old) => old + 1);
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ClassPage;
