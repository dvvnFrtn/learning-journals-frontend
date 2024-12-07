import PropTypes from "prop-types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MESSAGES, TABLE_HEADER } from "../constants/string.const";
import axiosInstance from "../utils/axiosInstance";
import { getToken } from "../utils/common";
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/Table";
import clsx from "clsx";

const ApprovalAbsentPage = ({ journal }) => {
    const [absents, setAbsents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [hasMoreData, setHasMoreData] = useState(true);
    const authHeader = useAuthHeader();

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
    ], []);

    return (
        <>
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-8">
                        <h1 className="font-semibold text-4xl text-slate-900">{TABLE_HEADER.absents.title}</h1>
                    </div>
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
        </>
    )
};

ApprovalAbsentPage.propTypes = {
    journal: PropTypes.any
};

const columnHelper = createColumnHelper();

export default ApprovalAbsentPage;
