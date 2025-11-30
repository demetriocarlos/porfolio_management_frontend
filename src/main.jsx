import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

import { AuthProvider } from './Contexts/AuthContext.jsx'
import { EmailProvider } from './Contexts/EmailContext.jsx'
import { MenuProvider } from './Contexts/MenuContext.jsx'
const queryClient = new QueryClient();

 
/**
 * 
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EmailProvider>
          <MenuProvider>
            <App/>
          </MenuProvider>
        </EmailProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)





/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/