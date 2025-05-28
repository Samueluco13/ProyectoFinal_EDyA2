import '../styles/App.css'
import { Route, Routes } from "react-router-dom";
import { Login } from '../pages/Login.jsx'
import { Register } from '../pages/Register.jsx'
import { Header } from '../components/Header.jsx'

function AppRoutes() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                </Routes>
            </main>
        </>
    )
}

export default AppRoutes
