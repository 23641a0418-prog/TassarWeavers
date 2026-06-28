import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMaximize2, FiHeart, FiStar, FiPhone, FiMessageSquare, FiMail, FiMapPin, FiChevronDown, FiImage, FiAward, FiCheckCircle } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { getHomeLayoutSettings } from './AdminDashboard';
import pit_loom from '../assets/therawpitloom.jpeg';
import PHeritage from '../assets/PreservingHeritage.jpeg';

export default function Home() {
  const [layout, setLayout] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncDatabaseBanners = async () => {
      const cloudHomeLayout = await getHomeLayoutSettings();
      if (cloudHomeLayout) {
        // Kept direct mappings to align natively with rendering arrays below
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

  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      metric: "100%",
      title: "Handmade Pit-Loomed",
      shortDesc: "Crafted entirely on traditional wooden pit looms with absolute human precision.",
      longDesc: "Every centimeter of cloth is woven using zero electricity. The weaver hand-forces the wooden shuttle through thousands of individual warp threads. This human-only technique creates subtle, natural texture variations that machine looms can never replicate, making each saree completely one-of-a-kind."
    },
    {
      id: 1,
      metric: "Gen-5",
      title: "Traditional Weaving",
      shortDesc: "Preserving generation-old techniques passed down through artisan lineages.",
      longDesc: "Our weavers don't learn from handbooks—they carry the ancestral design memories of the Pochampally and rural Telangana clusters. By honoring these complex mathematical counting patterns on the loom, we preserve deep national identity elements that are currently on the verge of extinction."
    },
    {
      id: 2,
      metric: "Pure",
      title: "Sustainable Wild Silk",
      shortDesc: "Woven exclusively with authentic, sustainably sourced wild Tassar silk filaments.",
      longDesc: "Unlike commercial mulberry silk where silkworms are strictly farmed indoors, wild Tassar silk cocoons are gathered sustainably from natural forest trees. The silk has a unique deep copper-gold sheen and acts as a natural thermal insulator—keeping you cool in summer and warm in winter."
    },
    {
      id: 3,
      metric: "Bespoke",
      title: "Custom Design Canvas",
      shortDesc: "Collaborate directly with weavers to bring personalized patterns to life.",
      longDesc: "We provide an open design bridge. If you have a specific heirloom layout pattern, width requirement, or a custom natural color tone run in mind, our dashboard lets you communicate parameters directly to the master weavers to forge a completely bespoke legacy piece."
    },
    {
      id: 4,
      metric: "0%",
      title: "Zero Middle Channels",
      shortDesc: "Eliminating middle agents so 100% of value goes straight to the village.",
      longDesc: "Traditional supply chains drain up to 70% of a garment's final value into corporate marketing agents, wholesale brokers, and physical retail overheads. By cutting them out completely, we ensure that every single rupee you spend goes straight into the community bank accounts of the families holding the shuttle."
    }
  ];

  const faqs = [
    { q: "How do I place an order?", a: "Once you explore our marketplace and find a piece you love, clicking 'Add to Cart' aggregates your chosen items inside the persistent shopping basket. From there, you can navigate seamlessly to your checkout panel to finalize your fulfillment logs." },
    { q: "Are these silks certified authentic?", a: "Yes. Every single shipment comes bundled with an artisan verification card signed by the weaving cluster head, guaranteeing 100% genuine handloom processing and wild Tassar origin validation." },
    { q: "Can I request modifications to color tones?", a: "Absolutely. While ready pieces are shipped immediately, you can use our dedicated Custom Design page to submit request guidelines if you want an entirely custom color run or specific length changes." }
  ];

  // REDIRECTION TARGET MAPPING UTILITIES - Fixed routing to seamlessly filter categories
  const navigateToShopProduct = (productId) => {
    if (!productId) navigate('/shop');
    else navigate('/shop', { state: { highlightProductId: Number(productId) } });
  };

  const navigateToShopCategory = (categoryName) => {
    if (!categoryName) {
      navigate('/shop');
    } else {
      // Passes the clean variable state package down to Shop.jsx's active interceptor hooks
      navigate('/shop', { state: { autoFilterCategory: categoryName } });
    }
  };

  if (!layout) return <div className="min-h-screen bg-tassar-cream" />;

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="bg-tassar-cream relative">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,62,61,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(74,62,61,0.015)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0" />

        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto opacity-10 pointer-events-none px-6 md:px-12 z-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
              className="w-[1px] bg-tassar-earth h-full"
            />
          ))}
        </div>

        <div className="absolute right-[-5%] top-[-5%] w-[700px] h-[700px] bg-tassar-deepGold/10 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute left-[-5%] bottom-[-5%] w-[600px] h-[600px] bg-tassar-madderRed/5 rounded-full blur-[110px] pointer-events-none z-0" />

        <div className="hidden xl:flex absolute left-8 bottom-24 flex-col items-center gap-4 z-10 pointer-events-none select-none">
          <span className="text-[10px] tracking-[0.4em] text-tassar-earth/60 font-medium uppercase font-mono [writing-mode:vertical-lr] rotate-180">
            ORIGIN // FORAGED WILD FOREST COCOONS
          </span>
          <div className="h-12 w-[1px] bg-tassar-earth/30" />
          <span className="text-[11px] font-display text-tassar-deepGold italic">2026 Run</span>
        </div>

        <div className="hidden xl:flex absolute right-8 bottom-24 flex-col items-center gap-4 z-10 pointer-events-none select-none">
          <span className="text-[11px] font-mono font-bold text-tassar-madderRed tracking-wider">100%</span>
          <div className="h-12 w-[1px] bg-tassar-earth/30" />
          <span className="text-[10px] tracking-[0.4em] text-tassar-earth/60 font-medium uppercase font-mono [writing-mode:vertical-lr]">
            PIT-LOOM CRAFTED CULTURES
          </span>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 pt-24 w-full">
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
              Every single thread of wild Tassar silk is carefully harvested, spun, and interlaced on heritage wooden pit-looms to create individual masterpieces.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/shop">
                <motion.button
                  whileHover={{ y: -4, backgroundColor: "#8B2635" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-tassar-earth text-tassar-cream font-medium tracking-widest text-xs flex items-center justify-center gap-4 transition-colors duration-300 shadow-xl shadow-tassar-earth/10"
                >
                  DISCOVER MUSEUM COLLECTION
                  <FiArrowRight className="text-sm" />
                </motion.button>
              </Link>

              <Link to="/process" className="group flex items-center justify-center gap-3 text-xs tracking-widest font-bold text-tassar-earth py-3">
                <span>OUR COCOON STORY</span>
                <span className="h-[1px] w-6 bg-tassar-earth transition-all duration-300 group-hover:w-12" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="lg:col-span-5 relative flex items-center justify-center w-full max-w-sm lg:max-w-none mx-auto"
          >
            <div className="w-full aspect-[4/5] bg-gradient-to-tr from-tassar-earth to-[#5C4E4D] p-8 md:p-12 flex flex-col justify-between text-tassar-cream relative shadow-2xl overflow-hidden border border-tassar-raw/20 group">
              <img
                src={pit_loom}
                alt="Raw Pit Loom"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 z-0"
              />
              <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-display italic text-base text-tassar-raw">Est. Tradition</span>
                <FiMaximize2 className="text-tassar-raw/60 group-hover:scale-110 transition-transform" />
              </div>

              <div className="relative z-10 mt-auto text-left">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-wide mb-1 text-white">The Raw Pit Loom</h3>
                <p className="text-[10px] text-tassar-raw tracking-wide font-light uppercase">Village Workshop Visual Frame</p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 bg-tassar-deepGold w-0 group-hover:w-full transition-all duration-700" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC ADMIN-DRIVEN CURATED CATALOG SHOWCASE */}
      <section className="pt-20 pb-16 px-6 bg-white border-t border-tassar-raw/20 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-tassar-deepGold font-bold">{layout.curatedTitle}</span>
              <h2 className="text-2xl md:text-5xl font-display text-tassar-earth mt-1">{layout.curatedSubtitle}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {layout.curatedSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => navigateToShopCategory(slot.targetCategory)}
                className="aspect-video border border-tassar-raw/30 bg-tassar-cream/20 shadow-sm relative overflow-hidden group cursor-pointer flex flex-col justify-between p-6 md:p-8"
              >
                {slot.image ? (
                  <img src={slot.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" alt="" />
                ) : (
                  <div className="absolute inset-0 bg-tassar-earth/5 flex items-center justify-center"><FiAward className="text-3xl text-tassar-raw/30" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />

                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-white/20 text-white rounded-full">Heritage Segment</span>
                  <FiHeart className="text-white opacity-60" />
                </div>

                <div className="relative z-20">
                  <h4 className="font-display text-2xl font-bold text-white mb-0.5">{slot.name}</h4>
                  <p className="text-[10px] text-tassar-raw tracking-wider uppercase font-mono"> {slot.targetCategory || "All Items"}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-tassar-deepGold"><span>EXPLORE SHOP</span><FiArrowRight /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC ADMIN-DRIVEN NEW ARRIVALS SHOWCASE */}
      <section className="py-16 px-6 bg-tassar-earth text-tassar-cream border-b border-tassar-raw/20 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-tassar-raw font-bold">{layout.newArrivalsTitle}</span>
              <h2 className="text-xl md:text-4xl font-display text-tassar-cream mt-0.5">{layout.newArrivalsSubtitle}</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold tracking-widest uppercase border-b border-tassar-raw pb-0.5 text-tassar-raw hover:text-tassar-cream hover:border-tassar-cream transition-colors">
              View All Arrivals
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {layout.newArrivalSlots.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateToShopProduct(item.targetProductId)}
                className="group cursor-pointer bg-white/5 border border-white/10 p-4 flex flex-col justify-between min-h-[320px] relative transition-all hover:bg-white/10 shadow-sm"
              >
                <div className="w-full aspect-square bg-tassar-cream/10 relative overflow-hidden flex flex-col justify-between p-3 border border-white/5 mb-4">
                  {item.image ? (
                    <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0" alt="" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"><FiImage className="text-2xl text-white/20" /></div>
                  )}
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  <span className="relative z-20 text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 bg-black/50 text-tassar-raw self-start">Loom Fresh Run</span>
                  <div className="relative z-20 mt-auto md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs font-bold text-tassar-raw"><span>OPEN IN STOREFRONT</span><FiArrowRight /></div>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <div>
                    <h4 className="font-display text-lg font-bold text-tassar-cream group-hover:text-tassar-deepGold transition-colors">{item.name}</h4>
                    <p className="text-[11px] text-tassar-raw/70 mt-0.5 font-sans italic">Click to view in marketplace</p>
                  </div>
                  <FiStar className="text-tassar-deepGold text-xs mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRESERVING HERITAGE INTEGRATION */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="border border-tassar-earth/10 p-3 bg-white/50 backdrop-blur-sm max-w-md lg:max-w-none mx-auto w-full">
          <div className="aspect-video bg-neutral-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group border border-tassar-raw/10 shadow-sm">
            <img
              src={PHeritage}
              alt="Preserving Heritage"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 z-0"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-10" />

            <div className="relative z-20 w-full">
              <p className="font-display italic text-sm md:text-base px-2 text-white text-center leading-relaxed font-medium drop-shadow-sm">
                "Our hands weave the legacy of wild forests into premium drapes."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-tassar-deepGold mt-3 font-mono block text-center font-bold">
                — Master Weaver Cluster
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center text-left">
          <span className="text-xs uppercase tracking-widest text-tassar-madderRed font-bold mb-2 block">✦ Preserving Heritage</span>
          <h3 className="text-2xl md:text-4xl font-display text-tassar-earth leading-tight">No middle channels. Just true weavers connecting directly with your home.</h3>
          <p className="mt-4 text-xs md:text-sm text-tassar-earth font-light leading-relaxed">
            Traditional village artisans often lose major revenue shares to heavy e-commerce agents and wholesale distributors. TassarWeavers establishes a direct bridge, ensuring fair sustainability practices and unmatched authentic item validation.
          </p>
        </div>
      </section>

      {/* 5. INTERACTIVE ARTISAN QUALITY & TRUST MATRIX */}
      <section className="py-24 px-6 bg-white border-t border-b border-tassar-raw/20 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-tassar-raw/20 pb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-tassar-madderRed font-bold block">✦ UNCOMPROMISING STANDARDS</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-black mt-2">Why TassarWeavers</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const isCurrent = selectedFeature === feat.id;
                return (
                  <motion.div
                    key={feat.id}
                    onClick={() => setSelectedFeature(feat.id)}
                    onMouseEnter={() => setSelectedFeature(feat.id)}
                    whileHover={{ y: -2 }}
                    className={`p-6 border cursor-pointer transition-all duration-300 relative group flex flex-col justify-between min-h-[180px] ${
                      isCurrent
                        ? 'bg-tassar-earth text-tassar-cream border-tassar-earth shadow-md'
                        : 'bg-tassar-cream/10 border-tassar-raw/30 hover:border-black hover:bg-white'
                    }`}
                  >
                    <div className={`absolute top-0 right-0 h-full w-1 transition-all ${isCurrent ? 'bg-tassar-deepGold' : 'bg-transparent group-hover:bg-tassar-raw/40'}`} />

                    <div className="flex justify-between items-start">
                      <span className={`font-mono text-xl font-black ${isCurrent ? 'text-tassar-deepGold' : 'text-tassar-madderRed'}`}>
                        {feat.metric}
                      </span>
                      <span className={`text-[10px] font-mono tracking-widest ${isCurrent ? 'text-tassar-raw' : 'text-neutral-400'}`}>
                        [ Pillar 0{feat.id + 1} ]
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className={`font-display text-lg font-bold mb-1.5 ${isCurrent ? 'text-white' : 'text-black'}`}>
                        {feat.title}
                      </h3>
                      <p className={`text-xs font-normal leading-relaxed ${isCurrent ? 'text-tassar-cream/80' : 'text-neutral-700'}`}>
                        {feat.shortDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="lg:col-span-5 h-full lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-tassar-cream/30 border border-tassar-earth p-8 text-left space-y-6 h-full flex flex-col justify-between shadow-sm relative min-h-[380px]"
                >
                  <div className="absolute bottom-4 right-4 text-4xl font-mono font-black opacity-5 pointer-events-none select-none">
                    {features[selectedFeature].metric}
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-tassar-madderRed uppercase font-bold block border-b border-tassar-raw/20 pb-2">
                      ✦ Dynamic Impact Verification
                    </span>
                    <h3 className="font-display text-3xl font-bold text-black tracking-tight leading-tight">
                      {features[selectedFeature].title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-800 font-normal leading-relaxed font-serif italic pt-2">
                      "{features[selectedFeature].longDesc}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-tassar-raw/20 flex justify-between items-center text-xs font-bold text-tassar-earth">
                    <span className="font-mono text-[10px]">VERIFIED ARTISAN METRIC DATA // 2026</span>
                    <span className="flex items-center gap-1 uppercase tracking-wider text-[11px] text-tassar-madderRed">
                      Pillar Locked <FiCheckCircle />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INQUIRIES CLARIFIED (FAQ Accordion Panel Layout) */}
      <section className="py-20 px-6 bg-tassar-cream/40 overflow-hidden text-left border-b border-tassar-raw/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-tassar-madderRed font-bold">Common Queries</span>
            <h2 className="text-3xl font-display text-tassar-earth mt-1">Inquiries Clarified</h2>
            <div className="h-[1px] w-12 bg-tassar-earth/30 mx-auto mt-3" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="bg-white border border-tassar-raw/30 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between font-display text-base font-bold text-black text-left outline-none"
                  >
                    <span>{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <FiChevronDown className="text-tassar-earth" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-neutral-700 font-sans leading-relaxed border-t border-tassar-raw/10 bg-tassar-cream/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HIGH-END RESPONSIVE EDITORIAL FOOTER SECTION */}
      <footer className="bg-tassar-earth text-tassar-cream pt-16 pb-8 px-6 border-t border-tassar-raw/20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-white/10">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-tassar-raw block mb-1">TassarWeavers</span>
              <h2 className="font-display text-2xl md:text-3xl font-medium tracking-wide text-white">Get in Touch</h2>
              <div className="h-[2px] w-12 bg-tassar-deepGold mt-2" />
            </div>

            <div className="space-y-3.5 text-sm font-light">
              <a href="tel:+919505610080" className="flex items-center gap-3 hover:text-tassar-deepGold transition-colors group py-0.5">
                <FiPhone className="text-tassar-raw group-hover:text-tassar-deepGold shrink-0" />
                <span>+91 95056 10080</span>
              </a>

              <a
                href="https://wa.me/919505610080?text=Hello%20TassarWeavers,%20I'd%20like%20to%20inquire%20about%20your%20handloom%20masterpieces."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-tassar-deepGold transition-colors group py-0.5 text-tassar-deepGold font-medium tracking-wide underline underline-offset-4 decoration-tassar-deepGold/40"
              >
                <FiMessageSquare className="shrink-0" />
                <span>WhatsApp Us Directly</span>
              </a>

              <a href="mailto:saiganeshmanyam18@gmail.com" className="flex items-center gap-3 hover:text-tassar-deepGold transition-colors group py-0.5">
                <FiMail className="text-tassar-raw group-hover:text-tassar-deepGold shrink-0" />
                <span>saiganeshmanyam18@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 py-0.5 leading-relaxed text-tassar-cream/80">
                <FiMapPin className="text-tassar-raw mt-1 shrink-0" />
                <span>Manikanta Tassar Sarees, Tassar Colony, Mahadevpur, Jayashankar Bhupalpally, Telangana - 505504</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full h-[240px] sm:h-[280px] bg-white/5 border border-white/10 relative shadow-md">
            <iframe
              title="Manikanta Handlooom Tassar Sarees Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.453616693124!2d79.97577757492245!3d18.733264562643207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a32f1002b930375%3A0xcdf79576689beb3e!2sManikanta%20Tasser%20sarees!5e0!3m2!1sen!2sin!4v1782622715701!5m2!1sen!2sin"
              className="w-full h-full border-0 opacity-85 invert-[0.92] hue-rotate-[185deg] brightness-[0.88] contrast-[1.12]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono tracking-wider text-tassar-raw">
          <p>© 2026 TassarWeavers - Handcrafted with care.</p>
          <Link
            to="/admin/dashboard"
            className="hover:text-tassar-madderRed transition-colors font-bold border-b border-transparent hover:border-tassar-madderRed pb-0.5 uppercase"
          >
            Console
          </Link>
        </div>
      </footer>

    </motion.div>
  );
}