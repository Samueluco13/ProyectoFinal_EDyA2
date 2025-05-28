import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { logout } from "../../authSlice";

export const logoutAuth = () => {
    return async (dispatch) => {
        await signOut(auth); //Cierra la sesión del usuario en firebase
        dispatch(logout());
    }
}