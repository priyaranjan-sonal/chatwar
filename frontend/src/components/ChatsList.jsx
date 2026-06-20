import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton.jsx"
import NoChatsFound from "../components/NoChatsFound.jsx"
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatNavigation } from '../context/ChatNavigationContext.jsx'

function ChatsList() {

  const { getMyChatPartners, chats, isUsersLoading, selectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const { openChat } = useChatNavigation()

  useEffect(() => {
    getMyChatPartners()
  }, [getMyChatPartners])

  if (isUsersLoading) return <UsersLoadingSkeleton />
  if (chats.length === 0) return <NoChatsFound />

  return (
    <div className="-mx-4 lg:mx-0 lg:space-y-1">
      {chats.map((chat) => {
        const isSelected = selectedUser && String(selectedUser._id) === String(chat._id)

        return (
        <div
          key={chat._id}
          className={`w-full px-4 py-2.5 cursor-pointer transition-colors border-b border-slate-700/30 lg:rounded-lg lg:border-b-0 hover:bg-cyan-500/10 ${
            isSelected ? "bg-cyan-500/10" : "bg-transparent"
          }`}
          onClick={() => openChat(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default ChatsList
