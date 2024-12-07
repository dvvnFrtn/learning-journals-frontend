import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { createColumnHelper } from "@tanstack/react-table";
import axiosInstance from "../../utils/axiosInstance";
import { getModalContent, getToken } from "../../utils/common";
import { MESSAGES, MODAL, TABLE_HEADER } from "../../constants/string.const";
import Button from "../../components/Button";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import CreateJournalForm from "../../forms/journal/CreateJournalForm";
import clsx from "clsx";
import DeleteJournalForm from "../../forms/journal/DeleteJournalForm";

const JournalMainPage = () => {
    const { subjectId } = useParams();
    const { state } = useLocation();
    const [learningJournals, setLearningJournals] = useState([]);
    const [learningJournal, setLearningJournal] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [hasMoreData, setHasMoreData] = useState(true);
    const authHeader = useAuthHeader();
    const offset = pageIndex * pageSize;
    const navigate = useNavigate();

    const getJournals = useCallback(async (limit, offset) => {
        try {
            const response = await axiosInstance.get(`/subject/${subjectId}/learning-journal?limit=${limit}&offset=${offset}`, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            const journals = response.data.data;
            setLearningJournals(journals);
            setHasMoreData(response.data.data.length === pageSize);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.learningJournals.fetchError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    }, [authHeader, pageSize, subjectId]);

    useEffect(() => {
        getJournals(pageSize, offset);
    }, [getJournals, pageSize, pageIndex, offset]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "index",
            header: "No",
            cell: (prop) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex justify-center hover:text-blue-400 hover:underline">
                    {prop.row.index + 1}
                </span>
            ),
            size: 80
        }),
        columnHelper.accessor("date", {
            cell: (prop) => (
                <span className="text-blue-400">
                    {prop.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("learningMaterial", {
            header: () => (
                <span className="flex justify-start">
                    Learning Material
                </span>
            ),
            cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor("learningActivity", {
            header: () => (
                <span className="flex justify-start">
                    Learning Activity
                </span>
            ),
            cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor("statusApproval", {
            header: () => (
                <span className="flex justify-start">
                    Status
                </span>
            ),
            cell: (prop) => (
                <span className="uppercase font-semibold">
                    <div className={clsx(
                        "rounded-full px-4 py-1 flex gap-2 w-max items-center",
                        prop.row.original.statusApproval === "pending" && "bg-orange-100",
                        prop.row.original.statusApproval === "approved" && "bg-green-100",
                        prop.row.original.statusApproval === "rejected" && "bg-red-100",
                    )}>
                        <div className={clsx(
                            "rounded-full w-2 h-2",
                            prop.row.original.statusApproval === "pending" && "bg-orange-400",
                            prop.row.original.statusApproval === "approved" && "bg-green-400",
                            prop.row.original.statusApproval === "rejected" && "bg-red-400",
                        )}></div>
                        <span className={clsx(
                            prop.row.original.statusApproval === "pending" && "text-orange-400",
                            prop.row.original.statusApproval === "approved" && "text-green-400",
                            prop.row.original.statusApproval === "rejected" && "text-red-400",
                        )}>
                            {prop.getValue()}
                        </span>
                    </div>
                </span>
            ),
        }),
        columnHelper.accessor("createdBy", {
            header: () => (
                <span className="flex justify-start">
                    Created By
                </span>
            ),
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
                        disabled={prop.row.original.statusApproval === "approved" || prop.row.original.statusApproval === "rejected"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setMode("update");
                            navigate(`learning-journal/${prop.row.original.id}`, { state: { journal: prop.row.original, subject: state?.subject } });
                        }}
                    >
                        <PencilSquareIcon className="size-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={prop.row.original.statusApproval === "approved" || prop.row.original.statusApproval === "rejected"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setMode("delete");
                            setLearningJournal(prop.row.original);
                            setIsOpen(true);
                        }}
                    >
                        <TrashIcon className="size-4" />
                    </Button>
                </div>
            ),
            size: 250
        }),
    ], [navigate, state]);

    const { title, description } = getModalContent(mode, MODAL.journal);

    return (
        <DashboardLayout>
            <TableHeader
                title={TABLE_HEADER.journals.title}
                additionalTitle={`on ${state?.subject?.name}`}
                description={TABLE_HEADER.journals.description}
                buttonText={TABLE_HEADER.journals.buttonText}
                action={() => {
                    setMode("create");
                    setIsOpen(true);
                }}
            />
            <Table
                columnsDef={columns}
                data={learningJournals}
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
                    <CreateJournalForm
                        subject={state?.subject}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getJournals(pageSize, offset);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                        }}
                    />
                )}
                {mode === "delete" && (
                    <DeleteJournalForm
                        journal={learningJournal}
                        afterSubmit={() => {
                            setIsOpen(false);
                            getJournals(pageSize, offset);
                        }}
                        onCancel={() => {
                            setIsOpen(false);
                        }}
                    />
                )}
            </Modal>
        </DashboardLayout>
    )
};

const columnHelper = createColumnHelper();

export default JournalMainPage;
