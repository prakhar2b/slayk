import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#C4704B] py-12">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Join the SLAYK Family
          </h3>
          <p className="text-white/90 mb-6">Subscribe for exclusive offers, new arrivals & interior tips</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
              required
            />
            <Button type="submit" className="bg-[#2D2D2D] hover:bg-black text-white px-8 py-3">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>SLAYK</h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Discover beautifully designed home essentials that blend style with functionality. Transform your space with SLAYK.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/stores" className="text-gray-400 hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>123 Design Street, Creative Hub,<br />Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="flex-shrink-0" />
                <span>hello@slayk.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 SLAYK. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex gap-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">MC</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">UPI</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">COD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
