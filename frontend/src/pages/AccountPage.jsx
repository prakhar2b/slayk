import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Mock orders
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 4999,
      items: 3
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'In Transit',
      total: 2499,
      items: 1
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#2D2D2D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome Back
            </h1>
            <p className="text-gray-500">Sign in to your SLAYK account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B] focus:ring-1 focus:ring-[#C4704B]"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Password</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B] focus:ring-1 focus:ring-[#C4704B]"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-[#C4704B] focus:ring-[#C4704B]" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#C4704B] hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white py-3">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account? 
              <a href="#" className="text-[#C4704B] hover:underline ml-1">Create one</a>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-[#2D2D2D] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
          My Account
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg p-4 shadow-sm space-y-1">
              {[
                { id: 'profile', icon: User, label: 'Profile' },
                { id: 'orders', icon: Package, label: 'Orders' },
                { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                { id: 'addresses', icon: MapPin, label: 'Addresses' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-[#FDF8F3] text-[#C4704B]' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6">Profile Information</h2>
                  <form className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Full Name</label>
                      <input 
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email</label>
                      <input 
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Phone</label>
                      <input 
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <Button className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white">
                      Save Changes
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-[#2D2D2D]">{order.id}</p>
                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">{order.items} item(s) • {formatPrice(order.total)}</p>
                          <button className="flex items-center gap-1 text-[#C4704B] text-sm hover:underline">
                            View Details <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6">My Wishlist</h2>
                  <p className="text-gray-500">View and manage your saved items</p>
                  <Link to="/wishlist" className="inline-flex items-center gap-2 text-[#C4704B] mt-4 hover:underline">
                    Go to Wishlist <ChevronRight size={16} />
                  </Link>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6">Saved Addresses</h2>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <MapPin size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-4">No addresses saved yet</p>
                    <Button variant="outline">Add New Address</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountPage;
