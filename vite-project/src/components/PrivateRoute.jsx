import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, roles}) => {

    const {logged, rol} = useSelector((state) => state.auth) //Toma el estado de logueo y el rol de authSlice
    
    if (logged === false) {
        return <Navigate to={"/"} />
    }

    if (roles && !roles.includes(rol)) {
        return <Navigate to="/" replace />; //El "replace" elimina el historial
    }

    return children;
}
