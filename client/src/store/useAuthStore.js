import { create } from "zustand";
import apiInstance from "../lib/apiInstance";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfileImage: false,
    checkAuth: async () => {
        try {
            const response = await apiInstance.get("/auth/check-user");
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in authCheck", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await apiInstance.post("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("User registered successfully.")
        } catch (error) {
            toast.error(error.respone?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await apiInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("User loggedIn successfully.")
        } catch (error) {
            toast.error(error.respone?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await apiInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("User logged out successfully");
        } catch (error) {
            toast.error("Error while loggin out");
            console.log("Logout error", error);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfileImage: true });
        try {
            const response = await apiInstance.put(`/auth/update-profile`, data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updating profile:", error);
            toast.error(error.respone?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfileImage: false });
        }
    }

}));
