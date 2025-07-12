import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { Star, TrendingUp, Gift, Award, Clock, CheckCircle } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'earned',
    amount: 25,
    description: 'Item swapped: Vintage Denim Jacket',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'spent',
    amount: -30,
    description: 'Redeemed: Summer Floral Dress',
    date: '2024-01-10',
    status: 'completed'
  },
  {
    id: 3,
    type: 'earned',
    amount: 15,
    description: 'Bonus for first swap',
    date: '2024-01-08',
    status: 'completed'
  },
  {
    id: 4,
    type: 'earned',
    amount: 20,
    description: 'Item listed: Cozy Wool Sweater',
    date: '2024-01-05',
    status: 'pending'
  }
];

export default function DashboardPoints() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your points</h2>
        </div>
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'spent':
        return <Gift className="h-4 w-4 text-blue-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Points Balance</h1>
            <p className="text-sm md:text-base text-gray-600">Track your points and see how to earn more</p>
          </div>

          {/* Points Overview */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 md:p-8 mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2">Current Balance</h2>
                <p className="text-3xl md:text-4xl font-bold text-white">{user.points} points</p>
                <p className="text-green-100 text-sm md:text-base mt-2">Keep swapping to earn more!</p>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Earned</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">285</p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">135</p>
                </div>
                <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                  <Gift className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Items Swapped</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600">8</p>
                </div>
                <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                  <Award className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* How to Earn Points */}
          <div className="bg-white rounded-xl shadow-sm mb-6 md:mb-8">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">How to Earn Points</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">List an Item</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Earn 10-50 points depending on item condition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Complete a Swap</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Earn 15-25 points for each successful swap</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">First Swap Bonus</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Get 15 bonus points for your first swap</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Weekly Activity</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Earn 5 points for weekly active participation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Transaction History</h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base">{transaction.description}</p>
                        <p className="text-gray-500 text-xs md:text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold text-sm md:text-base ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'earned' ? '+' : ''}{transaction.amount} points
                      </span>
                      {getStatusIcon(transaction.status)}
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