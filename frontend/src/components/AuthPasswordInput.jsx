import { useState } from "react"
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react"

function AuthPasswordInput({
  value,
  onChange,
  hasError = false,
  placeholder = "Enter your password",
  autoComplete = "current-password",
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <LockIcon className="auth-input-icon" />
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={`input auth-password-input ${
          hasError ? "border-prsRed/70 focus:ring-prsRed/50" : ""
        }`}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="auth-password-toggle"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOffIcon className="size-4 sm:size-[18px]" />
        ) : (
          <EyeIcon className="size-4 sm:size-[18px]" />
        )}
      </button>
    </div>
  )
}

export default AuthPasswordInput
