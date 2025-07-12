import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DashboardItems from './components/DashboardItems';
import DashboardWishlist from './components/DashboardWishlist';
import DashboardPoints from './components/DashboardPoints';
import DashboardSwaps from './components/DashboardSwaps';
import DashboardProfile from './components/DashboardProfile';
import Store from './components/Store';
import AddItem from './components/AddItem';
import ItemDetail from './components/ItemDetail';
import AuthForm from './components/AuthForm';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { ItemsProvider } from './context/ItemsContext';
import './firebase'; // Initialize Firebase

function App() {
  return (
    <AuthProvider>
      <ItemsProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/items" element={<DashboardItems />} />
              <Route path="/dashboard/wishlist" element={<DashboardWishlist />} />
              <Route path="/dashboard/points" element={<DashboardPoints />} />
              <Route path="/dashboard/swaps" element={<DashboardSwaps />} />
              <Route path="/dashboard/profile" element={<DashboardProfile />} />
              <Route path="/store" element={<Store />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/signup" element={<AuthForm />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </Router>
      </ItemsProvider>
    </AuthProvider>
  );
}

export default App;