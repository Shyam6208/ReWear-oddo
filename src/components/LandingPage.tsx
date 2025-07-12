import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Leaf, Users, Heart, ArrowRight, Star, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { items } = useItems();
  const { user } = useAuth();

  // Featured items: first 4 available items
  const featuredItems = items && items.length > 0
    ? items.filter(item => item.status === 'available').slice(0, 4)
    : [
        {
          id: 1,
          title: 'Vintage Denim Jacket',
          image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
          points: 25,
          condition: 'Excellent',
          category: 'Outerwear'
        },
        {
          id: 2,
          title: 'Floral Summer Dress',
          image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
          points: 30,
          condition: 'Good',
          category: 'Dresses'
        },
        {
          id: 3,
          title: 'Cozy Wool Sweater',
          image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
          points: 35,
          condition: 'Like New',
          category: 'Sweaters'
        },
        {
          id: 4,
          title: 'Classic White Sneakers',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
          points: 20,
          condition: 'Good',
          category: 'Footwear'
        }
      ];

  // Stats
  const totalSwapped = items ? items.filter(item => item.status === 'swapped').length : 2500;
  const totalMembers = user ? 850 : 850; // Placeholder, ideally from backend
  const totalCO2 = totalSwapped * 0.5; // Example: 0.5 lbs per swap

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-soft shadow-soft fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Recycle className="h-8 w-8 text-green-500" />
                <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse-slow" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gradient">ReWear</span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors font-medium">How it Works</a>
              <a href="#browse" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Browse</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
              <Link to="/auth" className="text-green-600 hover:text-green-700 font-semibold transition-colors">Login</Link>
              <Link to="/auth" className="btn-primary px-6 py-2.5 text-sm">Sign Up</Link>
            </nav>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <Link to="/auth" className="text-green-600 hover:text-green-700 font-semibold text-sm">Login</Link>
              <Link to="/auth" className="btn-primary px-4 py-2 text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-responsive">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fadeIn">
              <div className="flex items-center space-x-3 bg-green-100 px-6 py-3 rounded-full border border-green-200 shadow-soft">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-semibold">Sustainable Fashion</span>
                <Award className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 animate-slideInLeft">
              <span className="text-gradient">Swap.</span> Save. <span className="text-gradient">Sustain.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-slideInRight">
              Join the community-driven clothing exchange that's revolutionizing how we think about fashion. 
              Give your clothes a second life while discovering unique pieces from others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto animate-fadeIn">
              <Link to="/auth" className="btn-primary px-8 py-4 text-lg">
                Start Swapping
              </Link>
              <Link to="/dashboard" className="btn-secondary px-8 py-4 text-lg">
                Browse Items
              </Link>
              <Link to="/add-item" className="btn-accent px-8 py-4 text-lg">
                List an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is ReWear Section */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">What is ReWear?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A community-driven platform where fashion meets sustainability. Trade, donate, and discover pre-loved clothing while reducing waste.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group animate-fadeIn">
              <div className="bg-green-100 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Recycle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Swap & Trade</h3>
              <p className="text-gray-600 leading-relaxed">Exchange clothes with other community members using our point-based system or direct swaps.</p>
            </div>
            
            <div className="text-center group animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="bg-blue-100 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">Connect with like-minded individuals who care about sustainable fashion and circular economy.</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1 group animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="bg-amber-100 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Heart className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Eco-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Reduce textile waste, lower your carbon footprint, and contribute to a more sustainable future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section id="browse" className="section-padding bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Items</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">Discover amazing pieces from our community</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredItems.map((item, index) => (
              <Link key={item.id} to={`/item/${item.id}`} className="group animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card card-hover overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-primary">{item.category}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-secondary">{item.condition}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-lg">{item.points} points</span>
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/dashboard" className="btn-primary px-8 py-4 text-lg inline-flex items-center">
              View All Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="animate-fadeIn">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3">{totalSwapped}+</div>
              <div className="text-lg md:text-xl text-gray-600 font-medium">Items Swapped</div>
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3">{totalMembers}+</div>
              <div className="text-lg md:text-xl text-gray-600 font-medium">Community Members</div>
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3">{totalCO2}M</div>
              <div className="text-lg md:text-xl text-gray-600 font-medium">CO₂ Saved (lbs)</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">About ReWear</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              ReWear is on a mission to make fashion circular, accessible, and sustainable for everyone. We believe in the power of community to reduce waste, extend the life of clothing, and inspire conscious consumption.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white rounded-2xl shadow-soft p-8 flex flex-col items-center text-center animate-fadeIn">
              <Leaf className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">We champion eco-friendly practices and help reduce textile waste by giving clothes a second life.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-soft p-8 flex flex-col items-center text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <Users className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">Our platform thrives on the collective spirit of members who share, swap, and support each other.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-soft p-8 flex flex-col items-center text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <Star className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality & Trust</h3>
              <p className="text-gray-600">We ensure every swap is safe, rewarding, and transparent, building trust with every transaction.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Our Vision</h4>
            <p className="text-gray-600 max-w-2xl mx-auto">
              To create a world where fashion is circular, waste is minimized, and every person can participate in a more sustainable future—one swap at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 md:py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Recycle className="h-8 w-8 text-green-500" />
                  <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse-slow" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Building a sustainable future, one swap at a time.</p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browse Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List an Item</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}