import { useState } from "react"
import { createPortal } from "react-dom"
import { SettingsIcon, XIcon } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"

function Header() {
  const { authUser } = useAuthStore()
  const { setSelectedUser } = useChatStore()
  const navigate = useNavigate()
  const location = useLocation()
  const isSettings = location.pathname === "/settings"

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleSettings = () => {
    setSelectedUser(null)
    navigate("/settings")
  }

  const handleCloseSettings = () => {
    setSelectedUser(null)
    navigate("/", { replace: true })
  }

  return (
    <>
      <div className="panel-header">
        <div className="flex min-w-0 items-center gap-2.5">
          <h1 className="text-2xl font-bold leading-none tracking-tight">
            <span className="text-prsWhite">Chat</span>
            <span className="text-prsRed">War</span>
          </h1>
        </div>

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
    </>
  )
}

export default Header
