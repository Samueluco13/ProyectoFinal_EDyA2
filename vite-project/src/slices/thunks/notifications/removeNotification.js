import { remove } from "../../notificationSlice";

export const removeNotification = () => {
    return async(dispatch) => {
        await dispatch(remove());
    }
}