import React from 'react';

function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Solusi AI Terintegrasi untuk Bisnis yang Lebih Efisien dan Terukur.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Karo Agent adalah sistem AI all-in-one yang bertujuk sebagai 
            pendamping bisnis digital, alam otomatisasi operasional, dan analisis hingga 
            automasi lengkap untuk menghemat waktu Anda.
          </p>
        </div>

        {/* Features Title */}
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Fitur Utama
        </h3>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-dark-card border border-purple-500/30 rounded-2xl p-8 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-xl font-bold text-white mb-3">
              Automasi Keuangan <span className="text-primary">Cerdas</span>
            </h4>
            <p className="text-gray-400">
              Pengelolaan data keuangan yang lebih rapi dan terintegrasi
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-xl font-bold text-white mb-3">
              Analisis Pasar & Kompetitor
            </h4>
            <p className="text-gray-400">
              Insight berbasis data untuk membuka jalan bisnis yang lebih baik
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-xl font-bold text-white mb-3">
              Automasi Workflow <span className="text-primary">Bisnis</span>
            </h4>
            <p className="text-gray-400">
              Proses bisnis berjalan otomatis tanpa repot
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-xl font-bold text-white mb-3">
              Perencanaan Strategi Berbasis <span className="text-primary">AI</span>
            </h4>
            <p className="text-gray-400">
              Dapatkan data ini sesuaikan yang terbaik
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;