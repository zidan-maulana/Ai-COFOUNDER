import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6">
          Transformasikan Operasional Bisnis Anda dengan{' '}
          <span className="text-purple-500">Karo Agent</span>.
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 leading-relaxed px-2">
          Sistem AI yang canggih untuk membantu pemilik mengelola operasi proyek, menganalisis data, dan membuat keputusan bisnis yang tepat secara otomatis.
        </p>

        {/* CTA Button */}
        <Link
          to="/auth/register"
          className="inline-block bg-white text-black px-12 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all shadow-lg"
        >
          Mulai Sekarang
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;