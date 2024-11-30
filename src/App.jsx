import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ExamplePage from "./pages/ExamplePage";
import UserPage from "./pages/UserPage";
import ClassPage from "./pages/ClassPage";
import ApprovalPage from "./pages/ApprovalPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import JournalPage from "./pages/JournalPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/examples" element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                        <ExamplePage />
                    </ProtectedRoute>
                } />
                <Route path="/users" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <UserPage />
                    </ProtectedRoute>
                } />
                <Route path="/classes" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ClassPage />
                    </ProtectedRoute>
                } />
                <Route path="/approvals" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ApprovalPage />
                    </ProtectedRoute>
                } />
                <Route path="/journals" element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <JournalPage />
                    </ProtectedRoute>
                } />
            </Routes>
            <ToastContainer
                position="bottom-center"
            />
        </>
    )
}

export default App;
