import React from 'react'
import { useChatStore } from "../store/useChatStore.js"
import { XIcon } from "lucide-react"
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatNavigation } from '../context/ChatNavigationContext.jsx'


function ChatHeader() {

    const { selectedUser } = useChatStore()
    const { closeChat } = useChatNavigation()
    const { onlineUsers } = useAuthStore()
    const isOnline = onlineUsers.includes(selectedUser._id)

  return (
    <div className="panel-header">
      <div className='flex items-center gap-2.5 min-w-0'>
        <div className={`avatar size-10 ${isOnline ? "avatar-online" : "avatar-offline"}`}>
          <div className='size-10 rounded-full overflow-hidden'>
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className='text-slate-200 font-medium text-sm truncate'>{selectedUser?.fullName}</h3>
          <p className='text-slate-400 text-xs'>{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button type="button" onClick={closeChat} className='shrink-0 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors rounded-lg'>
        <XIcon className='size-5 transition-colors cursor-pointer'/>
      </button>
    </div>
  )
}

export default ChatHeader
