import {useEffect, useState} from 'react'
import { useCollection } from '../slices/useCollection'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { createOrder } from '../slices/thunks/order/createOrder'
import { createNotification } from '../slices/thunks/notifications/createNotification'
import {Popup} from "../components/Popup"
import "../styles/ProductDetails.css"

export const ProductDetails = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [prendaEspecifica, setPrendaEspecifica] = useState({});

    const navigate = useNavigate();
    
    const {id} = useParams();

    const {uid} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    
    const {getById} = useCollection("prendas");
    const { add: addPedido } = useCollection("pedidos");
    const { add: addNotificacion } = useCollection("notificaciones");


    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiempo real en la base de datos
        const detalles = async () => {
            const prenda = await getById(id);
            setPrendaEspecifica(prenda);
        }
        detalles();
    }, [id]);

    const handleOrder = async () => {
        const clasificacion = "recibido"; //Todos los pedidos deben empezar con clasificacion recibido
        const created = Date.now()
        try{
            let newPedido = {
                created,
                clasificacion,
                descripcion: prendaEspecifica.descripcion,
                precio: prendaEspecifica.precio,
                talla: prendaEspecifica.talla,
                prendaId: id,
                userId: uid
            }
            const orderId = await addPedido(newPedido);
            if(orderId){
                try{
                    await dispatch(createOrder(
                        orderId.id,
                        prendaEspecifica.descripcion,
                        prendaEspecifica.precio,
                        prendaEspecifica.talla,
                        id,
                        uid,
                        clasificacion,
                        created
                    ))
                    setShowPopup(true);
                    try{
                        const mensaje = `Has realizado un pedido de ${prendaEspecifica.descripcion}`
                        let newNoti = {mensaje, userId: uid, pedidoId: orderId.id, date: created}
                        await addNotificacion(newNoti);
                        try{
                        await dispatch(createNotification(mensaje, uid, orderId, created));
                        }catch(error){
                            console.log("Error al crear una noti en redux: ", error)
                        }
                    }catch(error){
                        console.log("No creó la notificacion del usuario en firebase: ", error);
                    }
                }catch(error){
                    console.log("Error al realizar el pedido desde redux: ", error)
                }
            }
        }catch(error){
            console.log("Error al crear pedido en firebase", error)
        }
    }

    const handlePopup = () => {
        setShowPopup(false);
        navigate("/dashboard");
    }

    return (
        <div className='product-details' >
            <div className='product-details-info' >
                <h1>{prendaEspecifica.descripcion}</h1>
                <p>Precio: {prendaEspecifica.precio}</p>
                <p>Talla: {prendaEspecifica.talla}</p>
            </div>
            <div>
                <button onClick={handleOrder} >Realizar Pedido</button>
            </div>
            {showPopup && (
                <Popup
                text="Pedido realizado con exito"
                button={<button onClick={handlePopup}>Ok</button>}
                />
            )}
        </div>
    )
}
