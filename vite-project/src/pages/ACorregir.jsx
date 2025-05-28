import { useEffect, useState } from 'react'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'
import {MuestraPedidos} from "../components/MuestraPedidos.jsx"
import { moveOrderTo } from '../utils/moveOrderTo.jsx'

export const ACorregir = () => {
    const {handleMoveTo} = moveOrderTo();

    const {getAll, results} = useCollection("pedidos");

    const [aCorregir, setACorregir] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setACorregir(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["clasificacion", "==", "a corregir"], ["orderBy", "moved", "asc"]])
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


    return (
        <MuestraPedidos
        title={"PEDIDO A CORREGIR"}
        pedidos={aCorregir}
        textoVacio={"No hay pedidos a corregir"}
        toShirts={handleToShirt}
        toPants={handleToPants}
        toShoes={handleToShoes}
        />
    )
}
