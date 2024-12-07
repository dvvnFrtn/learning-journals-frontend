import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Breadcrumb from "../components/BreadCrumb";

const DashboardLayout = ({ children }) => {
    const auth = useAuthUser();

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Header */}
                <header className="h-24 px-16 flex items-center justify-between">
                    <Breadcrumb />
                    <div>Hello {auth ? auth.role : "Anonymous"} 👋</div>
                </header>

                {/* Body */}
                <main className="flex-1 p-16 pt-8">{children}</main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DashboardLayout;

