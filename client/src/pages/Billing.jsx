import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';

function Billing() {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 499000,
    billingCycle: 'monthly',
    nextBilling: '2025-01-15',
    status: 'active'
  });

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '06/26',
      isDefault: false
    }
  ]);

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-12-01',
      amount: 499000,
      status: 'paid',
      description: 'Professional Plan - December 2024'
    },
    {
      id: 'INV-2024-002',
      date: '2024-11-01',
      amount: 499000,
      status: 'paid',
      description: 'Professional Plan - November 2024'
    },
    {
      id: 'INV-2024-003',
      date: '2024-10-01',
      amount: 499000,
      status: 'paid',
      description: 'Professional Plan - October 2024'
    },
    {
      id: 'INV-2024-004',
      date: '2024-09-01',
      amount: 499000,
      status: 'paid',
      description: 'Professional Plan - September 2024'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCardBrandIcon = (brand) => {
    // Simplified card brand representation
    return brand.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-dark-lighter border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-gray-400 mt-1">Kelola subscription dan payment methods Anda</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Plan */}
        <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-white">{currentPlan.name} Plan</h2>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                  {currentPlan.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Price</p>
                  <p className="text-white text-xl font-bold">
                    {formatCurrency(currentPlan.price)}
                    <span className="text-gray-400 text-sm font-normal">/{currentPlan.billingCycle}</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Next Billing Date</p>
                  <p className="text-white font-semibold">{formatDate(currentPlan.nextBilling)}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Billing Cycle</p>
                  <p className="text-white font-semibold capitalize">{currentPlan.billingCycle}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition">
                Upgrade Plan
              </button>
              <button className="px-6 py-3 bg-dark border border-dark-border text-white rounded-lg font-medium hover:bg-gray-800 transition">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Payment Methods</h3>
              <button className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition">
                <Plus size={18} />
                Add New
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-dark-lighter border border-dark-border rounded-lg p-4 hover:border-primary/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <CreditCard size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-semibold">
                            {getCardBrandIcon(method.brand)} •••• {method.last4}
                          </p>
                          {method.isDefault && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">Expires {method.expiry}</p>
                      </div>
                    </div>
                    
                    <button className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Billing Summary</h3>
            
            <div className="bg-dark-lighter border border-dark-border rounded-lg p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subscription</span>
                  <span className="text-white font-semibold">{formatCurrency(currentPlan.price)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tax (11%)</span>
                  <span className="text-white font-semibold">{formatCurrency(currentPlan.price * 0.11)}</span>
                </div>
                
                <div className="h-px bg-dark-border"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white text-xl font-bold">
                    {formatCurrency(currentPlan.price * 1.11)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-blue-400 text-sm font-medium mb-1">Next Payment</p>
                  <p className="text-gray-300 text-sm">
                    Your next payment of {formatCurrency(currentPlan.price * 1.11)} will be charged on {formatDate(currentPlan.nextBilling)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Billing History</h3>
            <button className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition">
              <Download size={18} />
              Download All
            </button>
          </div>

          <div className="bg-dark-lighter border border-dark-border rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark border-b border-dark-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Invoice ID</th>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Date</th>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Description</th>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Amount</th>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-dark/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          <span className="text-white font-medium">{invoice.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{formatDate(invoice.date)}</td>
                      <td className="px-6 py-4 text-gray-300">{invoice.description}</td>
                      <td className="px-6 py-4 text-white font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                          <CheckCircle size={14} />
                          {invoice.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition text-sm">
                          <Download size={16} />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-dark-border">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-white font-medium">{invoice.id}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{formatDate(invoice.date)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                      <CheckCircle size={12} />
                      {invoice.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{invoice.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{formatCurrency(invoice.amount)}</span>
                    <button className="flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;