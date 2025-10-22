import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LoaderIcon, LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
    const { logout, authUser, updateProfile, isUpdatingProfileImage } = useAuthStore();
    const { isSoundEnabled, toggleSound } = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const fileInputRef = useRef(null);
    console.log(authUser)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        }

    }
    return (
        <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar*/}
                    <div className="avatar online">
                        <button className="size-14 rounded-full overflow-hidden relative group" onClick={() => fileInputRef.current.click()}>
                            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="user-image" className="size-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">
                                    {isUpdatingProfileImage ? (
                                        <LoaderIcon className="w-full mx-auto h-5 animate-spin text-center" />
                                    ) : (
                                        "Change"
                                    )}

                                </span>
                            </div>
                        </button>

                        <input type="file" accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    {/* Username & online text */}
                    <div >
                        <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">{authUser.fullName}</h3>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-4 items-center">
                    {/* logout btn */}
                    <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={logout}>
                        <LogOutIcon className="size-5" />
                    </button>
                    {/* Sound toggle btn */}

                    <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={() => {
                        // play click sound before toggling
                        mouseClickSound.currentTime = 0;   //reset to start 
                        mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                        toggleSound();
                    }}>
                        {
                            isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader