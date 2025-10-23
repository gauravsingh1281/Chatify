import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await login(formData);
            if (success) {
                setFormData({
                    email: "",
                    password: "",
                });
                navigate("/");
            }
        } catch (error) {
            console.log("login failed", error)
        }


    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4">
            <div className="relative w-full max-w-6xl min-h-[600px] sm:min-h-[650px] lg:h-[800px]">
                <BorderAnimatedContainer>
                    <div className="w-full flex flex-col lg:flex-row min-h-full bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                        {/* FORM COLUMN - LEFT SIDE */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex items-center justify-center lg:border-r border-white/10">
                            <div className="w-full max-w-sm sm:max-w-md">
                                {/* HEADING TEXT */}
                                <div className="text-center mb-6 sm:mb-8">
                                    <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                                        <MessageCircleIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">Welcome Back</h2>
                                    <p className="text-sm sm:text-base text-white/70">Sign in to your account</p>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    {/* EMAIL INPUT */}
                                    <div>
                                        <label className="auth-input-label">Email</label>
                                        <div className="relative">
                                            <MailIcon className="auth-input-icon" />

                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input"
                                                placeholder="johndoe@gmail.com"
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD INPUT */}
                                    <div>
                                        <label className="auth-input-label">Password</label>
                                        <div className="relative">
                                            <LockIcon className="auth-input-icon" />

                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="input"
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                    </div>

                                    {/* SUBMIT BUTTON */}
                                    <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                                        {isLoggingIn ? (
                                            <LoaderIcon className="w-full mx-auto h-5 animate-spin text-center" />
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 sm:mt-6 text-center">
                                    <Link to="/signup" className="auth-link text-sm sm:text-base">
                                        Don't have an account? Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* FORM ILLUSTRATION - RIGHT SIDE */}
                        <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-4 sm:p-6 bg-gradient-to-bl from-violet-600/10 via-purple-600/5 to-transparent relative">
                            <div className="relative z-10">
                                <div className="relative">
                                    <img
                                        src="/login.png"
                                        alt="People using mobile devices"
                                        className="w-full h-auto object-contain drop-shadow-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 to-transparent rounded-2xl"></div>
                                </div>
                                <div className="mt-6 sm:mt-8 text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">Connect Anywhere, Anytime</h3>

                                    <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
                                        <span className="auth-badge text-xs sm:text-sm">🔥 Lightning Fast</span>
                                        <span className="auth-badge text-xs sm:text-sm">🌐 Cross Platform</span>
                                        <span className="auth-badge text-xs sm:text-sm">💎 Premium Quality</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderAnimatedContainer>
            </div>
        </div>
    )
}

export default LoginPage