import { createContext, useContext, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useChatStore } from "../store/useChatStore.js"

const ChatNavigationContext = createContext(null)

const findUserById = (userId, chats, allContacts) =>
  [...chats, ...allContacts].find((user) => String(user._id) === String(userId))

export function ChatNavigationProvider({ children }) {
  const { userId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    setSelectedUser,
    chats,
    allContacts,
    isUsersLoading,
    getMyChatPartners,
    getAllContacts,
  } = useChatStore()

  useEffect(() => {
    getMyChatPartners()
    getAllContacts()
  }, [getMyChatPartners, getAllContacts])

  useEffect(() => {
    if (!userId) {
      if (useChatStore.getState().selectedUser) setSelectedUser(null)
      return
    }

    const id = String(userId)
    const current = useChatStore.getState().selectedUser
    if (current && String(current._id) === id) return

    const user = findUserById(id, chats, allContacts)
    if (user) {
      setSelectedUser(user)
      return
    }

    if (!isUsersLoading) {
      navigate("/", { replace: true })
    }
  }, [userId, chats, allContacts, isUsersLoading, navigate, setSelectedUser])

  const openChat = (user) => {
    const id = String(user._id)
    setSelectedUser(user)

    if (location.pathname !== `/chat/${id}`) {
      navigate(`/chat/${id}`)
    }
  }

  const closeChat = () => {
    setSelectedUser(null)

    if (location.pathname.startsWith("/chat/")) {
      navigate("/", { replace: true })
    }
  }

  return (
    <ChatNavigationContext.Provider value={{ openChat, closeChat }}>
      {children}
    </ChatNavigationContext.Provider>
  )
}

export function useChatNavigation() {
  const context = useContext(ChatNavigationContext)
  if (!context) {
    throw new Error("useChatNavigation must be used within ChatNavigationProvider")
  }
  return context
}
