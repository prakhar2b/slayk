import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-[#2D2D2D] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
          My Wishlist ({wishlistItems.length})
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-[#2D2D2D] mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
            <Link to="/">
              <Button className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden group">
                <Link to={`/product/${item.slug}`} className="block relative aspect-square">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#C4704B] text-white text-xs px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-medium text-[#2D2D2D] mb-2 line-clamp-2 hover:text-[#C4704B] transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold text-[#2D2D2D]">{formatPrice(item.price)}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => {
                        addToCart(item, 1, item.sizes?.[0], item.colors?.[0]);
                      }}
                      className="flex-1 bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white text-sm"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
