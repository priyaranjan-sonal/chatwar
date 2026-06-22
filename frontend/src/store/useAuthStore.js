import { create } from "zustand"
import { axiosInstance } from "../library/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"
import { BACKEND_URL } from "../api.js"

const getErrorMessage = (error, fallback = "Something went wrong") =>
    error.response?.data?.message || fallback

let socketInstance = null
let checkAuthPromise = null

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        if (checkAuthPromise) return checkAuthPromise

        checkAuthPromise = (async () => {
            try {
                const res = await axiosInstance.get("/api/auth/check")
                set({ authUser: res.data })
                get().connectSocket()
            } catch (error) {
                console.log("Error in authCheck: ", error)
                set({ authUser: null })
            } finally {
                set({ isCheckingAuth: false })
            }
        })()

        return checkAuthPromise
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/api/auth/signup", data)
            set({ authUser: res.data.user })

            toast.success("Account created Successfully!")
            get().connectSocket()
        } catch (error) {
            toast.error(getErrorMessage(error))
            console.log("Error in signup: ", error)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/api/auth/login", data)
            set({ authUser: res.data.user })

            toast.success("Logged in Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(getErrorMessage(error))
            console.log("Error in login: ", error)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/api/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
            checkAuthPromise = null
            get().disconnectSocket()
        } catch (error) {
            toast.error("Error logging out")
            console.log("Logout Error: ", error)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/api/auth/update-profile", data)
            set({ authUser: res.data.user })
            toast.success("Profile updated successfully")
            return true
        } catch (error) {
            console.log("Error in update Profile: ", error)
            toast.error(getErrorMessage(error, "Failed to update profile"))
            return false
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        if (!get().authUser || socketInstance) {
            if (socketInstance && !get().socket) set({ socket: socketInstance })
            return
        }

        socketInstance = io(BACKEND_URL, {
            withCredentials: true,
        })

        socketInstance.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })

        set({ socket: socketInstance })
    },

    disconnectSocket: () => {
        if (socketInstance) {
            socketInstance.disconnect()
            socketInstance = null
        }
        set({ socket: null, onlineUsers: [] })
    },
}))

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const { authUser } = useAuthStore.getState()
            if (authUser) {
                useAuthStore.setState({ authUser: null })
                checkAuthPromise = null
                useAuthStore.getState().disconnectSocket()
                toast.error("Your session has ended. Please log in again.")
                axiosInstance.post("/api/auth/logout").catch(() => {})
            }
        }
        return Promise.reject(error)
    }
)
