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
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-prsGraphite/80">
            <SlidersHorizontalIcon className="size-5 text-prsSky" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-prsSnow">General</h3>
            <p className="text-xs text-prsSilver">Notification and Theme</p>
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
              Notifications
            </h3>
            <div className="rounded-xl border border-prsSlate/80 bg-prsCharcoal/70 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-prsBlue/10">
                    <BellIcon className="size-5 text-prsSky" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-prsSnow">Message sounds</p>
                    <p className="text-xs text-prsSilver">
                      Play a sound for new incoming messages
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isSoundEnabled}
                  onClick={toggleSound}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${isSoundEnabled ? "bg-prsBlue" : "bg-prsSlate"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 size-6 rounded-full bg-prsWhite shadow transition-transform ${isSoundEnabled ? "left-[22px]" : "left-0.5"
                      }`}
                  />
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-prsSilver">
              Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`rounded-xl border p-4 text-left transition-colors ${theme === "dark"
                    ? "border-prsBlue/50 bg-prsBlue/10"
                    : "border-prsSlate/80 bg-prsCharcoal/70 hover:bg-prsCharcoal/90"
                  }`}
              >
                <MoonIcon
                  className={`mb-3 size-6 ${theme === "dark" ? "text-prsSky" : "text-prsSilver"
                    }`}
                />
                <p className="text-sm font-medium text-prsSnow">Dark</p>
                <p className="mt-1 text-xs text-prsSilver">Default appearance</p>
              </button>

              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`rounded-xl border p-4 text-left transition-colors ${theme === "light"
                    ? "border-prsBlue/50 bg-prsBlue/10"
                    : "border-prsSlate/80 bg-prsCharcoal/70 hover:bg-prsCharcoal/90"
                  }`}
              >
                <SunIcon
                  className={`mb-3 size-6 ${theme === "light" ? "text-prsSky" : "text-prsSilver"
                    }`}
                />
                <p className="text-sm font-medium text-prsSnow">Light</p>
                <p className="mt-1 text-xs text-prsSilver">Coming soon</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
