import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const HeroBanner = () => {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1616627561839-074385245ff6?w=1920&h=800&fit=crop" 
          alt="Summer Sale"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 flex items-center">
        <div className="max-w-xl text-white">
          <span className="inline-block text-sm font-medium tracking-wider text-[#C4704B] mb-3 animate-fade-in">
            Up to 60% Off on Bedding
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Summer Sale
          </h2>
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
            Transform your bedroom into a cozy retreat with our premium cotton bedsheets.
          </p>
          <Link to="/category/bedsheets">
            <Button className="bg-white text-[#2D2D2D] hover:bg-[#C4704B] hover:text-white px-8 py-3 text-base font-medium transition-all duration-300">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
