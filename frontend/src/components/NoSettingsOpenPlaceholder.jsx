import { SettingsIcon } from "lucide-react";

function NoSettingsOpenPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-cyan-500/10">
        <SettingsIcon className="size-8 text-cyan-400" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-slate-200">Choose a setting</h3>
      <p className="max-w-sm text-sm text-slate-400">
        Select an option from the sidebar to view and manage your preferences.
      </p>
    </div>
  );
}

export default NoSettingsOpenPlaceholder;
