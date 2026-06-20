import React, { useEffect, useRef } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import { useAuthStore } from "../store/useAuthStore.js"
import ChatHeader from './ChatHeader.jsx'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx'
import MessageInput from "./MessageInput.jsx"
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx"
import ChatBubble from "./ChatBubble.jsx"

function ChatContainer() {

  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessagesByUserId(selectedUser._id)
  }, [selectedUser, getMessagesByUserId])

  useEffect(() => {
    if(messageEndRef.current) {
      messageEndRef.current.scrollIntoView({behaviour: "smooth"})
    }
  }, [messages])

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <ChatHeader />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="w-full space-y-3 sm:space-y-4">
            {messages.map(msg => (
              <ChatBubble
                key={msg._id}
                isOwn={String(msg.senderId) === String(authUser._id)}
                text={msg.text}
                image={msg.image}
                createdAt={msg.createdAt}
              />
            ))}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
