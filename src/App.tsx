import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DashboardItems from './components/DashboardItems';
import DashboardPoints from './components/DashboardPoints';
import DashboardSwaps from './components/DashboardSwaps';
import DashboardProfile from './components/DashboardProfile';
import AddItem from './components/AddItem';
import ItemDetail from './components/ItemDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/items" element={<DashboardItems />} />
            <Route path="/dashboard/points" element={<DashboardPoints />} />
            <Route path="/dashboard/swaps" element={<DashboardSwaps />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;