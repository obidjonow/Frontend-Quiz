import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <>
        <Toaster/>
        <App />
    </>
)
