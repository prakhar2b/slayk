import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, Minus, Plus, Star, Truck, RotateCcw, Shield, Check, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.slug === slug) || products[0];
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || product.sizes?.[0], selectedColor || product.colors?.[0]);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#FDF8F3] py-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-gray-500 hover:text-[#C4704B]">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-[#C4704B] capitalize">
              {product.category?.replace(/-/g, ' ')}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#2D2D2D] truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F9F9F9]">
              <img 
                src={product.images[currentImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-[#7B8B6F] text-white text-xs px-3 py-1 rounded">NEW</span>
                )}
                {product.discount > 0 && (
                  <span className="bg-[#C4704B] text-white text-xs px-3 py-1 rounded">{product.discount}% OFF</span>
                )}
              </div>

              {/* Navigation */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index ? 'border-[#C4704B]' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[#2D2D2D]">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">Save {product.discount}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-[#2D2D2D] mb-3">Color: <span className="font-normal text-gray-600">{selectedColor || product.colors[0]}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border text-sm transition-all ${
                        (selectedColor || product.colors[0]) === color
                          ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white'
                          : 'border-gray-300 hover:border-[#C4704B]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-[#2D2D2D] mb-3">Size: <span className="font-normal text-gray-600">{selectedSize || product.sizes[0]}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border text-sm transition-all ${
                        (selectedSize || product.sizes[0]) === size
                          ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white'
                          : 'border-gray-300 hover:border-[#C4704B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium text-[#2D2D2D] mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {product.inStock && (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <Check size={16} /> In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white py-3 text-base"
              >
                Add to Cart
              </Button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-md border flex items-center justify-center transition-colors ${
                  inWishlist ? 'bg-[#C4704B] border-[#C4704B] text-white' : 'border-gray-300 hover:border-[#C4704B]'
                }`}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-[#C4704B]" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[#C4704B]" />
                <p className="text-xs text-gray-600">15 Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-[#C4704B]" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="flex gap-8">
              {['description', 'features', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                    activeTab === tab ? 'text-[#2D2D2D]' : 'text-gray-500 hover:text-[#2D2D2D]'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4704B]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Our products are crafted with care using premium materials to ensure lasting quality. 
                  Each item goes through rigorous quality checks before being shipped to you.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <Check size={18} className="text-[#7B8B6F]" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#2D2D2D]">{product.rating}</div>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                  </div>
                </div>
                <p className="text-gray-500">Customer reviews will be displayed here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
