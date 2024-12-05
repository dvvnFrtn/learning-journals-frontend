import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getModalContent, getToken } from "../utils/common";
import { MESSAGES, MODAL, TABLE_HEADER } from "../constants/string.const";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import TableHeader from "../components/TableHeader";
import Table from "../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import Modal from "../components/Modal";
import DetailSubjectForm from "../forms/subject/DetailSubjectForm";
import UpdateSubjectForm from "../forms/subject/UpdateSubjectForm";
import DeleteSubjectForm from "../forms/subject/DeleteSubjectForm";
import CreateSubjectForm from "../forms/subject/CreateSubjectForm";

const ClassDetailPage = () => {
    const { id } = useParams();
    const [subjectsData, setSubjectsData] = useState([]);
    const [subjectData, setSubjectData] = useState(null);
    const [classData, setClassData] = useState({});
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const offset = pageSize * pageIndex;
    const authHeader = useAuthHeader();

    const getSubjects = useCallback(async (limit, offset) => {
        try {
            const response = await axiosInstance.get(`/class/${id}/subjects/?limit=${limit}&offset=${offset}`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const subjects = response.data.data;
            setSubjectsData(subjects);
            setHasMoreData(response.data.data.length === pageSize);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.subjects.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, pageSize, id]);

    const getClass = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/class/${id}`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const currentClass = response.data.data;
            setClassData(currentClass);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.classes.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, id]);

    useEffect(() => {
        getClass();
    }, [getClass]);

    useEffect(() => {
        getSubjects(pageSize, offset);
    }, [getSubjects, pageSize, offset]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "index",
            header: "No",
            cell: (prop) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setMode("detail");
                        setSubjectData(prop.row.original);
                        setIsOpen(true);
                    }}
                    className="flex justify-center hover:text-blue-400 hover:underline">
                    {prop.row.index + 1}
                </span>
            ),
            size: 80
        }),
        columnHelper.accessor("name", {
            header: () => (
                <span className="flex justify-center">
                    Name
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center">
                    {prop.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("description", {
            cell: (prop) => prop.getValue(),
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
                            setSubjectData(prop.row.original);
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
                            setSubjectData(prop.row.original);
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

    const { title, description } = getModalContent(mode, MODAL.subject);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-2 w-full">
                <TableHeader
                    title={TABLE_HEADER.subjects.title}
                    description={TABLE_HEADER.subjects.description}
                    buttonText={TABLE_HEADER.subjects.buttonText}
                    action={() => {
                        setMode("create");
                        setSubjectData(null);
                        setIsOpen(true);
                    }}
                />
                <Table
                    columnsDef={columns}
                    data={subjectsData}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    hasMoreData={hasMoreData}
                    setPageIndex={(value) => setPageIndex(value)}
                    setPageSize={(value) => setPageSize(value)}
                />
                <Modal
                    title={title}
                    description={description}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    {mode === "create" && (
                        <CreateSubjectForm
                            currentClass={classData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getSubjects(pageSize, offset);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setSubjectData(null);
                            }}
                        />
                    )}
                    {mode === "update" && (
                        <UpdateSubjectForm
                            subject={subjectData}
                            currentClass={classData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getSubjects(pageSize, offset);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setSubjectData(null);
                            }}
                        />
                    )}
                    {mode === "delete" && (
                        <DeleteSubjectForm
                            subject={subjectData}
                            afterSubmit={() => {
                                setIsOpen(false);
                                getSubjects(pageSize, offset);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                setSubjectData(null);
                            }}
                        />
                    )}
                    {mode === "detail" && (
                        <DetailSubjectForm
                            subject={subjectData}
                            currentClass={classData}
                            afterSubmit={() => {
                                setIsOpen(false);
                            }}
                        />
                    )}
                </Modal>
            </div>
        </DashboardLayout>
    )
}

const columnHelper = createColumnHelper();

export default ClassDetailPage;
