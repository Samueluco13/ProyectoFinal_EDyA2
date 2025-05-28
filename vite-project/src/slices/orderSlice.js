import {createSlice} from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderId: null,
        descripcion: null,
        precio: null,
        talla: null,
        productId: null,
        userId: null,
        clasificacion: null,
        created: null,
        moved: null
    },
    reducers: {
        create: (state, action) => {
            state.orderId = action.payload.orderId;
            state.descripcion = action.payload.descripcion;
            state.precio = action.payload.precio;
            state.talla = action.payload.talla;
            state.productId = action.payload.productId;
            state.userId = action.payload.userId;
            state.clasificacion = action.payload.clasificacion;
            state.created = action.payload.created
        },
        remove: (state, action)  => {
            state.orderId = null;
            state.descripcion = null;
            state.precio = null;
            state.talla = null;
            state.productId = null;
            state.orderId = null;
            state.clasificacion = null;
            state.created = null;
            state.moved = null;
        },
        moveTo: (state, action) => {
            state.clasificacion = action.payload.clasificacion;
            state.moved = action.payload.moved
        }
    }
});

export const {create, remove, moveTo} = orderSlice.actions;