import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { 
  Package, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Search,
  Save
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminInventory = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStock, setEditingStock] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/inventory`);
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (productId, value) => {
    setEditingStock(prev => ({ ...prev, [productId]: value }));
  };

  const updateStock = async (productId) => {
    const newStock = parseInt(editingStock[productId]);
    if (isNaN(newStock) || newStock < 0) {
      alert('Please enter a valid stock quantity');
      return;
    }

    try {
      await axios.patch(`${API}/products/${productId}/stock?stock_quantity=${newStock}`);
      setEditingStock(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
      fetchInventory();
    } catch (error) {
      alert('Failed to update stock');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const allProducts = inventory ? [
    ...inventory.out_of_stock,
    ...inventory.low_stock,
    ...inventory.in_stock
  ] : [];

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C4704B]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{inventory?.summary?.out_of_stock_count || 0}</p>
              </div>
              <XCircle className="text-red-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Low Stock (&lt;10)</p>
                <p className="text-3xl font-bold text-orange-600">{inventory?.summary?.low_stock_count || 0}</p>
              </div>
              <AlertTriangle className="text-orange-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Stock</p>
                <p className="text-3xl font-bold text-green-600">{inventory?.summary?.in_stock_count || 0}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
          />
        </div>

        {/* Out of Stock */}
        {inventory?.out_of_stock?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-red-50 border-b border-red-100">
              <h3 className="font-semibold text-red-700 flex items-center gap-2">
                <XCircle size={18} />
                Out of Stock Products
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventory.out_of_stock.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category.replace(/-/g, ' ')}</td>
                      <td className="px-6 py-4 text-sm font-medium">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingStock[product.id] ?? product.stock_quantity}
                            onChange={(e) => handleStockChange(product.id, e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C4704B]"
                          />
                          {editingStock[product.id] !== undefined && (
                            <Button
                              size="sm"
                              onClick={() => updateStock(product.id)}
                              className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white h-8"
                            >
                              <Save size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Low Stock */}
        {inventory?.low_stock?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-orange-50 border-b border-orange-100">
              <h3 className="font-semibold text-orange-700 flex items-center gap-2">
                <AlertTriangle size={18} />
                Low Stock Products (Less than 10)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventory.low_stock.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category.replace(/-/g, ' ')}</td>
                      <td className="px-6 py-4">
                        <span className="text-orange-600 font-semibold">{product.stock_quantity}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingStock[product.id] ?? product.stock_quantity}
                            onChange={(e) => handleStockChange(product.id, e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C4704B]"
                          />
                          {editingStock[product.id] !== undefined && (
                            <Button
                              size="sm"
                              onClick={() => updateStock(product.id)}
                              className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white h-8"
                            >
                              <Save size={14} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* In Stock */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100">
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              <CheckCircle size={18} />
              In Stock Products
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory?.in_stock?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category.replace(/-/g, ' ')}</td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-semibold">{product.stock_quantity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editingStock[product.id] ?? product.stock_quantity}
                          onChange={(e) => handleStockChange(product.id, e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C4704B]"
                        />
                        {editingStock[product.id] !== undefined && (
                          <Button
                            size="sm"
                            onClick={() => updateStock(product.id)}
                            className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white h-8"
                          >
                            <Save size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
