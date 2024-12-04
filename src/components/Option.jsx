import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import PropTypes, { object } from "prop-types";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const Option = ({ placeholder, value, onChange, options, name, ...props }) => {
    return (
        <Listbox
            as={"div"}
            name={name}
            onChange={onChange}
            {...props}
        >
            <ListboxButton
                className="data-[invalid]:border-red-400 focus:outline-none data-[invalid]:data-[focus]:outline-none flex justify-between items-center w-full mt-3 py-1.5 px-3 border rounded-lg text-left text-slate-900 border-slate-300 bg-white data-[disabled]:bg-slate-100 data-[disabled]:text-slate-500"
            >
                {value?.name || placeholder}
                <ChevronDownIcon
                    className="group pointer-events-none size-4 fill-slate-900"
                    aria-hidden="true"
                />

            </ListboxButton>
            <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    "z-50 w-[var(--button-width)] p-1 mt-1 border rounded-lg text-slate-900 border-slate-300 bg-white",
                    "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
            >
                {options.map((option) => (
                    <ListboxOption
                        key={option.id}
                        value={option}
                        className={clsx(
                            "group flex items-center gap-2 cursor-default rounded-lg py-1.5 px-3",
                            "select-none data-[focus]:bg-slate-100"
                        )}
                    >
                        <CheckIcon className="invisible size-4 fill-slate-900 group-data-[selected]:visible" />
                        {option.name}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
};

Option.propTypes = {
    options: PropTypes.arrayOf(object),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.any,
    placeholder: PropTypes.string,
}

export default Option;
