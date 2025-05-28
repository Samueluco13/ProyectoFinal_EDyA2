import { useEffect, useState } from 'react'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'
import {MuestraPedidos} from "../components/MuestraPedidos.jsx"

export const Completados = () => {
    const {getAll, results} = useCollection("pedidos");

    const [despachados, setDespachados] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setDespachados(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["clasificacion", "==", "despachado"], ["orderBy", "moved", "desc"]])
        return () => unsubscribe();
    }, []);


    return (
        <MuestraPedidos title={"PEDIDO DESPACHADO"} pedidos={despachados} textoVacio={"No hay pedidos despachados"}/>
    )
}
