import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import { MessageCircleIcon, AtSignIcon, UserIcon, LoaderIcon } from 'lucide-react'
import { Link } from "react-router"
import {
  normalizeUsername,
  getSignupFieldErrors,
  hasFieldErrors,
} from "../library/authValidation.js"
import AuthValidationGuide from "../components/AuthValidationGuide.jsx"
import AuthPasswordInput from "../components/AuthPasswordInput.jsx"
import AuthBrandTitle from "../components/AuthBrandTitle.jsx"

function FieldError({ message }) {
  if (!message) return null
  return <p className="auth-field-error">{message}</p>
}

function SignupPage() {
  const [formData, setFormData] = useState({ fullName: "", username: "", password: "" })
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  })
  const { signup, isSigningUp } = useAuthStore()

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = getSignupFieldErrors(formData)
    setFieldErrors(errors)
    if (hasFieldErrors(errors)) return

    signup({
      fullName: formData.fullName.trim(),
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
                src="/signup.png"
                alt="People using mobile devices"
                className="auth-hero-image"
              />
              <div className="auth-hero-copy">
                <h3 className="auth-hero-title">
                  Start Your Journey Now{" "}
                  <span className="auth-hero-accent">with</span>{" "}
                  <span className="text-prsWhite">Chat</span>
                  <span className="text-prsRed">War</span>
                </h3>
                <div className="auth-hero-badges">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy</span>
                  <span className="auth-badge">Private</span>
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
                  <h2 className="text-xl font-bold text-prsSnow">Create Account</h2>
                </div>
              </div>

              <AuthValidationGuide variant="signup" />

              <form onSubmit={handleSubmit} noValidate className="auth-form">
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

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
                    autoComplete="new-password"
                  />
                  <FieldError message={fieldErrors.password} />
                </div>

                <div className="auth-submit">
                  <button className="auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="mx-auto size-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>

              <div className="auth-footer">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-prsSky transition-colors hover:text-prsBlue hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
