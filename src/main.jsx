  return (
    <div className="relative min-h-screen w-full">
      {/* THIS IS THE PERMANENT BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/weaveing__tassarcolny_20260629_000807_826.jpg')" }}
      />

      {/* YOUR CONTENT LAYER */}
      <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="bg-tassar-cream/80 backdrop-blur-sm min-h-screen">
        {/* ... ALL YOUR PREVIOUS SECTIONS GO HERE ... */}
      </motion.div>
    </div>
  );
