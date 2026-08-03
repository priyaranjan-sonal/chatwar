import { useState } from "react"
import { createPortal } from "react-dom"
import {
  SlidersHorizontalIcon,
  UserIcon,
  UserCircleIcon,
  LogOutIcon,
} from "lucide-react"
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"

const SETTINGS_SECTIONS = [
  {
    id: "general",
    label: "General",
    description: "Notification and Theme",
    icon: SlidersHorizontalIcon,
  },
  {
    id: "profile",
    label: "Profile",
    description: "Name, profile picture",
    icon: UserIcon,
  },
  {
    id: "account",
    label: "Account",
    description: "Security notifications, account info",
    icon: UserCircleIcon,
  },
]

function SettingsSidebar({ activeSection, onSectionChange }) {
  const { logout } = useAuthStore()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false)
    await logout()
  }

  const handleSectionClick = (section) => {
    onSectionChange(section.id)

    if (section.id === "account") {
      toast("Coming soon")
    }
  }

  return (
    <>
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-3 sm:px-4">
      <h2 className="px-2 pb-3 text-lg font-semibold text-prsSnow">Settings</h2>

      <div className="space-y-1">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSectionClick(section)}
              className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors ${
                isActive
                  ? "bg-prsBlue/20"
                  : "hover:bg-prsBlue/10"
              }`}
            >
              <Icon
                className={`size-6 shrink-0 ${
                  isActive ? "text-prsSky" : "text-prsSilver"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-prsSnow">
                  {section.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-prsSilver">
                  {section.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-auto border-t border-prsBorder pt-3">
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left text-prsRed transition-colors hover:bg-prsRed/10"
        >
          <LogOutIcon className="size-6 shrink-0" />
          <div>
            <p className="text-sm font-medium">Logout</p>
            <p className="mt-0.5 text-xs leading-relaxed text-prsRose/70">
              Sign out of your account
            </p>
          </div>
        </button>
      </div>
    </div>

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
            className="w-full max-w-sm rounded-xl border border-prsBorder bg-prsCharcoal p-6 shadow-xl"
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
  )
}

export default SettingsSidebar
