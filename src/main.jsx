import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CreateContext from '../ContextApi/CreateContext.jsx'
import AutherisedUserContext from './context/AutherisedUserContext.jsx'
import ResponseContextApi from './context/ResponseContextApi.jsx'




createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <StrictMode>
     <GoogleOAuthProvider  clientId='746530431057-qt8hrmrblvibro7usqa6egootiatf58p.apps.googleusercontent.com'> 
        <CreateContext>
           <ResponseContextApi>
           <AutherisedUserContext>  <App /></AutherisedUserContext>
             </ResponseContextApi>
            </CreateContext>
        </GoogleOAuthProvider>
    </StrictMode>
</BrowserRouter>,
)
