import PropTypes from "prop-types";
import Button from "./Button";
import { PlusIcon } from "@heroicons/react/20/solid";

const TableHeader = ({ title, additionalTitle, description, action, buttonText }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-8">
                    <h1 className="font-semibold text-6xl text-slate-900">{title}</h1>
                    {additionalTitle && (
                        <>
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <p className="text-blue-500 px-6 py-1 bg-blue-100 rounded-full">{additionalTitle}</p>

                        </>
                    )}
                </div>
                <Button
                    variant="primary"
                    onClick={action}
                >
                    <PlusIcon className="size-6 fill-white" />
                    <span>{buttonText}</span>
                </Button>
            </div>
            <p className="text-slate-400 my-4 max-w-lg">
                {description}
            </p>
        </div>
    )
};

TableHeader.propTypes = {
    action: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    additionalTitle: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default TableHeader;
