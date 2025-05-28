import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { AdminRoutes } from './routes/AdminRoutes.jsx';
import { UserRoutes } from './routes/UserRoutes.jsx';
import { Provider } from 'react-redux';
import { store } from "./slices/store.js"
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
        <Provider store={store}>
          <AppRoutes/>
          <AdminRoutes/>
          <UserRoutes/>
        </Provider>   
    </StrictMode>
  </BrowserRouter>
)