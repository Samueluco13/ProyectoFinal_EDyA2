import {create} from "../../notificationSlice"

export const createNotification = (mensaje, userId, pedidoId, date) => {
    return async (dispatch) => {
        dispatch(create({mensaje, userId, pedidoId, date}));
    }
}