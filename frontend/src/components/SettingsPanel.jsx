import { BellIcon, MoonIcon, SlidersHorizontalIcon, SunIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

function SettingsPanel({ onClose }) {
  const { isSoundEnabled, toggleSound, theme, setTheme } = useChatStore();

  const handleThemeChange = (nextTheme) => {
    if (nextTheme === "light") {
      toast("Light theme coming soon");
      return;
    }
    setTheme(nextTheme);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="panel-header">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-700/50">
            <SlidersHorizontalIcon className="size-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-slate-200">General</h3>
            <p className="text-xs text-slate-400">App preferences</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-200"
          aria-label="Close section"
        >
          <XIcon className="size-5 cursor-pointer transition-colors" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-xl space-y-8">
          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Notifications
            </h3>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <BellIcon className="size-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200">Message sounds</p>
                    <p className="text-xs text-slate-400">
                      Play a sound for new incoming messages
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isSoundEnabled}
                  onClick={toggleSound}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                    isSoundEnabled ? "bg-cyan-500" : "bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
                      isSoundEnabled ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  theme === "dark"
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : "border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/70"
                }`}
              >
                <MoonIcon
                  className={`mb-3 size-6 ${
                    theme === "dark" ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
                <p className="text-sm font-medium text-slate-200">Dark</p>
                <p className="mt-1 text-xs text-slate-400">Default appearance</p>
              </button>

              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  theme === "light"
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : "border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/70"
                }`}
              >
                <SunIcon
                  className={`mb-3 size-6 ${
                    theme === "light" ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
                <p className="text-sm font-medium text-slate-200">Light</p>
                <p className="mt-1 text-xs text-slate-400">Coming soon</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
