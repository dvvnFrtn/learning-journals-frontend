import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExamplePage from './pages/ExamplePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage.jsx'
import ClassPage from './pages/ClassPage.jsx'
import ApprovalPage from './pages/ApprovalPage.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/example" element={<ExamplePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/class" element={<ClassPage />} />
                <Route path="/approval" element={<ApprovalPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
