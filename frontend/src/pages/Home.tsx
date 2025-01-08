import { useEffect } from 'react'
import { useRestaurantStore } from '../store/restaurants'
import { SearchFilters } from '../components/SearchFilters'
import { RestaurantCard } from '../components/RestaurantCard'

export default function Home() {
  const { restaurants, loading, fetchRestaurants, filters } = useRestaurantStore()

  useEffect(() => {
    fetchRestaurants()
  }, [filters])

  return (
    <div className="space-y-6">
      <SearchFilters />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}