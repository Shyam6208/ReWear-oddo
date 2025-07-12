import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Eye, EyeOff, Chrome, Check } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 order-last lg:order-first">
        <div className="h-full bg-gradient-to-br from-emerald-400 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <img
            src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2"
            alt="Sustainable fashion community"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8">Join thousands who are making fashion sustainable</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-green-300" />
                  <span className="text-sm md:text-base">Swap clothes with community members</span>
                </div>
                <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-green-300" />
                  <span className="text-sm md:text-base">Earn points for every item you list</span>
                </div>
                <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-green-300" />
                  <span className="text-sm md:text-base">Reduce fashion waste together</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        <div className="max-w-md w-full space-y-6 md:space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6 md:mb-8">
              <Recycle className="h-10 w-10 text-green-500" />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">ReWear</span>
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-sm md:text-base text-gray-600">Join the sustainable fashion community</p>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-10 md:pr-12 text-sm md:text-base"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-xs md:text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-green-600 hover:text-green-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 md:py-3 px-4 rounded-lg font-semibold hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              <Chrome className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Sign up with Google
            </button>

            <p className="text-center text-xs md:text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}