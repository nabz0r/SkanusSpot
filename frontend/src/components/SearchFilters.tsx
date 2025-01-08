import { useRestaurantStore } from '../store/restaurants'

export function SearchFilters() {
  const { filters, setFilters } = useRestaurantStore()

  const dietaryOptions = [
    { id: 'halal', label: 'Halal', icon: '🌮' },
    { id: 'kosher', label: 'Kosher', icon: '✡️' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' }
  ]

  const toggleDietary = (option: string) => {
    const current = filters.dietary
    const updated = current.includes(option)
      ? current.filter(x => x !== option)
      : [...current, option]
    setFilters({ dietary: updated })
  }

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search restaurants..."
        className="w-full p-2 border rounded"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <div className="flex flex-wrap gap-2">
        {dietaryOptions.map(option => (
          <button
            key={option.id}
            onClick={() => toggleDietary(option.id)}
            className={`px-3 py-1 rounded-full border transition ${filters.dietary.includes(option.id) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}