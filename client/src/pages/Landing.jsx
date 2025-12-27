  import React from 'react';
  import Navbar from '../components/Navbar';
  import HeroSection from '../components/HeroSection';
  import FeaturesSection from '../components/FeaturesSection';
  import BenefitsSection from '../components/BenefitsSection';
  // import CTASection from '../components/CTASection';
  import PricingSection from '../components/PricingSection';
  import Footer from '../components/Footer';

  function Landing() {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        {/* <CTASection /> */}
        <PricingSection />
        <Footer />
      </div>
    );
  }

  export default Landing;