import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  email: string
  name: string
  role: string
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      login: async (email, password) => {
        set({ loading: true })
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error)
          set({ user: data.user, token: data.token, loading: false })
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },
      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user })
    }),
    { name: 'auth-storage' }
  )
)