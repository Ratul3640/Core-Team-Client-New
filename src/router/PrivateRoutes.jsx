import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <h1 className="w-11/12 mx-auto flex justify-center items-center my-20"><span className="loading loading-spinner text-info loading-lg"></span></h1>
    }
    if (!user) {
        return <Navigate
            state={{ from: location.pathname }}
            to="/login"></Navigate>
    }
    return children
}

export default PrivateRoutes;