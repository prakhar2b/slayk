import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, MapPin, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-[#2D2D2D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mb-2">Thank you for shopping with SLAYK</p>
          <p className="text-gray-500 mb-8">Order ID: #SLAYK-{Date.now().toString().slice(-8)}</p>
          <p className="text-sm text-gray-500 mb-8">We've sent a confirmation email with your order details.</p>
          <Link to="/">
            <Button className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-[#2D2D2D] mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add items to your cart to proceed with checkout</p>
          <Link to="/">
            <Button className="bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#C4704B]">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#2D2D2D]">Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? 'bg-[#2D2D2D] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  <span className={`hidden sm:block text-sm ${
                    step >= s ? 'text-[#2D2D2D]' : 'text-gray-500'
                  }`}>
                    {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                  </span>
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[#2D2D2D]' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6 flex items-center gap-2">
                    <MapPin size={20} />
                    Shipping Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">First Name *</label>
                      <input 
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Last Name *</label>
                      <input 
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email *</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Address *</label>
                      <input 
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                        placeholder="House No, Street, Area"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">City *</label>
                      <input 
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">State *</label>
                      <input 
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Pincode *</label>
                      <input 
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Phone *</label>
                      <input 
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#C4704B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6 flex items-center gap-2">
                    <CreditCard size={20} />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: 'card', label: 'Credit / Debit Card' },
                      { id: 'upi', label: 'UPI Payment' },
                      { id: 'netbanking', label: 'Net Banking' },
                      { id: 'cod', label: 'Cash on Delivery' }
                    ].map((method) => (
                      <label key={method.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id 
                          ? 'border-[#C4704B] bg-[#FDF8F3]' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input 
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.paymentMethod === method.id ? 'border-[#C4704B]' : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C4704B]" />
                          )}
                        </div>
                        <span className="font-medium text-[#2D2D2D]">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#2D2D2D] mb-6 flex items-center gap-2">
                    <Truck size={20} />
                    Review Order
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FDF8F3] rounded-lg">
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} - {formData.pincode}<br />
                        Phone: {formData.phone}
                      </p>
                    </div>
                    <div className="p-4 bg-[#FDF8F3] rounded-lg">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-600 capitalize">{formData.paymentMethod.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                {step > 1 && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1 bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white">
                  {step === 3 ? 'Place Order' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#2D2D2D] truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-[#C4704B]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
                  <Check size={16} />
                  You've unlocked free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
