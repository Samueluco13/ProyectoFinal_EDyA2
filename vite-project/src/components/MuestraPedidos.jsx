import { OrderCard } from '../components/OrderCard.jsx'

export const MuestraPedidos = ({title, pedidos, textoVacio, toShirts, toPants, toShoes, toCorrect, toCompleted}) => {
    return (
    <div className='dashboard' >
        {pedidos.length === 0 ? (
            <h1>{textoVacio}</h1>
        ) : (
            <div className='orders'>
                {pedidos.map((pedido) => (
                    <OrderCard
                    title={title}
                    key={pedido.id}
                    pedido={pedido}
                    toShirts={toShirts}
                    toPants={toPants}
                    toShoes={toShoes}
                    toCorrect={toCorrect}
                    toCompleted={toCompleted}
                    />
                ))}
            </div>
        )}
    </div>
    )
}