type Props = {
  restaurant: {
    name: string
    location: { address: string }
    dietaryOptions: {
      halal: boolean
      kosher: boolean
      vegan: boolean
      vegetarian: boolean
    }
    rating: number
  }
}

export function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{restaurant.name}</h3>
      <p className="text-gray-600">{restaurant.location.address}</p>
      <div className="flex gap-2 mt-2">
        {restaurant.dietaryOptions.halal && (
          <span className="text-sm bg-green-100 px-2 py-1 rounded">🌮 Halal</span>
        )}
        {restaurant.dietaryOptions.kosher && (
          <span className="text-sm bg-blue-100 px-2 py-1 rounded">✡️ Kosher</span>
        )}
        {restaurant.dietaryOptions.vegan && (
          <span className="text-sm bg-emerald-100 px-2 py-1 rounded">🌱 Vegan</span>
        )}
        {restaurant.dietaryOptions.vegetarian && (
          <span className="text-sm bg-lime-100 px-2 py-1 rounded">🥬 Veg</span>
        )}
      </div>
      <div className="mt-2 text-yellow-500">
        {'★'.repeat(Math.round(restaurant.rating))}
      </div>
    </div>
  )
}