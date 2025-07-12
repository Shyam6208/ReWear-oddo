import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemsContext';
import Sidebar from './Sidebar';
import { Edit, Trash2, Eye, Star, Clock, CheckCircle, Plus } from 'lucide-react';

const mockItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'available',
    points: 25,
    views: 12,
    likes: 3
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'pending',
    points: 30,
    views: 8,
    likes: 5
  },
  {
    id: 3,
    title: 'Cozy Wool Sweater',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    status: 'swapped',
    points: 35,
    views: 24,
    likes: 8
  }
];

export default function DashboardItems() {
  const { user } = useAuth();
  const { getUserItems, deleteItem } = useItems();
  const userItems = user ? getUserItems(user.id) : [];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your items</h2>
          <Link to="/auth" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
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
        return <Star className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'swapped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Items</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your listed items and track their performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Items</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{userItems.length}</p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <Eye className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Available</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {userItems.filter(item => item.status === 'available').length}
                  </p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Pending</p>
                  <p className="text-xl md:text-2xl font-bold text-yellow-600">
                    {userItems.filter(item => item.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-2 md:p-3 rounded-full">
                  <Clock className="h-4 w-4 md:h-6 md:w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Swapped</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {userItems.filter(item => item.status === 'swapped').length}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                  <Star className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">All Items</h2>
                <Link to="/add-item" className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Link>
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              {userItems.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No items yet</h3>
                  <p className="text-gray-600 mb-6">Start by adding your first item to the community!</p>
                  <Link to="/add-item" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Item
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {userItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-600 font-bold text-sm md:text-base">{item.points} points</span>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            <span className="capitalize">{item.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs md:text-sm">{item.views} views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs md:text-sm">{item.likes} likes</span>
                          </span>
                        </div>
                        <div className="flex space-x-1 md:space-x-2">
                          <Link to={`/item/${item.id}`} className="flex-1 bg-gray-200 text-gray-700 px-2 md:px-3 py-2 rounded-lg text-center text-xs md:text-sm hover:bg-gray-300 transition-colors">
                            View
                          </Link>
                          <button className="flex-1 bg-blue-500 text-white px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-blue-600 transition-colors flex items-center justify-center" onClick={() => alert(`Edit item: ${item.title}`)}>
                            <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            Edit
                          </button>
                          <button 
                            className="bg-red-500 text-white px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-red-600 transition-colors" 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                                deleteItem(item.id);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
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