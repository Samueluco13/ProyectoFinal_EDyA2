import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '../components/PrivateRoute.jsx';
import { Dashboard } from '../pages/Dashboard'
import { ProductDetails } from '../pages/ProductDetails'
import { MisPendientes } from '../pages/MisPendientes'
import { MisDespachados } from '../pages/MisDespachados'

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={
                <PrivateRoute roles={"usuario"} > 
                    <Dashboard/>
                </PrivateRoute>
            } />
            <Route path='/product/:id' element={
                <PrivateRoute roles={"usuario"} > 
                    <ProductDetails/>
                </PrivateRoute>
            } />
            <Route path='/mis-pedidos-pendientes' element={
                <PrivateRoute roles={"usuario"} > 
                    <MisPendientes/>
                </PrivateRoute>
            } /> 
            <Route path='/mis-pedidos-despachados' element={
                <PrivateRoute roles={"usuario"} > 
                    <MisDespachados/>
                </PrivateRoute>
            } /> 
        </Routes>
    )
}
