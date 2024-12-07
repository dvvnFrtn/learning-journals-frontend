import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ClassPage from "./pages/ClassPage";
import ApprovalPage from "./pages/ApprovalPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import JournalPage from "./pages/journals/JournalPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassDetailPage from "./pages/ClassDetailPage";
import ApprovalSubjectPage from "./pages/ApprovalSubjectPage";
import ApprovalLearningJournal from "./pages/ApprovalLearningJournal";
import JournalMainPage from "./pages/journals/JournalMainPage";
import JournalDetailPage from "./pages/journals/JournalDetailPage";
import ApprovalDetailPage from "./pages/ApprovalDetailPage";
import HomePage from "./HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                        <HomePage />
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
                <Route path="/classes/:id" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ClassDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/approvals" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ApprovalPage />
                    </ProtectedRoute>
                } />
                <Route path="/approvals/classes/:id" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ApprovalSubjectPage />
                    </ProtectedRoute>
                } />
                <Route path="/approvals/classes/:classId/subjects/:subjectId" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ApprovalLearningJournal />
                    </ProtectedRoute>
                } />
                <Route path="/approvals/classes/:classId/subjects/:subjectId/detail/:id" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ApprovalDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/journals" element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <JournalPage />
                    </ProtectedRoute>
                } />
                <Route path="/journals/subjects/:subjectId" element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <JournalMainPage />
                    </ProtectedRoute>
                } />
                <Route path="/journals/subjects/:subjectId/learning-journal/:id" element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <JournalDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default App;
