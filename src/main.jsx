import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CreateContext from '../ContextApi/CreateContext.jsx'
import ContextApi from './context/contextApi.jsx'



createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <StrictMode>
     <GoogleOAuthProvider  clientId='746530431057-qt8hrmrblvibro7usqa6egootiatf58p.apps.googleusercontent.com'> 
        <CreateContext>
           <ContextApi> <App /></ContextApi>
            </CreateContext>
        </GoogleOAuthProvider>
    </StrictMode>
</BrowserRouter>,
)
