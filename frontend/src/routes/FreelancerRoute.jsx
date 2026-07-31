import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FreelancerRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    if (!user?.is_freelancer) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default FreelancerRoute;