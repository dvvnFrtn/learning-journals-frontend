import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Tabs from "../../components/Tab";
import UpdateJournalForm from "../../forms/journal/UpdateJournalForm";
import StudentAbsentPage from "./StudentAbsentPage";

const JournalDetailPage = () => {
    const { state } = useLocation();
    const tabs = [
        {
            name: "Details",
            content: (state && <UpdateJournalForm subject={state?.subject} journal={state?.journal} />)
        },
        {
            name: "Students Absent",
            content: (state && <StudentAbsentPage subject={state?.subject} journal={state?.journal} />)
        }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-2 w-full">
                <Tabs tabs={tabs} />
            </div>
        </DashboardLayout>
    )
};

export default JournalDetailPage;
