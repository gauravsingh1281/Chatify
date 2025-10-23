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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative flex items-center justify-center p-1 sm:p-2 lg:p-4 overflow-hidden">
      {/* DECORATORS - MODERN GRID & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-violet-600 opacity-20 sm:opacity-25 lg:opacity-30 blur-[80px] sm:blur-[100px] lg:blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-600 opacity-20 sm:opacity-25 lg:opacity-30 blur-[80px] sm:blur-[100px] lg:blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-pink-600 opacity-10 sm:opacity-15 lg:opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px] rounded-full" />
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