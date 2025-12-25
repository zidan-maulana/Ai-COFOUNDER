import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Zap,
  BarChart3,
  Workflow,
  Shield,
  Clock,
  Users,
  MessageSquare,
  Database,
  Bell,
  Lock,
  Smartphone,
  Globe
} from 'lucide-react';

function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Asisten AI yang siap membantu operasional bisnis Anda 24/7. Dapat menjawab pertanyaan, memberikan insight, dan membantu pengambilan keputusan.',
      benefits: [
        'Natural language processing',
        'Context-aware responses',
        'Multi-language support',
        'Learning from interactions'
      ]
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Otomasi proses bisnis dengan integrasi n8n. Buat workflow custom tanpa coding untuk menghemat waktu dan meningkatkan efisiensi.',
      benefits: [
        'Drag-and-drop workflow builder',
        'Pre-built templates',
        'Integration dengan 200+ apps',
        'Scheduled automation'
      ]
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Dashboard analytics yang powerful untuk monitoring performa bisnis secara real-time dengan visualisasi data yang mudah dipahami.',
      benefits: [
        'Real-time data visualization',
        'Custom reports',
        'KPI tracking',
        'Predictive analytics'
      ]
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Kelola dan sinkronisasi data dari berbagai sumber dengan mudah. Integrasi dengan spreadsheet dan database eksternal.',
      benefits: [
        'Multi-source data sync',
        'Excel/Google Sheets integration',
        'Data transformation',
        'Automated backups'
      ]
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Sistem notifikasi cerdas yang memberikan alert penting sesuai preferensi Anda melalui email, SMS, atau push notification.',
      benefits: [
        'Real-time alerts',
        'Custom notification rules',
        'Multi-channel delivery',
        'Priority filtering'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Keamanan tingkat enterprise dengan enkripsi end-to-end, 2FA, dan compliance dengan standar internasional.',
      benefits: [
        'End-to-end encryption',
        'Two-factor authentication',
        'Role-based access control',
        'SOC 2 compliance'
      ]
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Fitur kolaborasi tim yang memudahkan koordinasi, sharing insights, dan monitoring progress bersama.',
      benefits: [
        'Real-time collaboration',
        'Team workspaces',
        'Activity tracking',
        'Permission management'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Akses platform dari mana saja dengan aplikasi mobile yang responsive dan mudah digunakan.',
      benefits: [
        'iOS & Android apps',
        'Offline mode',
        'Push notifications',
        'Optimized interface'
      ]
    },
    {
      icon: Globe,
      title: 'API Integration',
      description: 'REST API yang lengkap untuk integrasi dengan sistem existing Anda. Documentation dan SDK tersedia.',
      benefits: [
        'RESTful API',
        'Webhooks support',
        'SDK libraries',
        'Comprehensive documentation'
      ]
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Tim support yang selalu siap membantu Anda dengan response time yang cepat dan solusi yang efektif.',
      benefits: [
        'Live chat support',
        'Email support',
        'Knowledge base',
        'Video tutorials'
      ]
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Infrastruktur yang reliable dengan uptime 99.9% dan response time yang cepat untuk pengalaman yang smooth.',
      benefits: [
        '99.9% uptime SLA',
        'Fast response time',
        'Auto-scaling',
        'CDN-powered delivery'
      ]
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'Privasi data Anda adalah prioritas kami. Kami tidak pernah membagikan data Anda dengan pihak ketiga.',
      benefits: [
        'GDPR compliant',
        'Data ownership',
        'Privacy by design',
        'Transparent policies'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Fitur Lengkap untuk{' '}
            <span className="text-primary">Bisnis Modern</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Semua yang Anda butuhkan untuk mengelola dan mengotomasi operasional bisnis dalam satu platform
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-dark-lighter border border-dark-border rounded-xl p-6 hover:border-primary/50 transition group"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                    <Icon className="text-primary" size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-primary mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Transformasi Bisnis Anda?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Mulai sekarang dan rasakan perbedaannya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Mulai Gratis
            </Link>
            <Link
              to="/pricing"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-dark text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Lihat Harga
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Features;