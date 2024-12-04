import PropTypes from "prop-types";
import Button from "./Button";
import { PlusIcon } from "@heroicons/react/20/solid";

const TableHeader = ({ title, description, action, buttonText }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-6xl text-slate-900">{title}</h1>
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
    buttonText: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default TableHeader;
