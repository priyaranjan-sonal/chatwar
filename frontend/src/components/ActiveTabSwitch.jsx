import { useState } from "react"
import { createPortal } from "react-dom"
import { ShieldCheckIcon, XIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react"
import { useChatStore } from "../store/useChatStore.js"

const SUPER_ADMIN_PASSWORD = "chatwar@1234"

function ActiveTabSwitch() {

  const {activeTab, superAdminMode, setActiveTab, setSuperAdminMode, theme} = useChatStore()
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSuperAdminClick = () => {
    if (superAdminMode) {
      setSuperAdminMode(false)
      return
    }
    setPasswordInput("")
    setPasswordError("")
    setShowPassword(false)
    setShowPasswordPrompt(true)
  }

  const handlePasswordSubmit = () => {
    setIsVerifying(true)
    setPasswordError("")

    if (passwordInput === SUPER_ADMIN_PASSWORD) {
      setActiveTab("contacts")
      setSuperAdminMode(true)
      setShowPasswordPrompt(false)
    } else {
      setPasswordError("Incorrect password")
    }

    setIsVerifying(false)
  }

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit()
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3 shrink-0">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none transition-colors ${
            activeTab === "chats" ? "bg-prsBlue/50 text-prsWhite" : "text-prsGray hover:bg-prsGraphite/80 hover:text-prsSnow"
          }`}
        >Chats</button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none transition-colors ${
            activeTab === "contacts" && !superAdminMode ? "bg-prsBlue/50 text-prsWhite" : "text-prsGray hover:bg-prsGraphite/80 hover:text-prsSnow"
          }`}
        >Contacts</button>

        <button
          type="button"
          onClick={handleSuperAdminClick}
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            superAdminMode
              ? "bg-prsYellow/50 text-prsYellow"
              : "text-prsSilver hover:bg-prsYellow/30 hover:text-prsYellow"
          }`}
          aria-label="Super admin"
        >
          <ShieldCheckIcon className="size-5" />
        </button>
      </div>

      {showPasswordPrompt &&
        createPortal(
          <div
            className="chat-app fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            data-auth-theme={theme === "light" ? "light" : "dark"}
            onClick={() => setShowPasswordPrompt(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="super-admin-dialog-title"
              className="w-full max-w-sm rounded-xl border border-prsBorder bg-prsCharcoal p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3
                  id="super-admin-dialog-title"
                  className="text-lg font-medium text-prsSnow"
                >
                  Super Admin
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPasswordPrompt(false)}
                  className="flex size-8 items-center justify-center rounded-full text-prsSilver transition-colors hover:bg-prsRed/20 hover:text-prsRed"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-prsSilver">
                Enter the admin password to continue.
              </p>

              <div className="relative mt-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value)
                    if (passwordError) setPasswordError("")
                  }}
                  onKeyDown={handlePasswordKeyDown}
                  placeholder="Password"
                  className={`w-full rounded-lg bg-prsGraphite/50 px-4 py-2.5 pr-10 text-sm text-prsSnow outline-none transition-colors placeholder:text-prsSilver focus:ring-1 focus:ring-prsYellow/50 ${
                    passwordError ? "ring-1 ring-prsRed/50" : ""
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-prsSilver transition-colors hover:text-prsSnow"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="mt-2 text-xs text-prsRed">{passwordError}</p>
              )}

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordPrompt(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-prsSilver transition-colors hover:bg-prsBlue/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePasswordSubmit}
                  disabled={!passwordInput || isVerifying}
                  className="rounded-lg bg-prsYellow px-4 py-2 text-sm font-medium text-prsBlack transition-colors hover:bg-prsYellow/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifying ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    "Unlock"
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default ActiveTabSwitch
