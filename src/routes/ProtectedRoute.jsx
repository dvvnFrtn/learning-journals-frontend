import { Navigate } from "react-router-dom"
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import PropTypes from "prop-types";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const auth = useAuthUser();

    if (!auth) {
        return <Navigate to={"/login"} />
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <UnauthorizedPage />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.array
}

export default ProtectedRoute;
