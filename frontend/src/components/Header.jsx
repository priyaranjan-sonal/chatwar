import { useState } from "react";
import { createPortal } from "react-dom";
import { SettingsIcon, XIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function Header() {
  const { authUser, logout } = useAuthStore();
  const { setSelectedUser } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === "/settings";

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  const handleSettings = () => {
    setSelectedUser(null);
    navigate("/settings");
  };

  const handleCloseSettings = () => {
    setSelectedUser(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="panel-header">
        {/* Logo */}
        <div className="flex min-w-0 items-center gap-2.5">
          <h1 className="text-2xl font-bold leading-none tracking-tight">
            <span className="text-prsWhite">Chat</span>
            <span className="text-prsRed">War</span>
          </h1>
        </div>

        {/* Right action — X when in settings, settings icon + avatar otherwise */}
        <div className="flex items-center gap-2">
          {isSettings ? (
            <button
              type="button"
              onClick={handleCloseSettings}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-prsSilver transition-colors hover:bg-prsGraphite/80 hover:text-prsSnow"
              aria-label="Close settings"
            >
              <XIcon className="size-5" />
            </button>
          ) : (
            <>
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="User"
                  className="size-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleSettings}
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-prsSilver transition-colors hover:bg-prsGraphite/80 hover:text-prsSnow"
                aria-label="Open settings"
              >
                <SettingsIcon className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-dialog-title"
              className="w-full max-w-sm rounded-xl border border-prsSlate/80 bg-prsCharcoal p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="logout-dialog-title"
                className="text-lg font-medium text-prsSnow"
              >
                Log out?
              </h3>
              <p className="mt-2 text-sm text-prsSilver">
                Are you sure you want to sign out of your account?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-prsWhite transition-colors hover:bg-prsBlue/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogoutConfirm}
                  className="rounded-lg bg-prsRed px-4 py-2 text-sm font-medium text-prsWhite transition-colors hover:bg-prsRed/80"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
