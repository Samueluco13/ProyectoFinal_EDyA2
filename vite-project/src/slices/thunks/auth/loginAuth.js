import { auth, db } from "../../../firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDoc, doc } from "firebase/firestore";
import {login} from "../../authSlice";
import {clearError} from "../../errorSlice";
import {handleError} from "../error/error";

export const loginAuth = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(clearError());
            const response = await signInWithEmailAndPassword(auth, email, password);
            if(response){
                
                const {uid, displayName, email} = response.user; //Toma algunos datos del usuario
                
                const loggedUser = await getDoc(doc(db, "users", uid)); //Agarra el snapshot del usuario a loguear
                const currentUser = loggedUser.data(); //Guarda en la variable la informacion del usuario como un objeto
                
                dispatch(login({uid, displayName, email, rol: currentUser.rol})); //Despacha el login del reducer
                localStorage.setItem("currentUser", JSON.stringify({uid, displayName, email, rol: currentUser.rol}));
            }
        } catch (error) {
            dispatch(handleError(error));
            console.error("Error al iniciar sesion", error);
        }
    }
}