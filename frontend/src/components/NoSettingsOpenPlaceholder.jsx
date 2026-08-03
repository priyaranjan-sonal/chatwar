import { SettingsIcon } from "lucide-react"

function NoSettingsOpenPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-prsBlue/10">
        <SettingsIcon className="size-8 text-prsSky" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-prsSnow">Choose a setting</h3>
      <p className="max-w-sm text-sm text-prsSilver">
        Select an option from the sidebar to view and manage your preferences.
      </p>
    </div>
  )
}

export default NoSettingsOpenPlaceholder
