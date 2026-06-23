import { motion } from 'framer-motion';
import { FiUsers, FiCompass, FiAward, FiHeart } from 'react-icons/fi';

// Your static imported image file asset
import img1 from '../assets/ourstory.jpeg';

export default function OurStory() {

  const textFadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 bg-tassar-cream min-h-screen text-tassar-earth pb-24"
    >

      {/* SECTION 1: MASTER PAGE HERO HEADER */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-left border-b border-tassar-earth/30 pb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-tassar-madderRed font-bold block">✦ THE HUMAN LEGACY</span>
        <h1 className="text-4xl md:text-6xl font-display font-medium mt-1 text-black">Our Story</h1>
      </header>

      {/* SECTION 2: EDITORIAL GENERATIONAL STORY BLOCK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-tassar-raw/30 pb-16">

        {/* Left Side: Massive Editorial Text Narrative */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textFadeUp}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight text-black">
            A Dying Thread of Living History
          </h2>

          <div className="space-y-4 text-sm md:text-base font-normal leading-relaxed text-tassar-earth">
            <p>
              We inherited this sacred pit-loom tradition directly from our ancestors. For generations, the rhythm of intersecting threads was the heartbeat of our community. In the old generation, every single household adapted this culture, transforming wild forest silk filaments into exceptional tapestries and carving a meaningful life out of it.
            </p>
            <p className="font-medium text-tassar-madderRed border-l-2 border-tassar-madderRed pl-4 italic bg-white/40 py-2">
              Today, that heritage is dying. As new generations pass by, fewer hands are willing to adapt these meticulous handloom techniques. Modern machinery has overrun the markets, but we refuse to surrender.
            </p>
            <p>
              Our process remains entirely unhurried and completely handmade. Absolutely no machines are used in our workshop hubs. Now, <strong className="font-bold underline decoration-tassar-deepGold">fewer than 10 families from our entire community</strong> carry this knowledge forward. TassarWeavers exists as a final stand to protect their craft, preserve their livelihoods, and deliver true authentic luxury direct to your home.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Re-engineered Image Container Card */}
        <div className="lg:col-span-5 w-full aspect-[4/3] sm:aspect-square bg-neutral-100 border border-tassar-raw/40 relative shadow-xl overflow-hidden group">

          {/* IMAGE PLACEMENT: Set to w-full h-full object-cover with clean contrast overlay settings */}
          <img
            src={img1}
            alt="Our Story Workshop Visual"
            className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700 z-0"
          />

          {/* Dark gradient shadow tint at bottom to make card text pop vividly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

          {/* Top Row Indicators */}
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start text-white/80 drop-shadow-sm">
            <span className="font-mono text-[10px] tracking-widest uppercase bg-black/30 backdrop-blur-sm px-2 py-0.5 border border-white/10">Visual Record Archive</span>
            <FiAward className="text-xl text-tassar-deepGold" />
          </div>

          {/* Lower Content Plate Information */}
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/40 p-4 border border-white/10 backdrop-blur-md">
            <h4 className="font-display text-base font-bold text-white">The Last Remaining Pit Looms</h4>
            <p className="text-[11px] text-tassar-cream/90 font-light mt-1 leading-normal">
              Preserving authentic, unhurried handloom craftsmanship directly out of the local cluster.
            </p>
          </div>
        </div>

      </section>
    </motion.div>
  );
}