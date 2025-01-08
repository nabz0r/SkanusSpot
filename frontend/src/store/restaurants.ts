import { create } from 'zustand'

type Restaurant = {
  id: string
  name: string
  location: {
    coordinates: [number, number]
    address: string
  }
  dietaryOptions: {
    halal: boolean
    kosher: boolean
    vegan: boolean
    vegetarian: boolean
  }
  rating: number
}

type RestaurantState = {
  restaurants: Restaurant[]
  filters: {
    dietary: string[]
    search: string
  }
  loading: boolean
  setFilters: (filters: Partial<RestaurantState['filters']>) => void
  fetchRestaurants: () => Promise<void>
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  filters: {
    dietary: [],
    search: ''
  },
  loading: false,
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  fetchRestaurants: async () => {
    const { filters } = get()
    set({ loading: true })
    try {
      const params = new URLSearchParams()
      if (filters.dietary.length) {
        params.set('dietary', filters.dietary.join(','))
      }
      if (filters.search) {
        params.set('search', filters.search)
      }
      const res = await fetch(`/api/restaurants?${params}`)
      const data = await res.json()
      set({ restaurants: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  }
}))