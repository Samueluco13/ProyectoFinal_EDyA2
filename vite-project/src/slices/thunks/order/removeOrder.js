import { remove } from "../../orderSlice";

export const removeOrder = () => {
    return async(dispatch) => {
        await dispatch(remove());
    }
}