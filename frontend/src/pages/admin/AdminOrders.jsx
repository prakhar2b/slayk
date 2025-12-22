import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { 
  Search, 
  Eye,
  X,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const response = await axios.get(`${API}/orders${params}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock className="text-yellow-500" size={16} />,
      'Processing': <Package className="text-blue-500" size={16} />,
      'Shipped': <Truck className="text-purple-500" size={16} />,
      'Delivered': <CheckCircle className="text-green-500" size={16} />,
      'Cancelled': <XCircle className="text-red-500" size={16} />
    };
    return icons[status] || <Clock className="text-gray-500" size={16} />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Shipped': 'bg-purple-100 text-purple-700',
      'Delivered': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const updateOrderStatus = async (orderId, newStatus, trackingNumber = null) => {
    try {
      const data = { status: newStatus };
      if (trackingNumber) data.tracking_number = trackingNumber;
      
      await axios.put(`${API}/orders/${orderId}`, data);
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus, tracking_number: trackingNumber || prev.tracking_number }));
      }
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const filteredOrders = orders.filter(o => 
    o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shipping_address?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shipping_address?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C4704B] bg-white"
          >
            <option value="">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#2D2D2D]">{order.order_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                      <p className="text-xs text-gray-500">{order.shipping_address?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.items?.length} item(s)
                    </td>
                    <td className="px-6 py-4 font-medium text-[#2D2D2D]">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => viewOrderDetails(order)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#C4704B]"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-300" size={48} />
              <p className="mt-4 text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                <div>
                  <h3 className="text-lg font-semibold">Order Details</h3>
                  <p className="text-sm text-gray-500">{selectedOrder.order_number}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#C4704B]"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <img src={item.product_image} alt={item.product_name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.product_name}</p>
                          {item.selected_size && <p className="text-xs text-gray-500">Size: {item.selected_size}</p>}
                          {item.selected_color && <p className="text-xs text-gray-500">Color: {item.selected_color}</p>}
                          <p className="text-sm mt-1">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Shipping</span>
                    <span>{selectedOrder.shipping === 0 ? 'FREE' : formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium mb-3">Shipping Address</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    <p className="font-medium">{selectedOrder.shipping_address?.first_name} {selectedOrder.shipping_address?.last_name}</p>
                    <p className="text-gray-600">{selectedOrder.shipping_address?.address}</p>
                    <p className="text-gray-600">{selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} - {selectedOrder.shipping_address?.pincode}</p>
                    <p className="text-gray-600">Phone: {selectedOrder.shipping_address?.phone}</p>
                    <p className="text-gray-600">Email: {selectedOrder.shipping_address?.email}</p>
                  </div>
                </div>

                {/* Payment & Tracking */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-gray-600 capitalize">{selectedOrder.payment_method}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tracking Number</h4>
                    {selectedOrder.tracking_number ? (
                      <p className="text-[#C4704B] font-mono">{selectedOrder.tracking_number}</p>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C4704B]"
                        onBlur={(e) => {
                          if (e.target.value) {
                            updateOrderStatus(selectedOrder.id, selectedOrder.status, e.target.value);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  Created: {formatDate(selectedOrder.created_at)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
