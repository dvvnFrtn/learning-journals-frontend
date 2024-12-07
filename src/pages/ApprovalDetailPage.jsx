import { useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Tabs from "../components/Tab";
import UpdateApprovalForm from "../forms/approval/UpdateApprovalForm";
import ApprovalAbsentPage from "./ApprovalAbsentPage";

const ApprovalDetailPage = () => {
    const { state } = useLocation();
    const tabs = [
        {
            name: "Details",
            content: (state && <UpdateApprovalForm journal={state?.journal} />)
        },
        {
            name: "Students Absent",
            content: (state && <ApprovalAbsentPage journal={state?.journal} />)
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

export default ApprovalDetailPage;
