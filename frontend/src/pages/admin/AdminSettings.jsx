import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { 
  Database, 
  Image, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminSettings = () => {
  const [heroSettings, setHeroSettings] = useState({
    title: 'Summer Sale',
    subtitle: 'Up to 60% Off on Bedding',
    description: 'Transform your bedroom into a cozy retreat with our premium cotton bedsheets.',
    image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=1920&h=800&fit=crop',
    cta_text: 'Shop Now',
    cta_link: '/category/bedsheets'
  });
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings/hero`);
      if (response.data) {
        setHeroSettings(response.data);
      }
    } catch (error) {
      console.log('Using default hero settings');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHeroSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveHeroSettings = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await axios.post(`${API}/settings/hero`, heroSettings);
      setMessage({ type: 'success', text: 'Hero settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    if (!window.confirm('This will reset all products, categories, and orders to default data. Continue?')) {
      return;
    }
    
    setSeedLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await axios.post(`${API}/settings/seed`);
      setMessage({ type: 'success', text: 'Database seeded successfully! Products, categories, and sample orders have been created.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to seed database: ' + (error.response?.data?.detail || error.message) });
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Message */}
        {message.text && (
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            {message.text}
          </div>
        )}

        {/* Seed Database */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="text-orange-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1">Seed Database</h3>
              <p className="text-gray-500 text-sm mb-4">
                Initialize or reset the database with sample products, categories, and orders. 
                This is useful for testing or starting fresh.
              </p>
              <Button 
                onClick={seedDatabase}
                disabled={seedLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {seedLoading ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Seeding...
                  </>
                ) : (
                  <>
                    <Database size={18} className="mr-2" />
                    Seed Initial Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Image className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#2D2D2D]">Home Page Hero Settings</h3>
              <p className="text-gray-500 text-sm">Customize the hero banner on your home page</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={heroSettings.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                  placeholder="Summer Sale"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={heroSettings.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                  placeholder="Up to 60% Off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={heroSettings.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                placeholder="Transform your bedroom..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
              <input
                type="url"
                name="image"
                value={heroSettings.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                placeholder="https://images.unsplash.com/..."
              />
              {heroSettings.image && (
                <div className="mt-3 relative rounded-lg overflow-hidden h-48">
                  <img 
                    src={heroSettings.image} 
                    alt="Hero preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm text-[#C4704B]">{heroSettings.subtitle}</p>
                    <p className="text-2xl font-bold">{heroSettings.title}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  name="cta_text"
                  value={heroSettings.cta_text}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                  placeholder="Shop Now"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input
                  type="text"
                  name="cta_link"
                  value={heroSettings.cta_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
                  placeholder="/category/bedsheets"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={saveHeroSettings}
                disabled={loading}
                className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Hero Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Sample Hero Images */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Sample Hero Images</h3>
          <p className="text-gray-500 text-sm mb-4">Click on any image to use it as your hero background</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=400&fit=crop',
              'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=400&fit=crop'
            ].map((url, index) => (
              <button
                key={index}
                onClick={() => setHeroSettings(prev => ({ ...prev, image: url.replace('w=800&h=400', 'w=1920&h=800') }))}
                className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-[#C4704B] transition-all"
              >
                <img src={url} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
