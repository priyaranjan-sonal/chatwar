import { create } from "zustand"
import { axiosInstance } from "../library/axios.js"
import toast from "react-hot-toast"

const getErrorMessage = (error, fallback = "Something went wrong") =>
    error.response?.data?.message || fallback

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in authCheck: ", error)
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/api/auth/signup", data)
            set({ authUser: res.data.user })

            if (res.data.emailInfo) {
                console.log("Welcome email status:", res.data.emailInfo)
            }

            toast.success("Account created Successfully!")
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
    }
}))