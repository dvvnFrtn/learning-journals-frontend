import PropTypes from "prop-types";

const Card = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-slate-300 shadow-none bg-white hover:shadow-sm transition duration-150">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            {children}
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Card;
