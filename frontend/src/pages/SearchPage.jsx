import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');

  const searchResults = useMemo(() => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    let results = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );

    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return results;
  }, [query, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Search Results for "{query}"
          </h1>
          <p className="text-gray-500">{searchResults.length} products found</p>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-[#2D2D2D] mb-2">No results found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or browse our categories</p>
            <Link to="/" className="text-[#C4704B] hover:underline font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <span className="text-sm text-gray-500">Showing {searchResults.length} results</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#C4704B] bg-white"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
