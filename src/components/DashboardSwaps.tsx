import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { Repeat, Clock, CheckCircle, X, MessageCircle, MapPin, Calendar } from 'lucide-react';

const mockSwaps = [
  {
    id: 1,
    type: 'outgoing',
    status: 'completed',
    myItem: 'Vintage Denim Jacket',
    theirItem: 'Summer Floral Dress',
    otherUser: 'Emma Wilson',
    otherUserAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    date: '2024-01-15',
    location: 'New York, NY'
  },
  {
    id: 2,
    type: 'incoming',
    status: 'pending',
    myItem: 'Cozy Wool Sweater',
    theirItem: 'Classic White Sneakers',
    otherUser: 'Mike Johnson',
    otherUserAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    date: '2024-01-12',
    location: 'Los Angeles, CA'
  },
  {
    id: 3,
    type: 'outgoing',
    status: 'completed',
    myItem: 'Leather Handbag',
    theirItem: 'Designer Sunglasses',
    otherUser: 'Sarah Davis',
    otherUserAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    date: '2024-01-08',
    location: 'Chicago, IL'
  }
];

export default function DashboardSwaps() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your swaps</h2>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'outgoing':
        return 'bg-blue-100 text-blue-800';
      case 'incoming':
        return 'bg-purple-100 text-purple-800';
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Swaps</h1>
            <p className="text-sm md:text-base text-gray-600">Track your swap history and manage current requests</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Swaps</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{mockSwaps.length}</p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <Repeat className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Completed</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {mockSwaps.filter(swap => swap.status === 'completed').length}
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
                    {mockSwaps.filter(swap => swap.status === 'pending').length}
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
                  <p className="text-xs md:text-sm text-gray-600">Success Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600">
                    {Math.round((mockSwaps.filter(swap => swap.status === 'completed').length / mockSwaps.length) * 100)}%
                  </p>
                </div>
                <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                  <Repeat className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Swaps List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Swap History</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {mockSwaps.map((swap) => (
                  <div key={swap.id} className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={swap.otherUserAvatar}
                          alt={swap.otherUser}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{swap.otherUser}</h3>
                          <div className="flex items-center space-x-2 text-gray-500 text-xs md:text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>{swap.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(swap.type)}`}>
                          {swap.type === 'outgoing' ? 'Outgoing' : 'Incoming'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                          {swap.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Your Item</p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">{swap.myItem}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Their Item</p>
                        <p className="font-medium text-gray-900 text-sm md:text-base">{swap.theirItem}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500 text-xs md:text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{swap.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {swap.status === 'pending' && (
                          <>
                            <button className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-green-600 transition-colors">
                              Accept
                            </button>
                            <button className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-red-600 transition-colors">
                              Decline
                            </button>
                          </>
                        )}
                        <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-gray-300 transition-colors flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 