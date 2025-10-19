import { create } from "zustand";
export const useAuthStore = create((set) => ({
    authUser: {
        name: "john", _id: 133,
    },
    isLoading: false,
    login: () => {
        console.log("we just loggedIN");
        set({ isLoading: true })
    }
}));
