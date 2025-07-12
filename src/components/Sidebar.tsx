import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Package, 
  Star, 
  Repeat, 
  User, 
  Plus, 
  LogOut, 
  Recycle,
  Settings
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Package, label: 'My Items', path: '/dashboard/items' },
    { icon: Star, label: 'Points Balance', path: '/dashboard/points' },
    { icon: Repeat, label: 'Swaps', path: '/dashboard/swaps' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Recycle className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{user.name}</p>
                <p className="text-xs md:text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 md:mt-4 bg-green-50 rounded-lg p-2 md:p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-gray-600">Points Balance</span>
                <span className="font-bold text-green-600 text-sm md:text-base">{user.points}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-green-50 text-green-600 border-r-2 border-green-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Link
              to="/add-item"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Add New Item</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Link
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Settings</span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}