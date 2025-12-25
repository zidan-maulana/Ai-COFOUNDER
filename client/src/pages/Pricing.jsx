import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, X } from 'lucide-react';

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Untuk individual dan startup',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: '1 User', included: true },
        { name: '5 Workflows', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'API Access', included: false },
        { name: 'Custom Integrations', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Advanced Security', included: false }
      ],
      cta: 'Mulai Gratis',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Untuk bisnis yang berkembang',
      monthlyPrice: 499000,
      yearlyPrice: 4990000,
      features: [
        { name: '5 Users', included: true },
        { name: 'Unlimited Workflows', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Priority Email Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Priority Support', included: false },
        { name: 'Advanced Security', included: false }
      ],
      cta: 'Mulai Sekarang',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Untuk perusahaan besar',
      monthlyPrice: 1499000,
      yearlyPrice: 14990000,
      features: [
        { name: 'Unlimited Users', included: true },
        { name: 'Unlimited Workflows', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'Advanced Security & Compliance', included: true }
      ],
      cta: 'Hubungi Sales',
      popular: false
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const monthlyCost = plan.monthlyPrice * 12;
      const savings = monthlyCost - plan.yearlyPrice;
      return savings;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Pilih Paket yang{' '}
            <span className="text-primary">Tepat untuk Anda</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Mulai gratis dan upgrade kapan saja. Tidak ada komitmen jangka panjang.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-dark-lighter border border-dark-border rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-500 rounded text-xs">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const price = getPrice(plan);
              const savings = getSavings(plan);

              return (
                <div
                  key={index}
                  className={`relative bg-dark-lighter border rounded-xl p-8 ${
                    plan.popular
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-dark-border hover:border-primary/50'
                  } transition`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                    <div className="mb-2">
                      <span className="text-5xl font-bold text-white">
                        {price === 0 ? 'Gratis' : formatPrice(price)}
                      </span>
                      {price > 0 && (
                        <span className="text-gray-400 text-lg">
                          /{billingCycle === 'monthly' ? 'bulan' : 'tahun'}
                        </span>
                      )}
                    </div>

                    {savings > 0 && (
                      <p className="text-green-500 text-sm font-medium">
                        Hemat {formatPrice(savings)} per tahun
                      </p>
                    )}
                  </div>

                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/register'}
                    className={`block w-full py-3 rounded-lg font-semibold text-center transition mb-8 ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary-light text-white'
                        : 'bg-dark border-2 border-white hover:bg-white hover:text-dark text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm font-semibold mb-4">Yang termasuk:</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-white' : 'text-gray-600'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-dark border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Apakah saya bisa upgrade atau downgrade paket kapan saja?
              </h3>
              <p className="text-gray-400">
                Ya, Anda bisa mengubah paket subscription kapan saja. Perubahan akan berlaku pada periode billing berikutnya.
              </p>
            </div>

            <div className="bg-dark border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Apakah ada biaya tersembunyi?
              </h3>
              <p className="text-gray-400">
                Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua fitur dalam paket yang dipilih.
              </p>
            </div>

            <div className="bg-dark border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Bagaimana cara pembayaran?
              </h3>
              <p className="text-gray-400">
                Kami menerima pembayaran via credit card, debit card, dan transfer bank. Semua transaksi dienkripsi dan aman.
              </p>
            </div>

            <div className="bg-dark border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Apakah ada trial period?
              </h3>
              <p className="text-gray-400">
                Ya, semua paket berbayar mendapatkan 14 hari trial gratis tanpa perlu memasukkan kartu kredit.
              </p>
            </div>

            <div className="bg-dark border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Bagaimana jika saya ingin cancel subscription?
              </h3>
              <p className="text-gray-400">
                Anda bisa cancel subscription kapan saja tanpa penalti. Akses akan tetap aktif hingga akhir periode billing yang sudah dibayar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Masih ada pertanyaan?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Tim kami siap membantu Anda memilih paket yang tepat
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-semibold transition"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;