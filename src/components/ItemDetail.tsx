import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemsContext';
import Avatar from './Avatar';
import { 
  Heart, 
  Share2, 
  Flag, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  User,
  MessageCircle,
  Recycle
} from 'lucide-react';

const mockItem = {
  id: 1,
  title: 'Vintage Denim Jacket',
  description: 'Beautiful vintage denim jacket from the 90s. Slightly oversized fit, perfect for layering. Has some minor fading which adds to the vintage charm. No tears or stains.',
  images: [
    'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2',
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2'
  ],
  points: 25,
  condition: 'Good',
  category: 'Outerwear',
  size: 'M',
  tags: ['vintage', 'denim', 'casual', '90s'],
  uploader: {
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 4.8,
    totalSwaps: 12,
    location: 'San Francisco, CA'
  },
  uploadedAt: '2 days ago',
  views: 23,
  likes: 8,
  isLiked: false
};

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(mockItem.isLiked);
  const [isInWishlist, setIsInWishlist] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view item details</h2>
          <Link to="/auth" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (!isInWishlist) {
      alert('Added to wishlist!');
    } else {
      alert('Removed from wishlist!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                <Star className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" onClick={() => alert('Share item!')}>
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" onClick={() => alert('Flag item!')}>
                <Flag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pt-20 md:pt-24">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-3 md:space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={mockItem.images[selectedImage]}
                alt={mockItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {mockItem.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-green-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockItem.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">{mockItem.title}</h1>
                <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{mockItem.likes}</span>
                  </span>
                  <span>{mockItem.views} views</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                <span className="text-xl md:text-2xl font-bold text-green-600">{mockItem.points} points</span>
                <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {mockItem.condition}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  Size {mockItem.size}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {mockItem.tags.map((tag) => (
                  <span key={tag} className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Description</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{mockItem.description}</p>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Category</h4>
                <p className="text-gray-600 text-sm md:text-base">{mockItem.category}</p>
              </div>
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Posted</h4>
                <p className="text-gray-600 flex items-center text-sm md:text-base">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {mockItem.uploadedAt}
                </p>
              </div>
            </div>

            {/* Uploader Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Listed by</h3>
                <button className="text-green-600 hover:text-green-700 text-xs md:text-sm font-medium" onClick={() => alert('View profile!')}>
                  View Profile
                </button>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4">
                <Avatar
                  src={mockItem.uploader.avatar}
                  alt={mockItem.uploader.name}
                  size="lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{mockItem.uploader.name}</h4>
                  <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
                      <span>{mockItem.uploader.rating}</span>
                    </div>
                    <span>{mockItem.uploader.totalSwaps} swaps</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {mockItem.uploader.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 md:space-y-3">
              <button className="w-full bg-green-500 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-green-600 transition-colors flex items-center justify-center" onClick={() => alert('Request swap!')}>
                <Recycle className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                Request Swap
              </button>
              
              {user.points >= mockItem.points ? (
                <button className="w-full bg-blue-500 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-600 transition-colors flex items-center justify-center" onClick={() => alert('Redeem with points!')}>
                  <Star className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Redeem with Points ({mockItem.points})
                </button>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-500 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg cursor-not-allowed">
                  Insufficient Points (Need {mockItem.points - user.points} more)
                </button>
              )}
              
              <button className="w-full bg-gray-200 text-gray-700 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-gray-300 transition-colors flex items-center justify-center" onClick={() => alert('Message seller!')}>
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                Message Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}