import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Avatar from './Avatar';
import { Heart, Trash2, Eye, Star, Clock, CheckCircle, Plus, ShoppingBag } from 'lucide-react';

const mockWishlistItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 25,
    condition: 'Excellent',
    addedDate: '2024-01-15',
    isAvailable: true,
    seller: 'Emma Wilson',
    sellerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 30,
    condition: 'Good',
    addedDate: '2024-01-12',
    isAvailable: true,
    seller: 'Mike Johnson',
    sellerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: 3,
    title: 'Cozy Wool Sweater',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 35,
    condition: 'Like New',
    addedDate: '2024-01-10',
    isAvailable: false,
    seller: 'Sarah Davis',
    sellerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: 4,
    title: 'Classic White Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 20,
    condition: 'Good',
    addedDate: '2024-01-08',
    isAvailable: true,
    seller: 'Alex Brown',
    sellerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  }
];

export default function DashboardWishlist() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your wishlist</h2>
        </div>
      </div>
    );
  }

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-800';
      case 'Like New':
        return 'bg-blue-100 text-blue-800';
      case 'Excellent':
        return 'bg-purple-100 text-purple-800';
      case 'Good':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fair':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const availableItems = wishlistItems.filter(item => item.isAvailable);
  const unavailableItems = wishlistItems.filter(item => !item.isAvailable);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-sm md:text-base text-gray-600">Save items you're interested in swapping for</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Items</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                </div>
                <div className="bg-red-100 p-2 md:p-3 rounded-full">
                  <Heart className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Available</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{availableItems.length}</p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Unavailable</p>
                  <p className="text-xl md:text-2xl font-bold text-yellow-600">{unavailableItems.length}</p>
                </div>
                <div className="bg-yellow-100 p-2 md:p-3 rounded-full">
                  <Clock className="h-4 w-4 md:h-6 md:w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Value</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600">
                    {wishlistItems.reduce((sum, item) => sum + item.points, 0)} pts
                  </p>
                </div>
                <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                  <Star className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Available Items */}
          {availableItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm mb-6 md:mb-8">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Available Items</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {availableItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar
                            src={item.sellerAvatar}
                            alt={item.seller}
                            size="sm"
                          />
                          <span className="text-xs text-gray-600">{item.seller}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-600 font-bold text-sm md:text-base">{item.points} points</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>Added {item.addedDate}</span>
                        </div>
                        <div className="flex space-x-1 md:space-x-2">
                          <Link to={`/item/${item.id}`} className="flex-1 bg-gray-200 text-gray-700 px-2 md:px-3 py-2 rounded-lg text-center text-xs md:text-sm hover:bg-gray-300 transition-colors">
                            View
                          </Link>
                          <button className="flex-1 bg-green-500 text-white px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-green-600 transition-colors flex items-center justify-center">
                            <ShoppingBag className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            Request Swap
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Unavailable Items */}
          {unavailableItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm mb-6 md:mb-8">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Unavailable Items</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {unavailableItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow opacity-60">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">Unavailable</span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar
                            src={item.sellerAvatar}
                            alt={item.seller}
                            size="sm"
                          />
                          <span className="text-xs text-gray-600">{item.seller}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-600 font-bold text-sm md:text-base">{item.points} points</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>Added {item.addedDate}</span>
                        </div>
                        <button className="w-full bg-gray-300 text-gray-500 px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm cursor-not-allowed">
                          Item Unavailable
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start browsing items and add them to your wishlist to keep track of what you want to swap for.</p>
              <Link to="/dashboard" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Browse Items
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 