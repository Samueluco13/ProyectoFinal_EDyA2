import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import { useCollection } from '../slices/useCollection'
import { ProductCard } from '../components/ProductCard'
import { Popup } from '../components/Popup'

export const MisDespachados = () => {
    const navigate = useNavigate();
    const [misPedidosDespachados, setMisPedidosDespachados] = useState([]);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const {getAll, results} = useCollection("pedidos");
    const {uid} = useSelector(state => state.auth);

    useEffect(() => { //Setea en el arreglo de la variable de estado lo que haya en tiemo real en la base de datos
        setMisPedidosDespachados(results);
    }, [results])

    useEffect(() => {; //Escucha los cambios de la base de datos
        const unsubscribe = getAll([["userId","==", uid], ["clasificacion","==","despachado"], ["orderBy", "moved", "asc"]])
        return () => unsubscribe();
    }, []);

    const handleDespacho = () => {
        setShowMessagePopup(true);
    }


    return (
        <div className='dashboard' >
                {misPedidosDespachados.length === 0 ? (
                    <h2>No tienes pedidos realizados</h2>
                ) : (
                    <div className='prendas' >
                        {misPedidosDespachados.map(pedido => (
                            <ProductCard
                            prenda={pedido}
                            key={pedido.id}
                            onClick={() => navigate(`/product/${pedido.prendaId}`)}
                            onDespacho={handleDespacho}
                            />
                        ))}
                    </div> 
                )}
                {showMessagePopup && (
                    <Popup
                    text="¡Tu pedido está en camino!"
                    button={<button onClick={() => setShowMessagePopup(false)}>Ok</button>}
                    />
                )}
        </div>
    )
}
