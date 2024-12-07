import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { getModalContent, getToken } from "../../utils/common";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MESSAGES, MODAL, TABLE_HEADER } from "../../constants/string.const";
import { toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../components/Button";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import Modal from "../../components/Modal";
import CreateAbsentForm from "../../forms/absent/CreateAbsentForm";
import Table from "../../components/Table";
import UpdateAbsentForm from "../../forms/absent/UpdateAbsentForm";
import DetailAbsentForm from "../../forms/absent/DetailAbsentForm";
import DeleteAbsentForm from "../../forms/absent/DeleteAbsentForm";
import clsx from "clsx";

const StudentAbsentPage = ({ journal }) => {
    const [absents, setAbsents] = useState([]);
    const [absent, setAbsent] = useState(null);
    const authHeader = useAuthHeader();
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [hasMoreData, setHasMoreData] = useState(true);

    const getAbsents = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/learning-journal/${journal?.id}/student-absent`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const abs = response.data.data;
            setAbsents(abs);
            setHasMoreData(response.data.data.length === pageSize);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.studentAbsents.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, journal, pageSize]);

    useEffect(() => {
        getAbsents();
    }, [getAbsents]);

    const { title, description } = getModalContent(mode, MODAL.absent);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "index",
            header: "No",
            cell: (prop) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setMode("detail");
                        setAbsent(prop.row.original);
                        setIsOpen(true);
                    }}
                    className="flex justify-center hover:text-blue-400 hover:underline">
                    {prop.row.index + 1}
                </span>
            ),
            size: 80
        }),
        columnHelper.accessor("student.name", {
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
        columnHelper.accessor("student.gender", {
            header: () => (
                <span className="flex justify-center">
                    Gender
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center uppercase font-semibold">
                    <div className={clsx(
                        "px-4 py-1 rounded-full w-max",
                        prop.row.original.student.gender === "male" && "bg-blue-100 text-blue-400",
                        prop.row.original.student.gender === "female" && "bg-pink-100 text-pink-400",
                    )}>
                        {prop.getValue()}
                    </div>
                </span>
            ),
        }),
        columnHelper.accessor("student.class", {
            header: () => (
                <span className="flex justify-center">
                    Class
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-center uppercase">
                    {prop.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("description", {
            header: () => (
                <span className="flex justify-start">
                    Description
                </span>
            ),
            cell: (prop) => (
                <span className="flex justify-start">
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
                            setAbsent(prop.row.original);
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
                            setAbsent(prop.row.original);
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

    return (
        <>
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-8">
                        <h1 className="font-semibold text-4xl text-slate-900">{TABLE_HEADER.absents.title}</h1>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setMode("create");
                            setIsOpen(true);
                        }}
                    >
                        <PlusIcon className="size-6 fill-white" />
                        <span>{TABLE_HEADER.absents.buttonText}</span>
                    </Button>
                </div>
                <p className="text-slate-400 my-4 max-w-lg">
                    {TABLE_HEADER.absents.description}
                </p>
            </div>
            <Table
                columnsDef={columns}
                data={absents}
                pageIndex={pageIndex}
                pageSize={pageSize}
                hasMoreData={hasMoreData}
                enablePagination={false}
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
                    <CreateAbsentForm
                        journal={journal}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getAbsents();
                            setAbsent(null);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setAbsent(null);
                        }}
                    />
                )}
                {mode === "update" && (
                    <UpdateAbsentForm
                        journal={journal}
                        absent={absent}
                        afterSubmit={() => {
                            setIsOpen(false);
                            setAbsent(null);
                            getAbsents();
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setAbsent(null);
                        }}
                    />
                )}
                {mode === "delete" && (
                    <DeleteAbsentForm
                        absent={absent}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getAbsents();
                            setAbsent(null);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                            setAbsent(null);
                        }}
                    />
                )}
                {mode === "detail" && (
                    <DetailAbsentForm
                        absent={absent}
                        afterSubmit={() => {
                            setIsOpen(false);
                            setAbsent(null);
                        }}
                    />
                )}
            </Modal>
        </>
    )
};

StudentAbsentPage.propTypes = {
    subject: PropTypes.object,
    journal: PropTypes.object,
};

const columnHelper = createColumnHelper();

export default StudentAbsentPage;

