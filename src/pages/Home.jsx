import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative min-h-screen p-8 bg-mart-stone text-mart-dark"
    >
      <header className="max-w-4xl mx-auto mt-20">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-mart-dark leading-tight">
          Woven by Hand. <br />
          <span className="italic text-mart-emerald">Perfected by</span> Generations.
        </h1>
        <p className="mt-6 text-xl text-mart-dark/80 max-w-lg font-sans">
          Authentic craft, harvested and woven by hand in the rural clusters of Telangana.
        </p>
      </header>

      {/* 
          Updated Grid: Using horizontal-friendly layout classes.
          To make this even more horizontal, you can replace 'grid-cols-1 md:grid-cols-2' 
          with 'flex flex-row overflow-x-auto scrollbar-hide gap-6'
      */}
      <section className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-mart-emerald/20 bg-white/50 backdrop-blur-sm hover:border-mart-emerald transition-colors">
          <h2 className="text-2xl font-display font-bold text-mart-dark">Curated Heritage</h2>
          <p className="mt-2 font-sans text-mart-dark/70">Explore our collection of hand-loomed masterpieces.</p>
        </div>
        <div className="p-8 border border-mart-emerald/20 bg-white/50 backdrop-blur-sm hover:border-mart-emerald transition-colors">
          <h2 className="text-2xl font-display font-bold text-mart-dark">New Arrivals</h2>
          <p className="mt-2 font-sans text-mart-dark/70">Fresh looms from the workshop floor.</p>
        </div>
      </section>
    </motion.div>
  );
}
