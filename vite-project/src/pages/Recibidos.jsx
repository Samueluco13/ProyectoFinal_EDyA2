import { useEffect, useState } from 'react'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'
import {MuestraPedidos} from "../components/MuestraPedidos.jsx"
import { moveOrderTo } from '../utils/moveOrderTo.jsx'

export const Recibidos = () => {
    const {handleMoveTo} = moveOrderTo();

    const {getAll, results} = useCollection("pedidos");

    const [recibidos, setRecibidos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setRecibidos(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["clasificacion", "==", "recibido"], ["orderBy", "created", "asc"]])
        return () => unsubscribe();
    }, []);

    const handleToShirt = (id) => {
        handleMoveTo(id, "camiseta");
    }

    const handleToPants = (id) => {
        handleMoveTo(id, "pantalon");
    }

    const handleToShoes = (id) => {
        handleMoveTo(id, "zapato");
    }

    console.log(recibidos)
    return (
        <MuestraPedidos
        title={"NUEVO PEDIDO"}
        pedidos={recibidos}
        textoVacio={"No hay pedidos recibidos"}
        toShirts={handleToShirt}
        toPants={handleToPants}
        toShoes={handleToShoes}
        />
    )
}
