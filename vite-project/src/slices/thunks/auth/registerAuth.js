import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { register } from "../../authSlice";
import { clearError } from "../../errorSlice";
import { handleError } from "../error/error";

export const registerAuth = (email, password, name, rol) => {
    return async (dispatch) => {
        try{
            dispatch(clearError());
            const response = await createUserWithEmailAndPassword(auth, email, password); //Crea un unevo usuario
            if (response){
                await updateProfile(response.user, {
                    displayName: name
                });
                const { uid, displayName } = response.user;
                try{ // Guarda el usuario en Firestore
                    await setDoc(doc(db, "users", uid), {
                        displayName: name,
                        email: email,
                        uid: uid,
                        rol: rol
                    });
                }catch (error) {
                    dispatch(handleError(error));
                    console.error("Error al guardar usuario en Firestore - ", error);
                }
                dispatch(register({ uid, email, displayName, rol }));
                console.log("Usuario registrado: ", response);
            }
        }catch (error) {
            dispatch(handleError(error));
            console.error("Error al registrar usuario", error);
        }
    }
}