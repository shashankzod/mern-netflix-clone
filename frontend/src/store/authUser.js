import axios from 'axios'
import toast from 'react-hot-toast'
import {create}  from 'zustand'

export const useAuthStore = create((set)=>({
    user: null,
    isSigningUp : false,
    isAuthChecking: true,
    isLoggingOut : false,
    isLoggingIn: false,
    signup: async(credentials)=>{
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({user: response.data.user, isSigningUp: false})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "SIgnup failed")
            set({isSigningUp: false, user: null})
        }
    },
    login: async(credentials)=>{
        set({isLoggingIn: true})
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)
            set({user: response.data.user, isLoggingIn: false})
            toast.success("Logged in successfully")
        } catch (error) {
            set({isLoggingIn: false , user: null})
            toast.error(error.response.data.message || "Login failed")
        }
    },
    logout: async()=>{
        set({isLoggingOut: true})
        try {
            await axios.post("/api/v1/auth/logout")
            set({user: null, isLoggingOut: false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({isLoggingOut: false})
            toast.error(error.response.data.message || "Logout Failed")
        }
    },
    authCheck: async()=>{
        set({isAuthChecking: true})
        try {
            const response = await axios.get("/api/v1/auth/authcheck")
            set({user: response.data.user, isAuthChecking
            : false})
        } catch (error) {
            set({isAuthChecking: false, user: null})
            // toast.error(error.response.data.message || "An error occurred")
        }
    },
}))