import { setError } from '../../errorSlice';

export const handleError = (error) => {
    return (dispatch) => {
        let errorMessage;
        switch (error.code) { //Posibles errores de firabase auth
            case 'auth/invalid-credential':
                errorMessage = 'Credenciales inválidas';
                break;
            case 'auth/missing-password':
                errorMessage = 'Falta la contraseña';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Usuario no encontrado';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Contraseña incorrecta';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Email inválido';
                break;
            case "auth/email-already-in-use":
                errorMessage = 'El correo ya está en uso';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Demasiados intentos. Intenta más tarde';
                break;
            case "auth/weak-password":
                errorMessage = 'La contraseña debe tener al menos 6 caracteres';
                break;
            default:
                errorMessage = 'Error desconocido';
        }
        dispatch(setError(errorMessage));
    }
}