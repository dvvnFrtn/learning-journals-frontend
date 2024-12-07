import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const mainPath = pathnames[0];
    const isNested = pathnames.length > 1;

    return (
        <nav className="flex items-center space-x-4 text-sm text-gray-500">
            {isNested && (
                <button
                    onClick={() => navigate(-1)}
                    className="flex gap-2 items-center px-3 py-1 text-slate-900 bg-white rounded-full hover:bg-slate-100 border border-slate-300"
                >
                    <ArrowLeftIcon className="size-4 fill-slate-900" />
                    Back
                </button>
            )}
            <Link to="/" className="hover:text-blue-500">
                Home
            </Link>
            {mainPath && (
                <>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-800 capitalize">{decodeURIComponent(mainPath)}</span>
                </>
            )}
        </nav>
    );
};

export default Breadcrumb;



