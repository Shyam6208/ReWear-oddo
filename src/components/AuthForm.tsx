import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Eye, EyeOff, Chrome, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function AuthForm() {
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        if (formData.email === 'admin@rewear.com') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        await signup(formData.name, formData.email, formData.password);
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error: any) {
      console.error('Auth failed:', error);
      setError(error.message || `${isLogin ? 'Login' : 'Signup'} failed. Please try again.`);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setSuccess('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google auth failed:', error);
      setError(error.message || 'Google authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-0 bg-white/80 backdrop-blur-soft">
        <div className="max-w-md w-full space-y-6 animate-fadeIn">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Recycle className="h-12 w-12 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse-slow" />
              </div>
              <span className="text-3xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">ReWear</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 transition-all duration-500">
              {isLogin ? 'Welcome back' : 'Join the community'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isLogin 
                ? 'Sign in to your sustainable fashion community' 
                : 'Start your journey towards sustainable fashion'
              }
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="bg-gray-100 rounded-2xl p-1.5 mb-6 shadow-inner">
            <div className="flex relative">
              <div 
                className={`absolute top-1.5 bottom-1.5 w-1/2 bg-white rounded-xl shadow-md transition-all duration-300 ease-out ${
                  isLogin ? 'left-1.5' : 'left-[calc(50%-3px)]'
                }`}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10
                  ${isLogin ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10
                  ${!isLogin ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-scaleIn">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-scaleIn">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5 transition-all duration-500" onSubmit={handleSubmit}>
            {/* Name Field (Signup only) */}
            <div className={`transition-all duration-500 overflow-hidden ${
              isLogin ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
            }`}>
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none z-0" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field pl-12 pr-4 relative z-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none z-0" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pl-12 pr-4 relative z-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none z-0" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-12 pr-12 relative z-10"
                  placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors focus-ring z-20"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            <div className={`transition-all duration-500 overflow-hidden ${
              isLogin ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
            }`}>
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none z-0" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="input-field pl-12 pr-12 relative z-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors focus-ring z-20"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="ml-2 text-xs md:text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-xs md:text-sm text-green-600 hover:text-green-700 transition-colors">Forgot password?</a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="btn-secondary w-full flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Chrome className="h-5 w-5 mr-3" />
              {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            </button>

            {/* Admin Note */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                <strong>Admin Access:</strong> Use admin@rewear.com / admin123 to access admin panel
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2 transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 order-first lg:order-last">
        <div className="h-full bg-gradient-to-br from-green-400 to-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <img
            src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2"
            alt="Sustainable fashion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8 animate-fadeIn">
              <h2 className="text-4xl font-bold mb-6 transition-all duration-500">
                {isLogin ? 'Welcome Back!' : 'Join the Movement'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {isLogin 
                  ? 'Continue your sustainable fashion journey' 
                  : 'Sustainable fashion starts with community'
                }
              </p>
              <div className="glass rounded-2xl p-8 backdrop-blur-soft">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="animate-slideInLeft">
                    <div className="text-3xl font-bold mb-2">2.5K+</div>
                    <div className="text-sm opacity-90">Items Swapped</div>
                  </div>
                  <div className="animate-slideInRight">
                    <div className="text-3xl font-bold mb-2">850+</div>
                    <div className="text-sm opacity-90">Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 