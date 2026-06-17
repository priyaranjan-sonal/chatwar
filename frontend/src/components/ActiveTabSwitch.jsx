import React from 'react'
import { useChatStore } from '../store/useChatStore.js'

function ActiveTabSwitch() {

  const {activeTab, setActiveTab} = useChatStore()

  return (
    <div className='grid grid-cols-2 gap-2 m-1 p-1'>
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab w-full py-2 rounded-xl ${
          activeTab === "chats" ? "bg-cyan-600/50 text-cyan-100" : "text-slate-300"
        }`}
      >Chats</button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab w-full py-2 rounded-xl ${
          activeTab === "contacts" ? "bg-cyan-600/50 text-cyan-100" : "text-slate-300"
        }`}
      >Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
