import {createSlice} from "@reduxjs/toolkit"

export const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        mensaje: null,
        userId: null,
        pedidoId: null,
        date: null
    },
    reducers: {
        create: (state, action) => {
            state.mensaje = action.payload.mensaje;
            state.userId = action.payload.userId;
            state.pedidoId = action.payload.pedidoId;
            state.date = action.payload.date;
        },
        remove: (state, action) => {
            state.mensaje = null;
            state.userId = null;
            state.pedidoId = null;
            state.date = null;
        }
    }
})
export const {create, remove} = notificationSlice.actions;