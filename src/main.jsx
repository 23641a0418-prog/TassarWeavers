import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { getHomeLayoutSettings } from './AdminDashboard';

export default function Home() {
  const [layout, setLayout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncDatabaseBanners = async () => {
      const cloudHomeLayout = await getHomeLayoutSettings();
      if (cloudHomeLayout) {
        setLayout({
          curatedTitle: cloudHomeLayout.curated_title,
          curatedSubtitle: cloudHomeLayout.curated_subtitle,
          curatedSlots: cloudHomeLayout.curated_slots || [],
          newArrivalsTitle: cloudHomeLayout.new_arrivals_title,
          newArrivalsSubtitle: cloudHomeLayout.new_arrivals_subtitle,
          newArrivalSlots: cloudHomeLayout.new_arrival_slots || []
        });
      }
    };
    syncDatabaseBanners();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  if (!layout) return <div className="min-h-screen" />;

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-display text-tassar-earth font-medium">
            Woven by Hand. <br/> <span className="font-serif italic text-tassar-deepGold">Perfected by</span> Generations.
          </motion.h1>
        </div>
      </section>

      {/* 2. CATALOG */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-display text-tassar-earth mb-10">{layout.curatedSubtitle}</h2>
        </div>
      </section>

    </motion.div>
  );
}
