import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

const DropdownActions = ({ onUpdate, onDelete }) => {
    return (
        <Menu>
            <MenuButton
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
            >
                Actions
                <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl shadow-md border border-slate-300 bg-white p-1 text-sm/6 text-slate-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <MenuItem>
                    <button
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            onUpdate();
                        }}
                    >
                        <PencilIcon className="size-4 fill-slate-500" />
                        Edit
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <TrashIcon className="size-4 fill-slate-500" />
                        Delete
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
};

DropdownActions.propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default DropdownActions;
