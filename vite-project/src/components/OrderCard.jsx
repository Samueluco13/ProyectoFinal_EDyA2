import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { GiConverseShoe } from 'react-icons/gi';
import { ImCheckmark2 } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";
import "../styles/OrderCard.css"


export const OrderCard = ({title, pedido, toShirts, toPants, toShoes, toCompleted, toCorrect}) => {
    return (
        <div className="order-card">
                <h3 className="order-card-titulo" >{title}</h3>
                <p className="order-card-descripcion" >{pedido.descripcion}</p>
                <p className="order-card-precio" >{pedido.precio} COP</p>
                <p className="order-card-talla" >Talla {pedido.talla}</p>
            <div className="order-card-buttons">
                {toShirts && (
                    <button onClick={() => toShirts(pedido.id)}>
                        <IoShirtOutline />
                    </button>
                )}
                {toPants && (
                    <button onClick={() => toPants(pedido.id)}>
                        <PiPants />
                    </button>
                )}
                {toShoes && (
                    <button onClick={() => toShoes(pedido.id)}>
                        <GiConverseShoe />
                    </button>
                )}
                {toCompleted && (
                    <button onClick={() => toCompleted(pedido.id)}>
                        <ImCheckmark2 />
                    </button>
                )}
                {toCorrect && (
                    <button onClick={() => toCorrect(pedido.id)}>
                        <FaXmark />
                    </button>
                )}
            </div>
        </div>
    )
}