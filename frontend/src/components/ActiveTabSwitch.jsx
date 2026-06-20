import React from 'react'
import { useChatStore } from '../store/useChatStore.js'

function ActiveTabSwitch() {

  const {activeTab, setActiveTab} = useChatStore()

  return (
    <div className="grid grid-cols-2 gap-2 px-4 py-3 shrink-0">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none ${
          activeTab === "chats" ? "bg-cyan-600/50 text-cyan-100" : "text-slate-300"
        }`}
      >Chats</button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex w-full items-center justify-center rounded-xl py-2.5 leading-none ${
          activeTab === "contacts" ? "bg-cyan-600/50 text-cyan-100" : "text-slate-300"
        }`}
      >Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
