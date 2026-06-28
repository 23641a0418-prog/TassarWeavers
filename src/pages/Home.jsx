import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMaximize2, FiHeart, FiStar, FiPhone, FiMessageSquare, FiMail, FiMapPin, FiChevronDown, FiImage, FiAward, FiCheckCircle } from 'react-icons/fi';
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

  if (!layout) return <div className="min-h-screen bg-tassar-cream" />;

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="bg-tassar-cream/80 backdrop-blur-sm relative">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pt-24 w-full">
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.span variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-tassar-madderRed font-bold mb-4 block">
              ✦ Authentic Rural Indian Craftsmanship
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-display text-tassar-earth font-medium tracking-tight leading-[1.1]">
              Woven by Hand. <br />
              <span className="font-serif italic text-tassar-deepGold font-light">Perfected by</span> <br />
              Generations.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-sm md:text-lg text-tassar-earth font-light leading-relaxed max-w-lg">
              Every single thread of wild Tassar silk is carefully harvested, spun, and interlaced on heritage wooden pit-looms.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <motion.button whileHover={{ y: -4, backgroundColor: "#8B2635" }} className="px-6 py-4 bg-tassar-earth text-tassar-cream font-medium tracking-widest text-xs flex items-center justify-center gap-4">
                  DISCOVER MUSEUM COLLECTION <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CURATED CATALOG */}
      <section className="pt-20 pb-16 px-6 bg-white/70 backdrop-blur-sm border-t border-tassar-raw/20 text-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-display text-tassar-earth mb-10">{layout.curatedSubtitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {layout.curatedSlots.map((slot) => (
              <div key={slot.id} onClick={() => navigateToShopCategory(slot.targetCategory)} className="aspect-video bg-tassar-cream/50 shadow-sm relative overflow-hidden group cursor-pointer p-8">
                <h4 className="font-display text-2xl font-bold text-tassar-earth">{slot.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-16 px-6 bg-tassar-earth/90 backdrop-blur-sm text-tassar-cream text-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-4xl font-display text-tassar-cream mb-8">{layout.newArrivalsSubtitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {layout.newArrivalSlots.map((item) => (
              <div key={item.id} onClick={() => navigateToShopProduct(item.targetProductId)} className="bg-white/10 p-4 border border-white/10">
                <h4 className="text-lg font-bold text-tassar-cream">{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUALITY MATRIX */}
      <section className="py-24 px-6 bg-white/70 backdrop-blur-sm border-t border-tassar-raw/20 text-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-tassar-earth">Uncompromising Standards</h2>
        </div>
      </section>

    </motion.div>
  );
      }
        }
