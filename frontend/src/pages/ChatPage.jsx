import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore.js";

import BorderUnanimatedContainer from "../components/BorderUnanimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const socket = useAuthStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (message) => {
      useChatStore.getState().addIncomingMessage(message)
    }

    socket.on("newMessage", handleNewMessage)
    return () => socket.off("newMessage", handleNewMessage)
  }, [socket])

  return (
    <div className="relative w-full max-w-6xl h-auto max-h-[calc(100dvh-2rem)] md:max-h-none md:h-[650px]">
      <BorderUnanimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderUnanimatedContainer>
    </div>
  );
}
export default ChatPage;
