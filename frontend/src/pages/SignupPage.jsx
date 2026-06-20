import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from 'lucide-react'
import { Link } from "react-router"

function SignupPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })
  const { signup, isSigningUp } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData)
  }

  return (
    <div className="h-full w-full">
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-[#172033] via-slate-800 to-[#172033]">
        <div className="flex min-h-0 flex-1 w-full md:grid md:grid-cols-2 md:h-full">

          {/* IMAGE -- desktop only */}
          <div className="hidden md:flex h-full min-h-0 flex-col items-center justify-center md:border-r md:border-slate-700 p-4 lg:p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div className="flex flex-col items-center justify-center -translate-y-5">
              <img
                src="/signup.png"
                alt="People using mobile devices"
                className="max-h-[340px] lg:max-h-[420px] w-auto mx-auto object-contain"
              />
              <div className="mt-4 lg:mt-6 text-center">
                <h3 className="text-lg lg:text-xl font-medium text-cyan-400">Start Your Journey Now</h3>
                <div className="mt-3 lg:mt-4 flex flex-wrap justify-center gap-3 lg:gap-5">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="flex min-h-0 flex-1 overflow-y-auto px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 md:h-full md:border-l md:border-slate-700 md:p-8 md:pb-8">
            <div className="flex w-full min-h-full items-center justify-center md:min-h-0 md:h-full">
              <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-md">
              <div className="text-center mb-6 sm:mb-8">
                <MessageCircleIcon className="w-11 h-11 sm:w-12 sm:h-12 mx-auto text-slate-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                <p className="text-sm sm:text-base text-slate-400">Sign up for a new account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="john@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="mx-auto h-5 w-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm sm:text-base text-slate-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
                >
                  Login
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
