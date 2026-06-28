  return (
    <div className="relative min-h-screen w-full">
      {/* FORCE THE IMAGE TO STAY FIXED */}
      <div 
        className="fixed inset-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/weaveing__tassarcolny_20260629_000807_826.jpg')",
          backgroundColor: '#FBF9F5' // Fallback color
        }}
      />

      {/* WRAP ALL YOUR SECTIONS IN THIS */}
      <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="relative z-0">
        {/* ... Paste all your existing <section> components here ... */}
      </motion.div>
    </div>
  );
