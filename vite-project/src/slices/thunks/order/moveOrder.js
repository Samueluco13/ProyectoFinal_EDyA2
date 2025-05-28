import {moveTo} from "../../orderSlice.js"

export const moveOrder = (clasificacion, moved) => {
    return async (dispatch) => {
        dispatch(moveTo({clasificacion, moved}))
    }
}