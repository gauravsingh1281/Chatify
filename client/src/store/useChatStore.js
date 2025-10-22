import { create } from "zustand";
import apiInstance from "../lib/apiInstance";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allChats: [],
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const respone = await apiInstance.get("/messages/contacts");
            set({ allContacts: respone.data });
        } catch (error) {
            toast.error(error.respone.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await apiInstance.get("/messages/chats");
            set({ chats: response.data });
        } catch (error) {
            toast.error(error.respone.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await apiInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.respone?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }

    }
}));