import { create } from "zustand";
import apiInstance from "../lib/apiInstance";
import { io } from "socket.io-client";
import toast from "react-hot-toast";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfileImage: false,
    socket: null,
    onlineUsers: [],
    checkAuth: async () => {
        try {
            const response = await apiInstance.get("/auth/check-user");
            set({ authUser: response.data });
            get().connectSocket();
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
            toast.success("User registered successfully.");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await apiInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("User loggedIn successfully.");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await apiInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("User logged out successfully");
            get().disconnectSocket();
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
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfileImage: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, { withCredentials: true });
        socket.connect();
        set({ socket });
        // listen for online users
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },
    disconnectSocket: () => {
        if (get().socket.connected) get().socket.disconnect();
    }


}));
