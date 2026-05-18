import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ContactPage from '../pages/ContactPage'
import FavoritesPage from '../pages/FavoritesPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import PropertiesPage from '../pages/PropertiesPage'
import PropertyDetailPage from '../pages/PropertyDetailPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import AdminInquiriesPage from '../pages/AdminInquiriesPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRouter() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <AdminInquiriesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRouter
