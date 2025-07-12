import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { Edit, Trash2, Eye, Star, Clock, CheckCircle, ShoppingBag, TrendingUp, Award, Plus } from 'lucide-react';
import { NoItemsEmptyState } from './EmptyState';

const mockItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'available',
    points: 25,
    views: 12,
    likes: 3,
    category: 'Outerwear'
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'pending',
    points: 30,
    views: 8,
    likes: 5,
    category: 'Dresses'
  },
  {
    id: 3,
    title: 'Cozy Wool Sweater',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'swapped',
    points: 35,
    views: 24,
    likes: 8,
    category: 'Sweaters'
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-items');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Please log in to access your dashboard</h2>
          <Link to="/auth" className="btn-primary px-8 py-4 text-lg">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'swapped':
        return <Award className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'pending':
        return 'status-pending';
      case 'swapped':
        return 'status-swapped';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-6 md:p-8 pt-20 md:pt-8">
          {/* Header */}
          <div className="mb-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Welcome back, {user.name}! 👋</h1>
                <p className="text-lg text-gray-600">Manage your items and track your swapping activity</p>
              </div>
              <Link to="/store" className="btn-primary px-6 py-3 text-base flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Browse Store
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Items</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockItems.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Points Balance</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">{user.points}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Successful Swaps</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">8</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Views</p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-600">44</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* My Items Section */}
          <div className="card animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Items</h2>
                <Link to="/add-item" className="btn-primary px-4 py-2 text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {mockItems.length === 0 ? (
                <NoItemsEmptyState onAddItem={() => window.location.href = '/add-item'} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockItems.map((item, index) => (
                    <div key={item.id} className="card card-hover overflow-hidden animate-fadeIn" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="badge badge-primary">{item.category}</span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className={`badge ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-green-600 font-bold text-lg">{item.points} points</span>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{item.views}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-4 w-4" />
                              <span>{item.likes}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link to={`/item/${item.id}`} className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-200 transition-colors">
                            View
                          </Link>
                          <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center" onClick={() => alert(`Edit item: ${item.title}`)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors" onClick={() => alert(`Delete item: ${item.title}`)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}