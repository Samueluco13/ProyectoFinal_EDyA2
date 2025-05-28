import { createSlice } from '@reduxjs/toolkit';

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState: {
        pedidos: []
    },
    reducers: {
        setPedidos: (state, action) => {
            state.pedidos = action.payload;
        }
    }
});

export const { setPedidos } = firebaseSlice.actions;