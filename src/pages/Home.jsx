import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative min-h-screen p-8"
    >
      <header className="max-w-4xl mx-auto mt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          Woven by Hand. <br />
          <span className="italic text-red-700">Perfected by</span> Generations.
        </h1>
        <p className="mt-6 text-xl text-gray-700 max-w-lg">
          Authentic wild Tassar silk, harvested and woven by hand in the rural clusters of Telangana.
        </p>
      </header>

      <section className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-gray-200 bg-white/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold">Curated Heritage</h2>
          <p className="mt-2">Explore our collection of hand-loomed masterpieces.</p>
        </div>
        <div className="p-8 border border-gray-200 bg-white/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <p className="mt-2">Fresh looms from the workshop floor.</p>
        </div>
      </section>
    </motion.div>
  );
}
