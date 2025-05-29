import { createContext } from "react";
import UseAdmin from "../hook/useAdmin";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = (children) => {
    const { user, loading } = createContext(AuthContext)
    const [isAdmin, isAdminLoading] = UseAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <h1 className="w-11/12 mx-auto flex justify-center items-center my-20"><span className="loading loading-spinner text-info loading-lg"></span></h1>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={{ from: location.pathname }}
        to="/"></Navigate>

}

export default AdminRoute;
