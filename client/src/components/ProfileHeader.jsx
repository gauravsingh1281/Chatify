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
        <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {/* Avatar*/}
                    <div className="avatar online">
                        <button className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full overflow-hidden relative group flex-shrink-0" onClick={() => fileInputRef.current.click()}>
                            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="user-image" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">
                                    {isUpdatingProfileImage ? (
                                        <LoaderIcon className="w-4 h-4 animate-spin" />
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
                    <div className="min-w-0 flex-1">
                        <h3 className="text-slate-200 font-medium text-sm sm:text-base truncate">{authUser.fullName}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">Online</p>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center flex-shrink-0">
                    {/* logout btn */}
                    <button className="text-slate-400 hover:text-slate-200 transition-colors p-1" onClick={logout}>
                        <LogOutIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    {/* Sound toggle btn */}

                    <button className="text-slate-400 hover:text-slate-200 transition-colors p-1" onClick={() => {
                        // play click sound before toggling
                        mouseClickSound.currentTime = 0;   //reset to start 
                        mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                        toggleSound();
                    }}>
                        {
                            isSoundEnabled ? <Volume2Icon className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader