import { useCallback, useEffect, useMemo, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../utils/axiosInstance";
import { getModalContent, getToken } from "../utils/common";
import { MESSAGES, MODAL, TABLE_HEADER } from "../constants/string.const";
import { toast } from "react-toastify";
import TableHeader from "../components/TableHeader";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import { createColumnHelper } from "@tanstack/react-table";
import PropTypes from "prop-types";
import CreateStudentForm from "../forms/student/CreateStudentForm";
import DeleteStudentForm from "../forms/student/DeleteStudentForm";
import DetailStudentForm from "../forms/student/DetailStudentForm";
import UpdateStudentForm from "../forms/student/UpdateStudentForm";

const StudentPage = ({ classData }) => {
    const [studentsData, setStudentsData] = useState([]);
    const [studentData, setStudentData] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const offset = pageSize * pageIndex;
    const authHeader = useAuthHeader();

    const getStudents = useCallback(async (limit, offset) => {
        try {
            const response = await axiosInstance.get(`/class/${classData?.id}/students/?limit=${limit}&offset=${offset}`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const students = response.data.data;
            setStudentsData(students);
            setHasMoreData(response.data.data.length === pageSize);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.students.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, pageSize, classData?.id]);

    useEffect(() => {
        if (!classData?.id) {
            setStudentsData([]);
            setHasMoreData(false);
            return;
        }
        getStudents(pageSize, offset);
    }, [getStudents, pageSize, offset, classData]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "index",
            header: "No",
            cell: (prop) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setMode("detail");
                        setStudentData(prop.row.original);
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
                <span className="flex justify-start">
                    Name
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-start">
                    {prop.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("gender", {
            header: () => (
                <span className="flex justify-center">
                    Gender
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center uppercase">
                    {prop.getValue()}
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
                            setStudentData(prop.row.original);
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
                            setStudentData(prop.row.original);
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

    const { title, description } = getModalContent(mode, MODAL.student);

    return (
        <div className="mt-12">
            <TableHeader
                title={TABLE_HEADER.students.title}
                additionalTitle={`on ${classData?.name}`}
                description={TABLE_HEADER.students.description}
                buttonText={TABLE_HEADER.students.buttonText}
                action={() => {
                    setMode("create");
                    setStudentData(null);
                    setIsOpen(true);
                }}
            />
            <Table
                columnsDef={columns}
                data={studentsData}
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
                    <CreateStudentForm
                        currentClass={classData}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getStudents(pageSize, offset);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setStudentData(null);
                        }}
                    />
                )}
                {mode === "update" && (
                    <UpdateStudentForm
                        student={studentData}
                        currentClass={classData}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getStudents(pageSize, offset);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setStudentData(null);
                        }}
                    />
                )}
                {mode === "delete" && (
                    <DeleteStudentForm
                        student={studentData}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getStudents(pageSize, offset);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setStudentData(null);
                        }}
                    />
                )}
                {mode === "detail" && (
                    <DetailStudentForm
                        student={studentData}
                        currentClass={classData}
                        afterSubmit={() => {
                            setIsOpen(false);
                        }}
                    />
                )}
            </Modal>
        </div>
    )
};

StudentPage.propTypes = {
    classData: PropTypes.object,
}

const columnHelper = createColumnHelper();

export default StudentPage;
