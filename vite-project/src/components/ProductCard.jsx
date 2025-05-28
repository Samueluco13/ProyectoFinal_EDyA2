import "../styles/ProductCard.css"

export const ProductCard = ({prenda, onClick, onRemove, onDespacho}) => {
    return (
        <div className='product-card'>
            <h2 onClick={onClick} >{prenda.descripcion}</h2>
            <p>{prenda.precio} COP</p>
            <p>Talla: {prenda.talla}</p>
            <div>
                {onDespacho && (
                    <button className="product-card-button dispatch" onClick={onDespacho} >
                        Pedido Despachado
                    </button>
                )}
                {onRemove && (
                    <button className="product-card-button danger"  onClick={() => onRemove(prenda.id)}>
                        Eliminar Pedido
                    </button>
                )}
            </div>
        </div>
    )
}
