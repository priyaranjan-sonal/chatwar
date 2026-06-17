import { useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const fileInputRef = useRef(null);
  const lastUploadedFileRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be under 5MB");
      e.target.value = "";
      return;
    }

    const fileKey = `${file.name}:${file.size}:${file.lastModified}`;
    if (lastUploadedFileRef.current === fileKey) {
      toast.error("Cannot update using the same image");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const success = await updateProfile({ profilePic: reader.result });
      if (success) lastUploadedFileRef.current = fileKey;
      else e.target.value = "";
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className={`avatar ${isUpdatingProfile ? "" : "avatar-online"}`}>
            <button
              type="button"
              className="size-14 rounded-full overflow-hidden relative group disabled:cursor-not-allowed"
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.value = "";
                fileInputRef.current?.click();
              }}
              disabled={isUpdatingProfile}
            >
              <img
                src={authUser.profilePic || "/avatar.png"}
                alt="User image"
                className={`size-full object-cover ${isUpdatingProfile ? "opacity-40" : ""}`}
              />
              {isUpdatingProfile ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <LoaderIcon className="size-5 animate-spin text-cyan-400" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={toggleSound}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;