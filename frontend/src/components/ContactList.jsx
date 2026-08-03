import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton.jsx"
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatNavigation } from '../context/ChatNavigationContext.jsx'

function ContactList() {

  const { getAllContacts, allContacts, isUsersLoading, selectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const { openChat } = useChatNavigation()

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUsersLoading) return <UsersLoadingSkeleton />

  return (
    <div className="-mx-4 md:mx-0 md:space-y-1">
      {allContacts.map((contact) => {
        const isSelected = selectedUser && String(selectedUser._id) === String(contact._id)

        return (
        <div
          key={contact._id}
          className={`w-full px-4 py-2.5 cursor-pointer transition-colors border-b border-prsBorder md:rounded-lg md:border-b-0 ${
            isSelected ? "bg-prsBlue/20" : "hover:bg-prsBlue/10"
          }`}
          onClick={() => openChat(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <h4 className="text-prsSnow font-medium truncate">{contact.fullName}</h4>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default ContactList
