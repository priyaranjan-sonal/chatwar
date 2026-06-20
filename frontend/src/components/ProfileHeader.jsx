import { useRef } from "react";
import {
  LoaderIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
function ProfileHeader() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { setSelectedUser } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === "/settings";

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

  const openProfilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  const handleSettingsToggle = () => {
    if (isSettings) {
      setSelectedUser(null);
      navigate("/", { replace: true });
      return;
    }

    setSelectedUser(null);
    navigate("/settings");
  };

  return (
    <div className="panel-header">
      <div className="flex min-w-0 items-center gap-2.5">
          <div className={`avatar size-10 ${isUpdatingProfile ? "" : "avatar-online"}`}>
            <button
              type="button"
              className="relative size-10 overflow-hidden rounded-full group disabled:cursor-not-allowed"
              onClick={openProfilePicker}
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs text-white">Change</span>
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

          <div>
            <h3 className="max-w-[180px] truncate text-sm font-medium text-slate-200">
              {authUser.fullName}
            </h3>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>

        <button
          type="button"
          className={`shrink-0 rounded-lg p-1.5 transition-colors hover:bg-slate-700/50 ${
            isSettings
              ? "bg-slate-700/40 text-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
          onClick={handleSettingsToggle}
          aria-label={isSettings ? "Close settings" : "Open settings"}
        >
          {isSettings ? (
            <XIcon className="size-5" />
          ) : (
            <SettingsIcon className="size-5" />
          )}
        </button>
    </div>
  );
}

export default ProfileHeader;
