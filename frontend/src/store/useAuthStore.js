import { create } from "zustand"
import { axiosInstance } from "../library/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

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
            set({ authUser: res.data })

            if (res.data.emailInfo) {
                console.log("Welcome email status:", res.data.emailInfo)
            }

            toast.success("Account created Successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup: ", error)
        } finally {
            set({ isSigningUp: false })
        }
    }

}))