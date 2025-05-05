import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter> if we want to use the ability to preload data using routing, we have to get rid of BrowserRouter */}
    <App />
    {/* </BrowserRouter> */}
  </StrictMode>,
)
