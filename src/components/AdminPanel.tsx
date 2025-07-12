import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Eye, 
  Flag, 
  Users, 
  Package, 
  Star,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const pendingItems = [
  {
    id: 1,
    title: 'Vintage Leather Jacket',
    uploader: 'John Doe',
    category: 'Outerwear',
    condition: 'Good',
    points: 40,
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    submittedAt: '2 hours ago'
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    uploader: 'Sarah Wilson',
    category: 'Dresses',
    condition: 'Excellent',
    points: 35,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    submittedAt: '4 hours ago'
  },
  {
    id: 3,
    title: 'Designer Handbag',
    uploader: 'Emma Brown',
    category: 'Accessories',
    condition: 'Like New',
    points: 60,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    submittedAt: '6 hours ago'
  }
];

const reportedItems = [
  {
    id: 1,
    title: 'Fake Designer Shirt',
    reporter: 'User123',
    reason: 'Counterfeit item',
    severity: 'high',
    reportedAt: '1 day ago'
  },
  {
    id: 2,
    title: 'Damaged Shoes',
    reporter: 'FashionLover',
    reason: 'Condition misrepresented',
    severity: 'medium',
    reportedAt: '2 days ago'
  }
];

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending-items');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need admin privileges to access this panel</p>
          <Link to="/login" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleApprove = (itemId: number) => {
    console.log('Approved item:', itemId);
  };

  const handleReject = (itemId: number) => {
    console.log('Rejected item:', itemId);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base">
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">Welcome, Admin</span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pt-20 md:pt-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Users</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">850</p>
                <p className="text-xs md:text-sm text-green-600">+12% this month</p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                <Users className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Items Listed</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">2,543</p>
                <p className="text-xs md:text-sm text-green-600">+8% this month</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-full">
                <Package className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Successful Swaps</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">1,287</p>
                <p className="text-xs md:text-sm text-green-600">+15% this month</p>
              </div>
              <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                <Star className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">CO₂ Saved</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">1.2M lbs</p>
                <p className="text-xs md:text-sm text-green-600">+22% this month</p>
              </div>
              <div className="bg-emerald-100 p-2 md:p-3 rounded-full">
                <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 md:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('pending-items')}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'pending-items'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">Pending Items ({pendingItems.length})</span>
                <span className="sm:hidden">Pending ({pendingItems.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'reports'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">User Reports ({reportedItems.length})</span>
                <span className="sm:hidden">Reports ({reportedItems.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'pending-items' && (
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Pending Item Approvals</h3>
                {pendingItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{item.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mt-1">
                          <span>by {item.uploader}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{item.category}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{item.condition}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="text-green-600 font-medium">{item.points} points</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Submitted {item.submittedAt}</p>
                      </div>
                      <div className="flex space-x-1 md:space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => alert(`View item: ${item.id}`)}>
                          <Eye className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                        <button onClick={() => { handleApprove(item.id); alert(`Approved item: ${item.id}`); }} className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                          <Check className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                        <button onClick={() => { handleReject(item.id); alert(`Rejected item: ${item.id}`); }} className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <X className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">User Reports</h3>
                {reportedItems.map((report, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">{report.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mt-1">
                            <span>Reported by {report.reporter}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{report.reportedAt}</span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-700 mt-1">Reason: {report.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                        <div className="flex space-x-1 md:space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => alert(`View report: ${report.id || index}`)}>
                            <Eye className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                          <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors" onClick={() => alert(`Approve report: ${report.id || index}`)}>
                            <Check className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" onClick={() => alert(`Reject report: ${report.id || index}`)}>
                            <X className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Platform Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Monthly Growth</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">New Users</span>
                        <span className="font-semibold text-green-600 text-sm md:text-base">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">Items Listed</span>
                        <span className="font-semibold text-green-600 text-sm md:text-base">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">Successful Swaps</span>
                        <span className="font-semibold text-green-600 text-sm md:text-base">+15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Top Categories</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">Tops</span>
                        <span className="font-semibold text-sm md:text-base">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">Dresses</span>
                        <span className="font-semibold text-sm md:text-base">24%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm md:text-base">Outerwear</span>
                        <span className="font-semibold text-sm md:text-base">18%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}