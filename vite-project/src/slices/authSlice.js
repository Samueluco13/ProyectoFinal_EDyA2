import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        uid: null,
        displayName: null,
        logged: false,
        email: null,
        rol: null
    },
    reducers: {
        register: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.rol = action.payload.rol;
        },
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.logged = true;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.rol = action.payload.rol;
        },
        logout: (state) => {
            state.uid = null;
            state.logged = false;
            state.displayName = null;
            state.email = null;
            state.rol = null;
        }
    }
})

export const { register, login, logout } = authSlice.actions;