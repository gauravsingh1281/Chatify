import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />

  const ProtectRoute = ({ children }) => {
    if (!authUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-1 sm:p-2 lg:p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-pink-500 opacity-10 sm:opacity-15 lg:opacity-20 blur-[50px] sm:blur-[75px] lg:blur-[100px]" />
      <div className="absolute bottom-0 -right-4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-cyan-500 opacity-10 sm:opacity-15 lg:opacity-20 blur-[50px] sm:blur-[75px] lg:blur-[100px]" />
      <Routes>

        <Route path="/" element={
          <ProtectRoute>
            <ChatPage />
          </ProtectRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;