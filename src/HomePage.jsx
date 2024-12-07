import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const auth = useAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.role === "admin") {
            navigate("/users");
        } else if (auth.role === "user") {
            navigate("/journals");
        }
    }, [auth, navigate]);

    return null;
}

export default HomePage;
