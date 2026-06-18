import { create } from "zustand";
import { axiosInstance } from "../library/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js"


export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,


    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab) => set({activeTab: tab}),

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
        set({messages: [...messages, optimisticMessage]})
        try {
            const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
            return true
        } catch (error) {
            set({messages: messages})
            toast.error(error.response?.data?.message || "Something went wrong while sending your message")
            return false
        } finally {
            set({ isSendingMessage: false })
        }
    }


}))