import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { useCollection } from '../slices/useCollection.js'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const navigate = useNavigate();

    const [prendas, setPrendas] = useState([])

    const {getAll, results} = useCollection("prendas")

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setPrendas(results);
    }, [results, navigate])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([])
        return () => unsubscribe();
    }, []);


    return (
        <div className='dashboard'>
            <div className='prendas'>
                {prendas.map(prenda => (
                    <ProductCard prenda={prenda} key={prenda.id} onClick={() => navigate(`/product/${prenda.id}`)} />
                ))}
            </div>
        </div>
    )
}
