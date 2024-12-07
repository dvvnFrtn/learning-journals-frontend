import { useCallback, useEffect, useMemo, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import axiosInstance from "../utils/axiosInstance";
import { getToken } from "../utils/common";
import { MESSAGES, TABLE_HEADER } from "../constants/string.const";
import Button from "../components/Button";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import DashboardLayout from "../layouts/DashboardLayout";
import Table from "../components/Table";
import clsx from "clsx";

const ApprovalLearningJournal = () => {
    const { subjectId } = useParams();
    const { state } = useLocation();
    const [learningJournals, setLearningJournals] = useState([]);
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
        columnHelper.accessor("createdBy", {
            header: () => (
                <span className="flex justify-start">
                    Created By
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
                            navigate(`detail/${prop.row.original.id}`, { state: { journal: prop.row.original } })
                        }}
                    >
                        <PencilSquareIcon className="size-4" />
                    </Button>
                </div>
            ),
            size: 180
        }),
    ], [navigate]);

    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex justify-start items-center gap-4">
                    <h1 className="font-bold text-4xl text-slate-900">
                        {TABLE_HEADER.journals.title}
                    </h1>
                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                    <p className="text-blue-500 px-6 py-1 bg-blue-100 rounded-full">
                        {`on ${state?.subject?.name}`}
                    </p>
                </div>
                <p className="text-slate-400">{TABLE_HEADER.journals.description}</p>
            </div>
            <Table
                columnsDef={columns}
                data={learningJournals}
                pageIndex={pageIndex}
                pageSize={pageSize}
                hasMoreData={hasMoreData}
                setPageIndex={(value) => setPageIndex(value)}
                setPageSize={(value) => setPageSize(value)}
            />
        </DashboardLayout>
    )
};

const columnHelper = createColumnHelper();

export default ApprovalLearningJournal;
