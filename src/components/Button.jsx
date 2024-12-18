import { Button as HlButton } from "@headlessui/react"
import clsx from "clsx";
import PropTypes from "prop-types";

const Button = ({ variant = "primary", children, ...props }) => {

    const variants = {
        primary: "text-white bg-slate-900 data-[hover]:bg-slate-700",
        secondary: "text-slate-400 bg-slate-200 data-[hover]:bg-slate-300 data-[hover]:text-slate-100",
        outline: "text-slate-900 border border-slate-300 data-[hover]:bg-slate-100 data-[hover]:text-slate-500"
    }

    return (
        <HlButton
            className={clsx(
                "inline-flex flex-nowrap text-nowrap items-center justify-center gap-2 px-6 py-2 font-medium shadow-sm rounded-full",
                "data-[hover]:shadow-none",
                "data-[disabled]:bg-slate-100 data-[disabled]:text-slate-300",
                variant && variants[variant],
            )}
            {...props}
        >
            {children}
        </HlButton>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
    children: PropTypes.node.isRequired,
}

export default Button;
