import { useAuthStore } from "../store/useAuthStore"

const ChatPage = () => {
    const { logout } = useAuthStore();
    return (
        <>
            <div className="text-red-500">ChatPage</div>
            <button className=" btn-primary bg-red-500 text-lime-400 z-20" onClick={logout}>Logout</button>
        </>
    )
}

export default ChatPage