import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router"
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useAuthStore } from './store/useAuthStore.js'
import { useChatStore } from './store/useChatStore.js'
import PageLoader from './components/PageLoader.jsx'
import { Toaster } from "react-hot-toast"

const authedChat = (authUser) => (authUser ? <ChatPage /> : <Navigate to="/login" replace />)


function App() {

    const {checkAuth, isCheckingAuth, authUser} = useAuthStore()

    useEffect(() => {
      checkAuth()
    }, [checkAuth])

    useEffect(() => {
      if (!authUser) {
        useChatStore.setState({ selectedUser: null, messages: [] })
      }
    }, [authUser])

    if(isCheckingAuth) return <PageLoader />


  return (
    <div className='h-dvh w-full bg-slate-900 relative flex flex-col overflow-hidden'>

      <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]' />
      <div className='absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]' />
      <div className='absolute bottom-0 right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]' />

      <div className='relative z-10 flex-1 min-h-0 w-full'>
        <Routes>
          <Route path="/" element={authedChat(authUser)} />
          <Route path="/chat/:userId" element={authedChat(authUser)} />
          <Route path="/settings" element={authedChat(authUser)} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" replace />} />
        </Routes>
      </div>

      <Toaster position='top-right' />

    </div>
  )
}

export default App
