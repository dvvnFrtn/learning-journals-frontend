import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Header */}
                <header className="h-24 px-16 flex items-center justify-between">
                    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
                        <a
                            href="/example"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            Home
                        </a>
                        <span className="text-gray-400">/</span>
                        <a
                            href="/user"
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            User
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-800 font-semibold">Current Page</span>
                    </nav>
                </header>

                {/* Body */}
                <main className="flex-1 p-16">{children}</main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DashboardLayout;

