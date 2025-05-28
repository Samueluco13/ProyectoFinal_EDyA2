import { useEffect, useState } from 'react'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'
import {MuestraPedidos} from "../components/MuestraPedidos.jsx"
import { moveOrderTo } from '../utils/moveOrderTo.jsx'
import { notificationCompletedOrder } from '../utils/notificationCompletedOrder.jsx'

export const Pantalones = () => {
    const {handleMoveTo} = moveOrderTo();
    const {notificationOrderComplete} = notificationCompletedOrder()

    const {getAll, results} = useCollection("pedidos");

    const [pantalones, setPantalones] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setPantalones(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["clasificacion", "==", "pantalon"], ["orderBy", "moved", "asc"]])
        return () => unsubscribe();
    }, []);

    const handleToCompleted = async (id) => {
        await handleMoveTo(id, "despachado");
        await notificationOrderComplete(id);
    }

    const handleToCorrect = (id) => {
        handleMoveTo(id, "a corregir");
    }


    return (
        <MuestraPedidos
        title={"PEDIDO DE PANTALON"}
        pedidos={pantalones}
        textoVacio={"No hay pedidos de pantalones"}
        toCompleted={handleToCompleted}
        toCorrect={handleToCorrect}
        />
    )
}
