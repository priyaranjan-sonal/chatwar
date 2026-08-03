import { useRef, useState } from "react"
import { UserIcon, XIcon, CameraIcon, LoaderIcon } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

function ProfilePanel({ onClose }) {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [fullName, setFullName] = useState(authUser?.fullName || "")
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    const data = {}
    if (selectedFile) {
      data.profilePic = preview
    }
    if (fullName.trim() !== authUser?.fullName) {
      data.fullName = fullName.trim()
    }
    await updateProfile(data)
  }

  const currentPic = preview || authUser?.profilePic || "/avatar.png"

  const hasChanges = (fullName.trim() !== authUser?.fullName) || selectedFile !== null

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="panel-header">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-prsGraphite/80">
            <UserIcon className="size-5 text-prsSky" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-prsSnow">Profile</h3>
            <p className="text-xs text-prsSilver">Name, profile picture</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-prsSilver transition-colors hover:bg-prsGraphite/80 hover:text-prsSnow"
          aria-label="Close section"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-xl space-y-8">
          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-prsSilver">
              Profile Picture
            </h3>
            <div className="rounded-xl border border-prsBorder bg-prsCharcoal/70 p-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative size-24 shrink-0 overflow-hidden rounded-full"
                  aria-label="Change profile picture"
                >
                  <img
                    src={currentPic}
                    alt="Profile"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <CameraIcon className="size-6 text-prsWhite" />
                  </div>
                </button>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-prsSnow">Change photo</p>
                  <p className="mt-1 text-xs text-prsSilver">
                    Click the avatar to upload a new image
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-prsSilver">
              Full Name
            </h3>
            <div className="rounded-xl border border-prsBorder bg-prsCharcoal/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-prsBlue/10">
                  <UserIcon className="size-5 text-prsSky" />
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-prsSnow outline-none placeholder:text-prsSilver"
                    placeholder="Your full name"
                  />
                </div>
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || isUpdatingProfile}
            className="w-full rounded-xl bg-prsBlue px-4 py-3 text-sm font-medium text-prsWhite transition-colors hover:bg-prsBlue/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdatingProfile ? (
              <LoaderIcon className="mx-auto size-5 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
