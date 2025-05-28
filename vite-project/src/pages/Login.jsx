import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAuth } from '../slices/thunks/auth/loginAuth.js'
import {useSelector, useDispatch} from 'react-redux'
import { clearError } from '../slices/errorSlice.js'
import '../styles/FormPages.css'

export const Login = () => {

    const dispatch = useDispatch();
    const error = useSelector((state) => state.error.error);
    const {rol, logged} = useSelector(state => state.auth);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({email: '', password: ''});

    useEffect(() => {
        if (logged){
            switch (rol){
                case "Admin":
                    navigate("/recibidos");
                    break;
                case "usuario":
                    navigate("/dashboard");
                    break;
                default:
                    navigate("/");
            }
        }
    },[logged]);

    const handleChange = (e) => {
        dispatch(clearError());
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await dispatch(loginAuth(formData.email, formData.password));
        }catch (error) {
            console.error("Error al iniciar sesion", error);
        }
        
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={(e) => handleSubmit(e)}>
                
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='btn-form'>Login</button>
                </div>
                <p className="link">
                    ¿No tienes una cuenta?{" "}
                    <a onClick={() => navigate("/register")}>Register</a>
                </p>
            </form>
        </div>
    )
}
