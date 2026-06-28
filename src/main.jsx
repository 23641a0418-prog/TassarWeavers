import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMaximize2, FiImage, FiAward } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { getHomeLayoutSettings } from './AdminDashboard';
import pit_loom from '../assets/therawpitloom.jpeg';
import PHeritage from '../assets/PreservingHeritage.jpeg';

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

  const navigateToShopProduct = (productId) => {
    if (!productId) navigate('/shop');
    else navigate('/shop', { state: { highlightProductId: Number(productId) } });
  };

  const navigateToShopCategory = (categoryName) => {
    if (!categoryName) navigate('/shop');
    else navigate('/shop', { state: { autoFilterCategory: categoryName } });
  };

  if (!layout) return <div className="min-h-screen" />;

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="relative">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.span variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-tassar-madderRed font-bold mb-4 block">✦ Authentic Rural Indian Craftsmanship</motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-display text-tassar-earth font-medium leading-[1.1]">
              Woven by Hand. <br/> <span className="font-serif italic text-tassar-deepGold">Perfected by</span> Generations.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. CATALOG */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-display text-tassar-earth mb-10">{layout.curatedSubtitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {layout.curatedSlots.map((slot) => (
              <div key={slot.id} onClick={() => navigateToShopCategory(slot.targetCategory)} className="aspect-video border border-tassar-earth/10 p-8 cursor-pointer hover:border-tassar-madderRed transition-colors">
                <h4 className="font-display text-2xl font-bold text-tassar-earth">{slot.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-4xl font-display text-tassar-earth mb-8">{layout.newArrivalsSubtitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {layout.newArrivalSlots.map((item) => (
              <div key={item.id} onClick={() => navigateToShopProduct(item.targetProductId)} className="border border-tassar-earth/10 p-4 cursor-pointer hover:border-tassar-madderRed transition-colors">
                <h4 className="text-lg font-bold text-tassar-earth">{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HERITAGE */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-display text-tassar-earth">No middle channels. Just true weavers.</h3>
      </section>

    </motion.div>
  );
}
