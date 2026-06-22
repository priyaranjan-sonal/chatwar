import { InfoIcon } from "lucide-react"
import { AUTH_GUIDE } from "../library/authGuide.js"

function AuthValidationGuide({ variant = "signup" }) {
  if (variant === "login") {
    return (
      <div className="auth-validation-guide">
        <div className="flex items-start gap-1.5">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-prsSky" />
          <p className="text-[11px] leading-snug text-prsSilver">
            {AUTH_GUIDE.login.tip}
          </p>
        </div>
      </div>
    )
  }

  const guide = AUTH_GUIDE.signup

  return (
    <div className="auth-validation-guide">
      <div className="flex items-start gap-1.5">
        <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-prsSky" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-prsSnow">{guide.title}</p>
          <ul className="mt-1 space-y-0.5">
            {guide.rules.map((rule) => (
              <li key={rule.field} className="text-[11px] leading-snug text-prsSilver">
                <span className="font-bold text-prsGray">{rule.label}:</span> {rule.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AuthValidationGuide
