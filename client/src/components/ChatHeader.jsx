import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener("keydown", handleEscKey);
        // cleanup function
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);

    return (
        <div
            className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-[64px] sm:max-h-[74px] lg:max-h-[84px] px-3 sm:px-4 lg:px-6 py-3 sm:py-4"
        >
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full">
                        <img className="rounded-full w-full h-full object-cover" src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-slate-200 font-medium text-sm sm:text-base truncate">{selectedUser.fullName}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">{`${isOnline ? "Online" : "Offline"}`}</p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)} className="lg:hidden p-1">
                <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
            </button>
        </div>
    )
}

export default ChatHeader