import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Shield, Award, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { categories, products, testimonials, collections, trustBadges } from '../data/mockData';
import { Button } from '../components/ui/button';

const iconMap = {
  Truck,
  RotateCcw,
  Shield,
  Award
};

const HomePage = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <section className="bg-[#FDF8F3] py-6 border-b">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => {
              const IconComponent = iconMap[badge.icon];
              return (
                <div key={badge.id} className="flex items-center gap-3 justify-center">
                  <div className="w-10 h-10 bg-[#C4704B] rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-[#2D2D2D]">{badge.title}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shop by Category
            </h2>
            <p className="text-gray-500">Explore our curated collections for every corner of your home</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 lg:py-16 bg-[#FDF8F3]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Best Sellers
              </h2>
              <p className="text-gray-500 mt-1">Our most loved products</p>
            </div>
            <Link to="/best-sellers" className="hidden md:flex items-center gap-2 text-[#C4704B] hover:underline font-medium">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Link to="/best-sellers" className="md:hidden flex items-center justify-center gap-2 mt-8 text-[#C4704B] font-medium">
            View All Best Sellers <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Curated Collections
            </h2>
            <p className="text-gray-500">Thoughtfully designed for your lifestyle</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link 
                key={collection.id}
                to={collection.link}
                className="group relative overflow-hidden rounded-xl h-[300px]"
              >
                <img 
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{collection.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{collection.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Collection <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                New Arrivals
              </h2>
              <p className="text-gray-500 mt-1">Fresh additions to our collection</p>
            </div>
            <Link to="/new-arrivals" className="hidden md:flex items-center gap-2 text-[#C4704B] hover:underline font-medium">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-16 bg-[#2D2D2D] text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Customers Say
            </h2>
            <p className="text-gray-400">Real reviews from real customers</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="text-center px-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg lg:text-xl italic mb-6 leading-relaxed">
                "{testimonials[testimonialIndex].text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <img 
                  src={testimonials[testimonialIndex].image}
                  alt={testimonials[testimonialIndex].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-medium">{testimonials[testimonialIndex].name}</h4>
                  <p className="text-sm text-gray-400">{testimonials[testimonialIndex].location}</p>
                </div>
              </div>
              <p className="text-sm text-[#C4704B] mt-3">Verified Purchase: {testimonials[testimonialIndex].product}</p>
            </div>

            {/* Navigation */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === testimonialIndex ? 'bg-[#C4704B] w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#2D2D2D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Follow Us @SLAYK
            </h2>
            <p className="text-gray-500">Tag us in your home styling for a chance to be featured</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {products.slice(0, 6).map((product, index) => (
              <a 
                key={index}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <img 
                  src={product.image}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">View Post</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
