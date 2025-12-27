import React from 'react';

function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 max-w-5xl mx-auto">
            Solusi AI Terintegrasi untuk Bisnis yang Lebih Efisien dan Terukur.
          </h2>
          <p className="text-gray-500 text-lg max-w-4xl mx-auto">
            Karo Agent adalah sistem AI all-in-one yang bertujuk sebagai 
            pendamping bisnis digital, alam otomatisasi operasional, dan analisis hingga 
            automasi lengkap untuk menghemat waktu Anda.
          </p>
        </div>

        {/* Features Title */}
        <h3 className="text-5xl font-bold text-white text-center mb-16">
          Fitur Utama
        </h3>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto auto-rows-fr">
          {/* Card 1 */}
          <div className="bg-dark-card border border-purple-500/30 rounded-2xl p-10 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-3xl font-bold text-white mb-3">
              <span className="text-primary">Automasi</span> Keuangan Cerdas
            </h4>
            <p className="text-gray-500 text-lg flex-grow leading-relaxed max-w-md">
              Pengelolaan data keuangan otomatis dan terintegrasi untuk hasil yang lebih akurat.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-10 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-3xl font-bold text-white mb-3">
              <span className="text-primary">Analisis Pasar</span> & Kompetitor
            </h4>
            <p className="text-gray-500 text-lg flex-grow leading-relaxed max-w-md">
              Insight berbasis data untuk membuka jalan bisnis yang lebih baik dan kompetitif.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-11 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-3xl font-bold text-white mb-3">
              Automasi <span className="text-primary">Workflow</span> Bisnis
            </h4>
            <p className="text-gray-500 text-lg flex-grow leading-relaxed max-w-md">
              Otomatiskan workflow bisnis Anda tanpa repot untuk efisiensi maksimal.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-11 hover:border-primary transition hover:shadow-glow-purple">
            <h4 className="text-3xl font-bold text-white mb-3">
              Strategi Berbasis <span className="text-primary">Berbasis AI</span>
            </h4>
            <p className="text-gray-500 text-lg flex-grow leading-realaxed max-w-md">
              Strategi bisnis berbasis AI untuk pertumbuhan yang lebih terukur dan presisi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;