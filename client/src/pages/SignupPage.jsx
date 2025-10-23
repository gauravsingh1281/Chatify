import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const SignupPage = () => {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { signup, isSigningUp } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await signup(formData);
            if (success) {
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                });
                navigate("/");
            };
        } catch (error) {
            console.log("Signup error:", error);
        };
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 bg-slate-900">
            <div className="relative w-full max-w-6xl min-h-[600px] sm:min-h-[650px] lg:h-[800px]">
                <BorderAnimatedContainer>
                    <div className="w-full flex flex-col lg:flex-row min-h-full">
                        {/* FORM COLUMN - LEFT SIDE */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex items-center justify-center lg:border-r border-slate-600/30">
                            <div className="w-full max-w-sm sm:max-w-md">
                                {/* HEADING TEXT */}
                                <div className="text-center mb-6 sm:mb-8">
                                    <MessageCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-400 mb-3 sm:mb-4" />
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                                    <p className="text-sm sm:text-base text-slate-400">Sign up for a new account</p>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    {/* FULL NAME */}
                                    <div>
                                        <label className="auth-input-label">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="auth-input-icon" />

                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="input"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

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
                                    <button className="auth-btn" type="submit" disabled={isSigningUp}>
                                        {isSigningUp ? (
                                            <LoaderIcon className="w-full mx-auto h-5 animate-spin text-center" />
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 sm:mt-6 text-center">
                                    <Link to="/login" className="auth-link text-sm sm:text-base">
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* FORM ILLUSTRATION - RIGHT SIDE */}
                        <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-4 sm:p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                            <div>
                                <img
                                    src="/signup.png"
                                    alt="People using mobile devices"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="mt-4 sm:mt-6 text-center">
                                    <h3 className="text-lg sm:text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                                    <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
                                        <span className="auth-badge text-xs sm:text-sm">Free</span>
                                        <span className="auth-badge text-xs sm:text-sm">Easy Setup</span>
                                        <span className="auth-badge text-xs sm:text-sm">Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderAnimatedContainer>
            </div>
        </div>
    );
}

export default SignupPage;