import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx"
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from 'lucide-react'
import { Link } from "react-router"

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className='relative z-10 w-full flex items-center justify-center px-3 py-4 sm:px-4'>
      <div className='relative w-full max-w-6xl h-auto max-h-[calc(100dvh-2rem)] md:max-h-none md:h-[650px]'>
        <BorderAnimatedContainer>
          <div className='flex-1 min-h-0 w-full h-auto md:h-full grid md:grid-cols-2 p-2'>

            {/* IMAGE  -- LEFT SIDE */}
            <div className='hidden md:flex h-full min-h-0 flex-col items-center justify-center md:border-r md:border-slate-700 p-4 lg:p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>
              <div className='flex flex-col items-center justify-center -translate-y-5'>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className='max-h-[340px] lg:max-h-[420px] w-auto mx-auto object-contain'
                />
                <div className='mt-4 lg:mt-6 text-center'>
                  <h3 className='text-lg lg:text-xl font-medium text-cyan-400'>Connect Anytime, Anywhere</h3>
                  <div className='mt-3 lg:mt-4 flex flex-wrap justify-center gap-3 lg:gap-5'>
                    <span className='auth-badge'>Secure</span>
                    <span className='auth-badge'>Fast</span>
                    <span className='auth-badge'>Reliable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM COLUMN  -- RIGHT SIDE */}
            <div className='h-auto md:h-full min-h-0 p-4 sm:p-6 md:p-8 flex items-center justify-center md:border-l md:border-slate-700 overflow-y-auto md:overflow-visible'>
              <div className='w-full max-w-md py-2 sm:py-0'>
                <div className='text-center mb-4 sm:mb-6'>
                  <MessageCircleIcon className='w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-400 mb-3 sm:mb-4' />
                  <h2 className='text-xl sm:text-2xl font-bold text-slate-200 mb-2'>Welcome Back</h2>
                  <p className='text-sm sm:text-base text-slate-400'>Login to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className='relative'>
                      <MailIcon className='auth-input-icon' />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='input'
                        placeholder='john@gmail.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className='relative'>
                      <LockIcon className='auth-input-icon' />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='input'
                        placeholder='Enter your password'
                      />
                    </div>
                  </div>

                  <div className='pt-3 sm:pt-3'>
                    <button
                      className='auth-btn'
                      type='submit'
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn ? (
                        <LoaderIcon className='w-full h-5 animate-spin text-center' />
                      ) : (
                        "Log In"
                      )}
                    </button>
                  </div>
                </form>

                <div className='mt-4 sm:mt-5 text-center text-sm sm:text-base'>
                  New to ChatWar?{" "}
                  <Link
                    to="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
                  >
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}

export default LoginPage
