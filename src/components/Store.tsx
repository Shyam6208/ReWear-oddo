import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemsContext';
import Sidebar from './Sidebar';
import { Search, Filter, Heart, Star, MapPin, Clock, ShoppingBag, Grid, List } from 'lucide-react';

const mockStoreItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 25,
    condition: 'Excellent',
    category: 'Outerwear',
    seller: 'Emma Wilson',
    sellerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'New York, NY',
    postedDate: '2 days ago',
    isLiked: false
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 30,
    condition: 'Good',
    category: 'Dresses',
    seller: 'Mike Johnson',
    sellerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'Los Angeles, CA',
    postedDate: '1 day ago',
    isLiked: true
  },
  {
    id: 3,
    title: 'Cozy Wool Sweater',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 35,
    condition: 'Like New',
    category: 'Tops',
    seller: 'Sarah Davis',
    sellerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'Chicago, IL',
    postedDate: '3 days ago',
    isLiked: false
  },
  {
    id: 4,
    title: 'Classic White Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 20,
    condition: 'Good',
    category: 'Shoes',
    seller: 'Alex Brown',
    sellerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'Miami, FL',
    postedDate: '5 days ago',
    isLiked: false
  },
  {
    id: 5,
    title: 'Leather Handbag',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 40,
    condition: 'Excellent',
    category: 'Accessories',
    seller: 'Lisa Chen',
    sellerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'San Francisco, CA',
    postedDate: '1 week ago',
    isLiked: true
  },
  {
    id: 6,
    title: 'High-Waisted Jeans',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    points: 28,
    condition: 'Good',
    category: 'Bottoms',
    seller: 'David Wilson',
    sellerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    location: 'Austin, TX',
    postedDate: '4 days ago',
    isLiked: false
  }
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories', 'Activewear'];
const conditions = ['All', 'New', 'Like New', 'Excellent', 'Good', 'Fair'];
const sortOptions = ['Newest', 'Oldest', 'Lowest Points', 'Highest Points', 'Best Condition'];

export default function Store() {
  const { user } = useAuth();
  const { items: allItems, likeItem, unlikeItem } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [viewMode, setViewMode] = useState('grid');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to browse the store</h2>
          <Link to="/auth" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const toggleLike = (itemId: string) => {
    const item = allItems.find(item => item.id === itemId);
    if (item) {
      if (item.isLiked) {
        unlikeItem(itemId);
      } else {
        likeItem(itemId);
      }
    }
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

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploader.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'Oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'Lowest Points':
        return a.points - b.points;
      case 'Highest Points':
        return b.points - a.points;
      case 'Best Condition':
        const conditionOrder = { 'new': 5, 'like-new': 4, 'excellent': 3, 'good': 2, 'fair': 1 };
        return conditionOrder[b.condition] - conditionOrder[a.condition];
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Store</h1>
            <p className="text-sm md:text-base text-gray-600">Browse and discover items available for swapping</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items or sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Condition Filter */}
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {sortedItems.length} items found
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Items Grid/List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Available Items</h2>
            </div>
            <div className="p-4 md:p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {sortedItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                            item.isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={item.uploader.avatar}
                            alt={item.uploader.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-gray-600">{item.uploader.name}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-600 font-bold text-sm md:text-base">{item.points} points</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views} views
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex space-x-1 md:space-x-2">
                          <Link to={`/item/${item.id}`} className="flex-1 bg-gray-200 text-gray-700 px-2 md:px-3 py-2 rounded-lg text-center text-xs md:text-sm hover:bg-gray-300 transition-colors">
                            View
                          </Link>
                          <button className="flex-1 bg-green-500 text-white px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-green-600 transition-colors flex items-center justify-center">
                            <ShoppingBag className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            Swap
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedItems.map((item) => (
                    <div key={item.id} className="flex bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="w-32 h-32 md:w-40 md:h-40 relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                            item.isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1">{item.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <img
                                src={item.uploader.avatar}
                                alt={item.uploader.name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span>{item.uploader.name}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {item.views} views
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-green-600 font-bold text-lg">{item.points} points</span>
                            <div className="mt-1">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getConditionColor(item.condition)}`}>
                                {item.condition}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(item.uploadedAt).toLocaleDateString()}
                            </span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Link to={`/item/${item.id}`} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                              View Details
                            </Link>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center">
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Request Swap
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Empty State */}
          {sortedItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to find more items.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedCondition('All');
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 