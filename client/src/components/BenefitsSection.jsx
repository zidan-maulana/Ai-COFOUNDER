import React from 'react';

function BenefitsSection() {
  return (
    <section className="py-20 px-6 bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
          Keunggulan yang Membedakan <span className="text-primary">Karo Agent</span> dari AI Konvensional
        </h2>
        <p className="text-gray-500 text-center text-lg mb-16 max-w-4xl mx-auto">
          Kesuksesan sama-sama canggih, namun hasilnya juga berbeda. AI konvensional memberi 
          jawaban, Karo Agent beserta solusi secara lengkap menyelamatkan Output yang kamu inginkan
        </p>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {/* Karo Agent */}
          <div className="bg-dark-card border border-primary/30 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Karo Agent – Hasil & Output
              </h3>
            </div>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">✓</span>
                <div>
                  <strong className="text-white">Hasil Komplet & Instan:</strong> Memberikan hasil 
                  analisis lengkap yang siap pakai
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">✓</span>
                <div>
                  <strong className="text-white">Integrasi & Otomatisasi Komprehensif:</strong> Mempercepat 
                  proses otomatis tanpa coding manual
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">✓</span>
                <div>
                  <strong className="text-white">Workflow Agent & Customisasi:</strong> Dapat disesuaikan 
                  bisnis proses serta kebutuhan khusus
                </div>
              </li>
            </ul>
            <button className="mt-8 px-6 py-3 bg-white text-dark rounded-lg hover:bg-gray-300 transition font-semibold w-full">
              Pelajari Selanjut
            </button>
          </div>

          {/* AI Konvensional */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                AI Konvensional – Hanya Memberi Petunjuk
              </h3>
            </div>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-gray-300">Herjakan Tugas Sendiri Anda:</strong> Memberikan jawaban 
                  dan konsep, tapi Anda yang harus menjalankan di tool lain
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-gray-300">Tidak Terintegrasikan Dengan Tools:</strong> Terbatas 
                  pada chat dan tidak punya akses langsung ke sistem bisnis Anda
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-1">•</span>
                <div>
                  <strong className="text-gray-300">Butuh Waktu & Coding Manual:</strong> Memerlukan effort 
                  tambahan untuk implementasi solusi
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-500 mb-0">
            Operasional bisnis jangka panjang dapat diselesaikan di sini.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;