import React, { useEffect, useMemo, useState } from 'react'
import { SearchIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js"
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton.jsx"
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatNavigation } from '../context/ChatNavigationContext.jsx'

function ContactsSearch() {

  const { getAllContacts, allContacts, isUsersLoading, selectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const { openChat } = useChatNavigation()
  const [query, setQuery] = useState("")

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allContacts.filter(
      (c) =>
        c.fullName.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q)
    )
  }, [query, allContacts])

  return (
    <div className="flex flex-col h-full">
      <div className="relative shrink-0 px-4 pt-3 pb-2">
        <SearchIcon className="absolute left-7 top-1/2 size-4 -translate-y-1/2 text-prsSilver pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or username..."
          className="w-full rounded-lg bg-prsGraphite/50 py-2.5 pl-9 pr-9 text-sm text-prsSnow outline-none placeholder:text-prsSilver transition-colors focus:ring-1 focus:ring-prsBlue/50"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 text-prsSilver transition-colors hover:bg-prsRed/20 hover:text-prsRed"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isUsersLoading ? (
          <UsersLoadingSkeleton />
        ) : query.trim() && filtered.length > 0 ? (
          <div className="-mx-4 md:mx-0 md:space-y-1">
            {filtered.map((contact) => {
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
                  <div className="min-w-0 flex-1">
                    <h4 className="text-prsSnow font-medium truncate">{contact.fullName}</h4>
                    <p className="text-xs text-prsSilver truncate">@{contact.username}</p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        ) : query.trim() && filtered.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-prsSilver">No users found</p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-prsSilver">Type to search contacts</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactsSearch
