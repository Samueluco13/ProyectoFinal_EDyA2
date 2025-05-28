import {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { adminMenu, userMenu, rutas } from '../utils/data.js'
import { MenuItem } from './MenuItem.jsx'
import { IoReorderThree } from "react-icons/io5";
import { NotificationBell } from './NotificationBell.jsx';
import { Popup } from './Popup.jsx'
import { NotificationCard } from './NotificationCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useCollection } from '../slices/useCollection.js';
import { logoutAuth } from '../slices/thunks/auth/logoutAuth.js';
import { removeNotification } from '../slices/thunks/notifications/removeNotification.js';
import '../styles/Header.css'

export const Header = () => {
    const url = useLocation(); //Toma toda la url
    const rutaActual = url.pathname; //Toma la pagina en la nos encontramos
    const paginaActual = rutas[rutaActual]; //Asigna a la variable el valor que hay en el diccionario (rutas) dependiendo de la clave (rutaActual)
    
    const {getAll, dltDoc, results} = useCollection("notificaciones")

    const auth = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [notificaciones, setNotificaciones] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [notificationsMenu, setNotificationsMenu] = useState(false);
    const itemsAdminMenu = [
        ...adminMenu,
        {
            title: "Logout",
            onClick: () => setShowPopup(true)
        },
        {
            title: "Close",
            onClick: () => setIsMenuOpen(false)
        }
    ];

    const itemsUserMenu = [
        ...userMenu,
        {
            title: "Logout",
            onClick: () => setShowPopup(true)
        },
        {
            title: "Close",
            onClick: () => setIsMenuOpen(false)
        }
    ];

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setNotificaciones(results);
    }, [results, auth.uid])

    useEffect(() => {; //Escucha los cambios de la base de datos
        if (!auth.uid) return;
        const unsubscribe = getAll([["userId", "==", auth.uid], ["orderBy", "date", "desc"]])
        return () => unsubscribe();
    }, [auth.uid]);

    const handleDeleteNotification = async (id) => {
        try{
            await dispatch(removeNotification())
            await dltDoc(id);
        }catch(error){
            console.log("No se pudo eliminar: ", error);
        }
    }

    useEffect(() => {
        setIsMenuOpen(false)
    }, [navigate])
    
    useEffect(() => { //Efecto que toma el estado logged para manejar el guardado de datos para la persistencia
        if (auth.logged) {
            localStorage.setItem("currentUser", JSON.stringify(auth));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [auth]);

    const handleLogout = async () => {
        await dispatch(logoutAuth());
        localStorage.removeItem("currentUser")
        setShowPopup(false);
        setIsMenuOpen(false);
        navigate("/");
    };
    
    const toggleMenus = () => {
    setIsMenuOpen(!isMenuOpen);
    setNotificationsMenu(false);
    }
    
    
    return (
        <header className='header' >
            <div className='header-container' >
                {auth.logged && (
                    <button className='tri-line' onClick={toggleMenus}>
                        <IoReorderThree /> {auth.displayName} - {paginaActual}
                    </button>
                )}
                <div className={`side-menu ${isMenuOpen ? 'open' : ''}`} >
                    {isMenuOpen && (
                        <MenuItem arbol={auth.rol === "Admin" ? (itemsAdminMenu) : (itemsUserMenu)}/>
                    )}
                </div>
                {auth.logged && auth.rol !== "Admin" ? (
                    <>
                    <NotificationBell onClick={() => setNotificationsMenu(!notificationsMenu)} count={notificaciones.length}/>
                        <div className={`notifications ${notificationsMenu ? 'open' : ''}`} >
                            {notificationsMenu && (
                                <ul className='notification-dropdown' >
                                    {notificaciones.length === 0 ? (
                                        <p>No tienes notificaciones</p>
                                    ) : (
                                        notificaciones.map(noti => (
                                            <li key={noti.id} className='noti-item'>
                                                <NotificationCard notification={noti} onDeleteNoti={handleDeleteNotification}/>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
            <h1>Streetwear Style</h1>
            {showPopup && (
                <Popup
                text="¿Estás seguro de que quieres cerrar sesión?"
                button={
                    <div className='confirmation-btns' >
                        <button onClick={handleLogout}>Cerrar sesión</button>
                        <button onClick={() => setShowPopup(false)} >Cancelar</button>
                    </div>
                }/>
            )}
        </header>
    )
}
