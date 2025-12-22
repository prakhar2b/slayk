import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { Button } from '../components/ui/button';

const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const category = categories.find(c => c.slug === slug) || { name: slug?.replace(/-/g, ' '), slug };
  
  const filteredProducts = useMemo(() => {
    let filtered = slug 
      ? products.filter(p => p.category === slug || Math.random() > 0.3)
      : products;

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [slug, sortBy, priceRange]);

  const allColors = [...new Set(products.flatMap(p => p.colors || []))];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#FDF8F3] py-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#C4704B]">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#2D2D2D] capitalize">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-[#FDF8F3] py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#2D2D2D] capitalize mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {category.name}
          </h1>
          <p className="text-gray-500">{filteredProducts.length} Products</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <button 
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 text-[#2D2D2D]"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <div className="hidden lg:block text-sm text-gray-500">
            Showing {filteredProducts.length} results
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#C4704B] bg-white"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-[#2D2D2D] mb-3 flex items-center justify-between">
                  Categories
                  <ChevronDown size={16} />
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link 
                        to={`/category/${cat.slug}`}
                        className={`text-sm hover:text-[#C4704B] transition-colors ${
                          cat.slug === slug ? 'text-[#C4704B] font-medium' : 'text-gray-600'
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-[#2D2D2D] mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      placeholder="Min"
                      value={priceRange[0] || ''}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#C4704B]"
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                      type="number"
                      placeholder="Max"
                      value={priceRange[1] || ''}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000])}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#C4704B]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[[0, 1000], [1000, 2500], [2500, 5000], [5000, 10000]].map(([min, max], i) => (
                      <button 
                        key={i}
                        onClick={() => setPriceRange([min, max])}
                        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                          priceRange[0] === min && priceRange[1] === max
                            ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]'
                            : 'border-gray-300 hover:border-[#C4704B]'
                        }`}
                      >
                        ₹{min} - ₹{max}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-[#2D2D2D] mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.slice(0, 10).map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColors(prev => 
                          prev.includes(color) 
                            ? prev.filter(c => c !== color)
                            : [...prev, color]
                        );
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedColors.includes(color)
                          ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]'
                          : 'border-gray-300 hover:border-[#C4704B]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setSelectedColors([]);
                }}
                variant="outline"
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">No products found matching your criteria</p>
                <Button onClick={() => {
                  setPriceRange([0, 10000]);
                  setSelectedColors([]);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity lg:hidden ${
        showFilters ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`} onClick={() => setShowFilters(false)}>
        <div 
          className={`absolute right-0 top-0 h-full w-80 bg-white transform transition-transform overflow-y-auto ${
            showFilters ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4 space-y-6">
            {/* Same filter content as desktop */}
            <div>
              <h3 className="font-semibold text-[#2D2D2D] mb-3">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {[[0, 1000], [1000, 2500], [2500, 5000], [5000, 10000]].map(([min, max], i) => (
                  <button 
                    key={i}
                    onClick={() => setPriceRange([min, max])}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      priceRange[0] === min && priceRange[1] === max
                        ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]'
                        : 'border-gray-300'
                    }`}
                  >
                    ₹{min} - ₹{max}
                  </button>
                ))}
              </div>
            </div>
            <Button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-[#2D2D2D]"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
