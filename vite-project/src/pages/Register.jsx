import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {registerAuth} from "../slices/thunks/auth/registerAuth"
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../slices/errorSlice";
import "../styles/FormPages.css";


export const Register = () => {
    const navigate = useNavigate();

    const error = useSelector((state) => state.error.error);
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({userName: "", email: "", password: ""});
    
    const handleChange = (e) => {
        dispatch(clearError());
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rol = "usuario"; //Solo se pueden crear usuarios nomrales/clientes
        try {
            await dispatch(registerAuth(formData.email, formData.password, formData.userName, rol));
            navigate("/");
        }catch (error) {
            console.error("Error al registrar usuario", error);
        }
    }


    return (
        <div className="form-container">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="nombre-registro">Username:</label>
                <input
                    type="text"
                    id="nombre-registro"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="Correo-registro">Email:</label>
                <input
                    type="text"
                    id="Correo-registro"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="contrasena-registro">Password:</label>
                <input
                    type="password"
                    id="contrasena-registro"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                </div>
                <div>
                    <button className="btn-form" >Continue</button>
                </div>
                <p className="link">
                    ¿Ya tienes una cuenta?{" "}
                    <a onClick={() => navigate("/")}>Login</a>
                </p>
            </form>
        </div>
    )
}