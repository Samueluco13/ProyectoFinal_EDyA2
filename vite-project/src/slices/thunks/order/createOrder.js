import { create } from "../../orderSlice";

export const createOrder = (orderId, descripcion, precio, talla, productId, userId, created) => {
    return async(dispatch) => {
        dispatch(create({orderId, descripcion, precio, talla, productId, userId, created}));
    }
}