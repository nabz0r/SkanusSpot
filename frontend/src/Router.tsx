import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Restaurant from './pages/Restaurant'
import ProtectedRoute from './components/ProtectedRoute'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/restaurant/:id" element={
        <ProtectedRoute>
          <Restaurant />
        </ProtectedRoute>
      } />
    </Routes>
  )
}