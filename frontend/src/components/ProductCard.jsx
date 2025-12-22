import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden">
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#7B8B6F] text-white text-xs px-2 py-1 rounded">NEW</span>
          )}
          {product.discount > 0 && (
            <span className="bg-[#C4704B] text-white text-xs px-2 py-1 rounded">{product.discount}% OFF</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              inWishlist ? 'bg-[#C4704B] text-white' : 'bg-white text-gray-600 hover:bg-[#C4704B] hover:text-white'
            }`}
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
            }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600 hover:bg-[#2D2D2D] hover:text-white transition-colors"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-[#2D2D2D] mb-1 line-clamp-2 group-hover:text-[#C4704B] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#2D2D2D]">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
