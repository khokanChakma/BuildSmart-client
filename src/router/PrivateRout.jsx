import { useContext } from "react";
import { AuthContext } from "../authprovider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading";

const PrivateRout = ({children}) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>;
    
};

export default PrivateRout;