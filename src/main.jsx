import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'
import { BrowserRouter } from 'react-router-dom'
import createRefresh from 'react-auth-kit/createRefresh'
import axiosInstance from './utils/axiosInstance'

const refresh = createRefresh({
    interval: 2,
    refreshApiCallback: async (param) => {
        try {
            const response = await axiosInstance.post("/auth/refresh-token", { refreshToken: param.refreshToken }, {
                headers: {
                    'jwt': param.authToken
                }
            })
            console.log("Refreshing")
            return {
                isSuccess: true,
                newAuthToken: response.data.data.accessToken,
                newRefreshToken: response.data.data.refreshToken,
            }
        } catch (error) {
            console.error("Error Refreshing Token: ", error.response.data.message || error.message)
            document.cookie = "_auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.cookie = "_auth_refresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.cookie = "_auth_state=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            return {
                isSuccess: false
            }
        }
    }
})

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    debug: false,
    refresh: refresh,
    cookieDomain: window.location.hostname,
    cookieSecure: false,
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
)
