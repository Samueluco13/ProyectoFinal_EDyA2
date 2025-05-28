import { useEffect, useState } from 'react'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'
import {MuestraPedidos} from "../components/MuestraPedidos.jsx"
import { moveOrderTo } from '../utils/moveOrderTo.jsx'
import { notificationCompletedOrder } from '../utils/notificationCompletedOrder.jsx'

export const Zapatos = () => {
    const {handleMoveTo} = moveOrderTo();
    const {notificationOrderComplete} = notificationCompletedOrder();

    const {getAll, results} = useCollection("pedidos");

    const [zapatos, setZapatos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setZapatos(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["clasificacion", "==", "zapato"], ["orderBy", "moved", "asc"]])
        return () => unsubscribe();
    }, []);

    const handleToCompleted = async (id) => {
        await handleMoveTo(id, "despachado");
        await notificationOrderComplete(id);
    }

    const handleToCorrect = async (id) => {
        await handleMoveTo(id, "a corregir");
    }


    return (
        <MuestraPedidos
        title={"PEDIDO DE ZAPATOS"}
        pedidos={zapatos}
        textoVacio={"No hay pedidos de zapatos"}
        toCompleted={handleToCompleted}
        toCorrect={handleToCorrect}
        />
    )
}
