import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAuthStore()
  
  if (!token) {
    return <Navigate to="/auth" replace />
  }

  return children
}