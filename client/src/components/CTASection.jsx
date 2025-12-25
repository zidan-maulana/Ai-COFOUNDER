import React from 'react';

function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bangun bisnis Anda dengan cara yang lebih cerdas.
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Karo Agent membantu mengotomasi keunggulan, menganalisis pasar, 
            dan membuat keputusan bisnis operasional. Semua untuk AI yang bekerja untuk Anda.
          </p>
          <button className="px-10 py-4 bg-white text-dark rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg">
            Mulai Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;