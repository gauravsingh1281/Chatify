import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPLaceholder from "./NoChatHistoryPLaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { useRef } from "react";

const ChatContainer = () => {
    const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        getMessagesByUserId(selectedUser._id);
        subscribeToMessages();

        // clean up
        return () => unsubscribeFromMessages();
    }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);


    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-2 sm:px-4 lg:px-6 overflow-y-auto py-4 sm:py-6 lg:py-8">
                {
                    messages.length > 0 && !isMessagesLoading ?
                        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
                            {messages.map(msg => (
                                <div
                                    key={msg._id}
                                    className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                                >
                                    <div
                                        className={`chat-bubble relative text-sm sm:text-base ${msg.senderId === authUser._id
                                            ? "bg-cyan-600 text-white"
                                            : "bg-slate-800 text-slate-200"
                                            }`}
                                    >
                                        {msg.image && (
                                            <img src={msg.image} alt="Shared" className="rounded-lg h-32 sm:h-40 lg:h-48 object-cover w-full max-w-xs" />
                                        )}
                                        {msg.text && <p className="mt-2 break-words">{msg.text}</p>}
                                        <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                            {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {/* scroll to end target */}
                            <div ref={messageEndRef} />
                        </div>
                        : isMessagesLoading ? <MessagesLoadingSkeleton /> : <NoChatHistoryPLaceholder name={selectedUser.fullName} />
                }
            </div>
            <MessageInput />
        </>
    )
}

export default ChatContainer