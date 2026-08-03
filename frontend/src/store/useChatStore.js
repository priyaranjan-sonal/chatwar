import { create } from "zustand"
import { axiosInstance } from "../library/axios.js"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore.js"
import { playMessageNotification } from "../library/notificationSound.js"

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    superAdminMode: false,
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
    theme: localStorage.getItem("chatwar-theme") || "dark",


    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setTheme: (theme) => {
        localStorage.setItem("chatwar-theme", theme)
        set({ theme })
    },

    setActiveTab: (tab) => set({activeTab: tab, superAdminMode: false}),

    setSuperAdminMode: (mode) => set({superAdminMode: mode}),

    resetState: () => set({
        allContacts: [],
        chats: [],
        messages: [],
        activeTab: "chats",
        superAdminMode: false,
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading: false,
        isSendingMessage: false,
    }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/api/messages/contacts")
            set({ allContacts: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/api/messages/chats")
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessagesByUserId: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/api/messages/${userId}`)
            set({messages: res.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while loading messages")
            console.log("Get messages error: ", error)
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        if (!selectedUser) return false

        set({ isSendingMessage: true })

        const { authUser } = useAuthStore.getState()
        const tempId = `temp-${Date.now()}`

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true
        }
        set({ messages: [...messages, optimisticMessage] })
        try {
            const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`, messageData)
            set({
                messages: get().messages
                    .filter((msg) => msg._id !== tempId)
                    .concat(res.data),
            })
            return true
        } catch (error) {
            set({ messages: get().messages.filter((msg) => msg._id !== tempId) })
            toast.error(error.response?.data?.message || "Something went wrong while sending your message")
            return false
        } finally {
            set({ isSendingMessage: false })
        }
    },

    addIncomingMessage: (message) => {
        const { selectedUser, messages, isSoundEnabled } = get()
        const { authUser } = useAuthStore.getState()
        if (!authUser) return

        playMessageNotification(message, authUser, isSoundEnabled)

        if (!selectedUser) return

        const partnerId = selectedUser._id.toString()
        const myId = authUser._id.toString()
        const senderId = message.senderId.toString()
        const receiverId = message.receiverId.toString()

        const isForActiveChat =
            (senderId === partnerId && receiverId === myId) ||
            (senderId === myId && receiverId === partnerId)

        if (!isForActiveChat || messages.some((m) => m._id === message._id)) return

        set({ messages: [...messages, message] })
    },

}))