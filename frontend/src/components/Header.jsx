import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { navCategories } from '../data/mockData';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount, wishlistItems, setIsCartOpen } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#2D2D2D] text-white text-center py-2 text-sm">
        <p>✨ MONSOON SALE: Up to 60% Off + Free Shipping on orders above ₹999 ✨</p>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-wider text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                SLAYK
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navCategories.map((category, index) => (
                <div 
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 py-6 text-[#2D2D2D] hover:text-[#C4704B] transition-colors text-sm font-medium">
                    <span>{category.name}</span>
                    <ChevronDown size={14} className={`transform transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  <div className={`absolute top-full left-0 w-48 bg-white shadow-lg rounded-b-lg py-2 transition-all duration-200 ${
                    activeDropdown === index ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    {category.subcategories.map((sub, subIndex) => (
                      <Link 
                        key={subIndex}
                        to={sub.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FDF8F3] hover:text-[#C4704B] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-full bg-[#F9F9F9] focus:outline-none focus:border-[#C4704B] focus:ring-1 focus:ring-[#C4704B] text-sm transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C4704B] transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link to="/account" className="hidden lg:block text-[#2D2D2D] hover:text-[#C4704B] transition-colors">
                <User size={22} />
              </Link>
              <Link to="/wishlist" className="relative text-[#2D2D2D] hover:text-[#C4704B] transition-colors">
                <Heart size={22} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C4704B] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-[#2D2D2D] hover:text-[#C4704B] transition-colors"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C4704B] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="lg:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-full bg-[#F9F9F9] focus:outline-none focus:border-[#C4704B] text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} onClick={() => setIsMenuOpen(false)}>
          <div 
            className={`absolute left-0 top-0 h-full w-80 bg-white transform transition-transform duration-300 overflow-y-auto ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="py-2">
              {navCategories.map((category, index) => (
                <div key={index} className="border-b border-gray-100">
                  <div className="px-4 py-3 font-medium text-[#2D2D2D]">{category.name}</div>
                  <div className="bg-gray-50 px-4 py-2">
                    {category.subcategories.map((sub, subIndex) => (
                      <Link 
                        key={subIndex}
                        to={sub.link}
                        className="block py-2 text-sm text-gray-600 hover:text-[#C4704B]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link 
                to="/account"
                className="block px-4 py-3 font-medium text-[#2D2D2D] border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
};

export default Header;
