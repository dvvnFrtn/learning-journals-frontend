import PropTypes from "prop-types";

const Card = ({ title, actions, children, ...props }) => {
    return (
        <div {...props} className="hover:bg-slate-100 flex cursor-pointer flex-col gap-6 p-6 rounded-xl border border-slate-300 shadow-none bg-white hover:shadow-sm transition duration-150">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions()}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.func,
}

export default Card;
