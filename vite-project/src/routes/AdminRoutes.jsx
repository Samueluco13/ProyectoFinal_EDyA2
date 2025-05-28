import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from '../components/PrivateRoute';
import { Recibidos } from '../pages/Recibidos';
import { Camisetas } from '../pages/Camisetas.jsx'
import { Pantalones } from '../pages/Pantalones.jsx'
import { Zapatos } from '../pages/Zapatos.jsx'
import { ACorregir } from '../pages/ACorregir.jsx'
import { Completados } from '../pages/Completados.jsx'

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/recibidos' element={
                <PrivateRoute roles={"Admin"}>
                    <Recibidos/>
                </PrivateRoute>
            } />
                <Route path='/camisetas' element={
                <PrivateRoute roles={"Admin"}>
                    <Camisetas/>
                </PrivateRoute>
            } />
                <Route path='/pantalones' element={
                <PrivateRoute roles={"Admin"}>
                    <Pantalones/>
                </PrivateRoute>
            } />
                <Route path='/zapatos' element={
                <PrivateRoute roles={"Admin"}>
                    <Zapatos/>
                </PrivateRoute>
            } />
                <Route path='/a-corregir' element={
                <PrivateRoute roles={"Admin"}>
                    <ACorregir/>
                </PrivateRoute>
            } />
                <Route path='/completados' element={
                <PrivateRoute roles={"Admin"}>
                    <Completados/>
                </PrivateRoute>
            } />
        </Routes>
    )
}
