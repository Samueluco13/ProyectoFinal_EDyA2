import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { errorSlice } from "./errorSlice";
import { orderSlice } from "./orderSlice";
import { notificationSlice } from "./notificationSlice";

const currentUser = JSON.parse(localStorage.getItem("currentUser")); //Toma los datos de autenticacion del usuario guardados

const preloadedState  = { //Aqui se guardan los datos guardados en el estado tomado de currentUser o el estado ppr default
    auth: currentUser ?? {
        uid: null,
        displayName: null,
        logged: false,
        email: null,
        rol: null
    }
}

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        error: errorSlice.reducer,
        order: orderSlice.reducer,
        notifications: notificationSlice.reducer
    },
    preloadedState  //Agrega los datos pre-cargados al reducer para que los tome al recargar
});