import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import { 
  Home, 
  Package, 
  Star, 
  Repeat, 
  User, 
  Plus, 
  LogOut, 
  Recycle,
  Settings,
  Heart,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Store', path: '/store' },
    { icon: Package, label: 'My Items', path: '/dashboard/items' },
    { icon: Heart, label: 'Wishlist', path: '/dashboard/wishlist' },
    { icon: Star, label: 'Points Balance', path: '/dashboard/points' },
    { icon: Repeat, label: 'Swaps', path: '/dashboard/swaps' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  // Add admin menu item if user is admin
  const adminMenuItems = user?.isAdmin ? [
    ...menuItems,
    { icon: Settings, label: 'Admin Panel', path: '/admin' }
  ] : menuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-strong border border-gray-200 hover:shadow-xl transition-all duration-200"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-soft z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-strong transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              <div className="relative">
                <Recycle className="h-8 w-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse-slow" />
              </div>
              <span className="text-2xl font-bold text-gradient">ReWear</span>
            </Link>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="md"
                />
                <div>
                  <p className="font-bold text-gray-900 text-base">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Points Balance</span>
                  <span className="font-bold text-green-600 text-lg">{user.points}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {adminMenuItems.map((item, index) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive(item.path)
                        ? 'bg-green-50 text-green-600 border-r-2 border-green-500 shadow-soft'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <item.icon className={`h-5 w-5 transition-colors duration-200 ${
                      isActive(item.path) ? 'text-green-600' : 'group-hover:text-green-600'
                    }`} />
                    <span className="font-semibold text-base">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/add-item"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full flex items-center justify-center px-4 py-3 text-base"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Item
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <Settings className="h-5 w-5 group-hover:text-green-600 transition-colors" />
                <span className="font-semibold text-base">Settings</span>
              </Link>
              <button
                onClick={async () => {
                  try {
                    await logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="w-full flex items-center space-x-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
              >
                <LogOut className="h-5 w-5 group-hover:text-red-700 transition-colors" />
                <span className="font-semibold text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}