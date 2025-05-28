import { useCollection } from "../slices/useCollection"
import {createNotification} from "../slices/thunks/notifications/createNotification"
import {useDispatch} from "react-redux"

export const notificationCompletedOrder = () => {
    const dispatch = useDispatch();

    const {add} = useCollection("notificaciones")
    const {getById: pedidoById} = useCollection("pedidos")
    const {getById: prendaById} = useCollection("prendas")

    const notificationOrderComplete = async (id) => {
        const pedidoBuscado = await pedidoById(id);
        const prendaBuscada = await prendaById(pedidoBuscado.prendaId)
        const mensaje = `Tu pedido de ${prendaBuscada.descripcion} fué despachado`
        let userId = pedidoBuscado.userId, pedidoId = id
        let date = Date.now();
        let newNoti = {mensaje, userId, pedidoId, date}
        try{
            await add(newNoti);
            try{
            await dispatch(createNotification(mensaje, userId, pedidoId, date));
            }catch(error){
                console.log("Error al crear una noti en redux: ", error)
            }
        }catch(error){
            console.log("No creó la notificacion en firebase: ", error);
        }
    }
    
    return {notificationOrderComplete}
}
