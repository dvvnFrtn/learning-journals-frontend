import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

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
                    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
                        <a
                            href="/examples"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            Home
                        </a>
                        <span className="text-gray-400">/</span>
                        <a
                            href="/users"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            User
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-800 font-semibold">Current Page</span>
                    </nav>
                    <div>Hello {auth ? auth.role : "Anonymous"}</div>
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

