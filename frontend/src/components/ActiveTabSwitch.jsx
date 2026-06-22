import React from 'react'
import { useChatStore } from '../store/useChatStore.js'

function ActiveTabSwitch() {

  const {activeTab, setActiveTab} = useChatStore()

  return (
    <div className="grid grid-cols-2 gap-2 px-4 py-3 shrink-0">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none ${
          activeTab === "chats" ? "bg-prsBlue/50 text-prsWhite" : "text-prsGray"
        }`}
      >Chats</button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none ${
          activeTab === "contacts" ? "bg-prsBlue/50 text-prsWhite" : "text-prsGray"
        }`}
      >Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
