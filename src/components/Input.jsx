import { Field, Label, Description, Input as HlInput } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(
    ({ label, description, placeholder, name, type = "text", ...props }, ref) => {
        return (
            <Field>
                {label && (
                    <Label
                        className="text-sm font-semibold text-slate-900"
                    >
                        {label}
                    </Label>
                )}
                {description && (
                    <Description
                        className="text-sm text-slate-400"
                    >
                        {description}
                    </Description>
                )}
                <HlInput
                    name={name}
                    type={type}
                    ref={ref}
                    className={clsx(
                        "w-full mt-3 py-1.5 px-3 border rounded-lg text-slate-900 placeholder-slate-300 border-slate-300 bg-white",
                        "data-[invalid]:border-red-400 focus:outline-none data-[invalid]:data-[focus]:outline-none data-[focus]:outline-2 data-[focus]:outline-slate-400 data-[focus]:-outline-offset-2 "
                    )}
                    placeholder={placeholder}
                    {...props}
                />
            </Field>
        );
    }
);

Input.displayName = "Input";

Input.propTypes = {
    description: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default Input;
