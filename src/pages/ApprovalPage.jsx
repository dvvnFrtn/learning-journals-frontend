import { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getToken } from "../utils/common";
import { MESSAGES } from "../constants/string.const";
import { toast } from "react-toastify";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Button from "../components/Button";

const ApprovalPage = () => {
    const [classesData, setClassesData] = useState([]);
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

    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-4xl text-slate-900">Select Class</h1>
                </div>
                <p className="text-slate-400">Please select class for learning journals</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-8">
                {classesData && classesData.map((c) => (
                    <Card
                        key={c.id}
                        title={c.name}
                        onClick={() => navigate(`classes/${c.id}`)}
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
        </DashboardLayout>
    )
};

export default ApprovalPage;
