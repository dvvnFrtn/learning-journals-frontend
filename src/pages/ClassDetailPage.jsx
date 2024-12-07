import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "react-toastify";
import { getToken } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";
import { MESSAGES } from "../constants/string.const";
import SubjectPage from "./SubjectPage";
import StudentPage from "./StudentPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Tabs from "../components/Tab";

const ClassDetailPage = () => {
    const { id } = useParams();
    const [classData, setClassData] = useState({});
    const authHeader = useAuthHeader();

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

    const tabs = [
        {
            name: "Subjects",
            content: (classData && <SubjectPage classData={classData} />)
        },
        {
            name: "Students",
            content: (classData && <StudentPage classData={classData} />)
        }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-2 w-full">
                <Tabs tabs={tabs} />
            </div>
        </DashboardLayout>
    )
}

export default ClassDetailPage;
