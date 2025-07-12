import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Leaf, Users, Heart, ArrowRight, Star } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    points: 25,
    condition: 'Excellent'
  },
  {
    id: 2,
    title: 'Floral Summer Dress',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    points: 30,
    condition: 'Good'
  },
  {
    id: 3,
    title: 'Cozy Wool Sweater',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    points: 35,
    condition: 'Like New'
  },
  {
    id: 4,
    title: 'Classic White Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    points: 20,
    condition: 'Good'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-500" />
              <span className="text-xl md:text-2xl font-bold text-gray-900">ReWear</span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How it Works</a>
              <a href="#browse" className="text-gray-700 hover:text-green-600 transition-colors">Browse</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Login</Link>
              <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">Sign Up</Link>
            </nav>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium mr-4">Login</Link>
              <Link to="/signup" className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Sustainable Fashion</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-green-500">Swap.</span> Save. <span className="text-green-500">Sustain.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
              Join the community-driven clothing exchange that's revolutionizing how we think about fashion. 
              Give your clothes a second life while discovering unique pieces from others.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-2xl mx-auto">
              <Link to="/signup" className="bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
                Start Swapping
              </Link>
              <Link to="/dashboard" className="bg-white text-green-600 border-2 border-green-500 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-green-50 transition-colors">
                Browse Items
              </Link>
              <Link to="/add-item" className="bg-amber-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-amber-600 transition-colors">
                List an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is ReWear Section */}
      <section id="how-it-works" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is ReWear?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A community-driven platform where fashion meets sustainability. Trade, donate, and discover pre-loved clothing while reducing waste.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Recycle className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Swap & Trade</h3>
              <p className="text-sm md:text-base text-gray-600">Exchange clothes with other community members using our point-based system or direct swaps.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Community Driven</h3>
              <p className="text-sm md:text-base text-gray-600">Connect with like-minded individuals who care about sustainable fashion and circular economy.</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-amber-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-amber-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Eco-Friendly</h3>
              <p className="text-sm md:text-base text-gray-600">Reduce textile waste, lower your carbon footprint, and contribute to a more sustainable future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section id="browse" className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Items</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Discover amazing pieces from our community</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredItems.map((item) => (
              <Link key={item.id} to={`/item/${item.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-sm md:text-base">{item.points} points</span>
                      <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-2 md:px-3 py-1 rounded-full">{item.condition}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link to="/dashboard" className="inline-flex items-center bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm md:text-base">
              View All Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">2,500+</div>
              <div className="text-sm md:text-base text-gray-600">Items Swapped</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">850+</div>
              <div className="text-sm md:text-base text-gray-600">Community Members</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">1.2M</div>
              <div className="text-sm md:text-base text-gray-600">CO₂ Saved (lbs)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Recycle className="h-8 w-8 text-green-500" />
                <span className="text-xl md:text-2xl font-bold">ReWear</span>
              </div>
              <p className="text-sm md:text-base text-gray-400">Building a sustainable future, one swap at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browse Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List an Item</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Community</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}