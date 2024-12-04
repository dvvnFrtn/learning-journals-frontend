import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Modal = ({ children, title, description, open = false, onClose, ...props }) => {
    return (
        <>
            <Dialog
                open={open}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={onClose}
                {...props}
            >
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className={clsx(
                                "w-full max-w-2xl rounded-xl bg-white p-6",
                                "duration-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            )}
                        >
                            <DialogTitle
                                as="h1"
                                className="text-3xl font-semibold text-slate-900"
                            >
                                {title}
                            </DialogTitle>
                            <p className="mt-2 text-sm text-slate-400">
                                {description}
                            </p>
                            <div className="mt-4">{children}</div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;
