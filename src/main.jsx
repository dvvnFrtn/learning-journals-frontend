import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExamplePage from './pages/ExamplePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/example" element={<ExamplePage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
