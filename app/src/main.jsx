import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* adicione uma rota aqui */}
        <Route path="/" element={<div className='bg-red-500'>Hello, World!</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
