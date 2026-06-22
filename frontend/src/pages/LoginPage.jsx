import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import { MessageCircleIcon, AtSignIcon, LoaderIcon } from 'lucide-react'
import { Link } from "react-router"
import {
  normalizeUsername,
  getLoginFieldErrors,
  hasFieldErrors,
} from "../library/authValidation.js"
import AuthValidationGuide from "../components/AuthValidationGuide.jsx"
import AuthPasswordInput from "../components/AuthPasswordInput.jsx"
import AuthBrandTitle from "../components/AuthBrandTitle.jsx"

function FieldError({ message }) {
  if (!message) return null
  return <p className="auth-field-error">{message}</p>
}

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" })
  const { login, isLoggingIn } = useAuthStore()

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = getLoginFieldErrors(formData)
    setFieldErrors(errors)
    if (hasFieldErrors(errors)) return

    login({
      username: normalizeUsername(formData.username),
      password: formData.password,
    })
  }

  return (
    <div className="h-full w-full">
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden app-gradient-bg">
        <div className="flex min-h-0 flex-1 w-full md:grid md:grid-cols-[3fr_2fr] md:h-full">

          <div className="auth-hero-panel">
            <div className="auth-hero-inner">
              <img
                src="/login.png"
                alt="People using mobile devices"
                className="auth-hero-image"
              />
              <div className="auth-hero-copy">
                <h3 className="auth-hero-title">
                  Connect Anytime, Anywhere{" "}
                  <span className="auth-hero-accent">through</span>{" "}
                  <span className="text-prsWhite">Chat</span>
                  <span className="text-prsRed">War</span>
                </h3>
                <div className="auth-hero-badges">
                  <span className="auth-badge">Secure</span>
                  <span className="auth-badge">Fast</span>
                  <span className="auth-badge">Reliable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-form-panel md:border-l md:border-prsSlate">
            <div className="auth-form-inner">
              <div className="auth-page-header">
                <AuthBrandTitle />
                <div className="auth-page-title-row">
                  <MessageCircleIcon className="size-9 shrink-0 text-prsSilver" />
                  <h2 className="text-xl font-bold text-prsSnow">Welcome Back</h2>
                </div>
              </div>

              <AuthValidationGuide variant="login" />

              <form onSubmit={handleSubmit} noValidate className="auth-form">
                <div>
                  <label className="auth-input-label">Username</label>
                  <div className="relative">
                    <AtSignIcon className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className={`input ${fieldErrors.username ? "border-prsRed/70 focus:ring-prsRed/50" : ""}`}
                      placeholder="john_doe"
                      autoComplete="username"
                    />
                  </div>
                  <FieldError message={fieldErrors.username} />
                </div>

                <div>
                  <label className="auth-input-label">Password</label>
                  <AuthPasswordInput
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    hasError={Boolean(fieldErrors.password)}
                    autoComplete="current-password"
                  />
                  <FieldError message={fieldErrors.password} />
                </div>

                <div className="auth-submit">
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="mx-auto size-5 animate-spin" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </form>

              <div className="auth-footer">
                New to ChatWar?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-prsSky transition-colors hover:text-prsBlue hover:underline"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
