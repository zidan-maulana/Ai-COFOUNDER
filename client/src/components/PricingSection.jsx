import React from 'react';

function PricingSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Paket Harga yang Fleksibel untuk Kebutuhan Bisnis Anda
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-10">
            Pilih paket yang sesuai dengan bisnis Anda, mulai dari personal gratis hingga 
            automasi tingkat lanjut untuk ekosistem bisnis yang lebih tinggi
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Gratis Plan */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/50 transition">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Gratis <span className="text-gray-400 text-lg">(Starter)</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Cocok untuk yang baru mencoba
              </p>
            </div>

            <div className="mb-6">
              <div className="text-5xl font-bold text-white mb-10">Rp0</div>
              <button className="w-full py-3 border border-gray-600 text-white rounded-lg hover:border-primary hover:text-primary transition">
                Mulai Gratis
              </button>
            </div>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Akses penuh fitur trial hingga 5 hari</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Worksheet Awal 10</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Maksimal user 3 member</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Laporan Real-time (5 hari)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Workflow hingga 3 automasi</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Dukungan email hingga 1 hari</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-dark-card border-2 border-primary rounded-2xl p-8 relative shadow-glow-purple transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-semibold">
              Paling Populer
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Pro <span className="text-gray-400 text-lg">(Direkomendasikan)</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Untuk bisnis kecil hingga menengah atau tim
              </p>
            </div>

            <div className="mb-8">
              <div className="text-5xl font-bold text-white mb-10">Rp49.000</div>
              <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
                Berlangganan PRO
              </button>
            </div>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Semua fitur dari Free Plan, ditambah:</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Automasi workflow dengan AI lebih canggih</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Analisis kompetitor mendalam</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Integrasi penuh ke aplikasi pihak ketiga</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Dukungan prioritas & konsultasi bisnis</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Pelatihan onboarding personal</span>
              </li>
            </ul>
          </div>

          {/* Bisnis Plan */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/50 transition">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Bisnis <span className="text-gray-400 text-lg">(Max)</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Untuk skala bisnis yang butuh full customization
              </p>
            </div>

            <div className="mb-6">
              <div className="text-5xl font-bold text-white mb-10">Rp499.000</div>
              <button className="w-full py-3 border border-gray-600 text-white rounded-lg hover:border-primary hover:text-primary transition">
                Pilih Paket Bisnis
              </button>
            </div>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Semua dari Pro Plan, plus:</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Kapasitas user tidak dibatasi</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Customisasi agent dan API khusus</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Akses Relly-time berdasarkan custom</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Dukungan khusus 24/7</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>On-premise deployment (*)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-16">
          (*) On-premise tersedia. Silahkan konsultasi dengan Sales untuk kebutuhan kustom Anda
        </p>
      </div>
    </section>
  );
}

export default PricingSection;