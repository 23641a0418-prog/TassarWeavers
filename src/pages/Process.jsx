import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiActivity } from 'react-icons/fi';

// STATIC IMAGE IMPORT ASSIGNMENTS (Replace filenames to match your local folder files)
import step1Img from '../assets/CocoonStory.jpeg';
import step2Img from '../assets/download (1).jpeg';
import step3Img from '../assets/weavingonpitloom.jpeg';
import step4Img from '../assets/dyingcolors.jpeg';
import step5Img from '../assets/spinningthread.jpeg';

export default function Process() {
  const [activeStage, setActiveStage] = useState(0);

  // Redefined 5 simple stages with straightforward, high-impact language
  const stages = [
    {
      id: 0,
      phase: "Stage 01",
      title: "The Cocoon's Story",
      summary: "How natural gold cocoons grow wild in the forest.",
      description: "Our silk starts in the wild jungle. Unlike normal silkworms kept inside houses, wild Tassar silkworms live freely on outdoor Asan and Arjun trees. They eat fresh leaves directly from nature. This open-air forest life gives the cocoons their famous, natural golden-cream color. Local tribal families search the woods to gather these mature cocoons carefully by hand.",
      imageUrl: step1Img
    },
    {
      id: 1,
      phase: "Stage 02",
      title: "Spinning the Thread",
      summary: "Softening cocoons and drawing out long raw yarn.",
      description: "First, we boil the hard cocoons in large pots of clean hot water over a fire. This softens the natural sticky glue holding the shell together. Once softened, our village women find the end of the silk line. They gently pull the tiny threads from multiple cocoons together and twist them across their hands to create a strong, clean, usable bundle of thread.",
      imageUrl: step5Img
    },
    {
      id: 2,
      phase: "Stage 03",
      title: "Dyeing with Forest Colors",
      summary: "Boiling yarn bundles in 100% natural, permanent color mixtures.",
      description: "We don't use harsh factory chemicals. Instead, we cook our raw yarn in boiling pots mixed with colors picked from the forest. We use indigo leaves for deep blues, madder root plants for bright reds, pomegranate peels for rich earth tones, and pure turmeric powder for striking yellows. This slow boiling locks the color deep inside the fiber so it never washes out.",
      imageUrl: step4Img
    },
    {
      id: 3,
      phase: "Stage 04",
      title: "Preparing for the Horizontal Run",
      summary: "Spinning and aligning threads for the crossways weaving paths.",
      description: "Before weaving can start, we must prepare the thread specifically for the crossways path (the horizontal run on the loom). Artisans spin the dyed yarn onto small wooden bobbins and layout spools. This careful sorting makes sure the horizontal threads glide perfectly through the loom without getting tangled, knotted, or snapping apart during active weaving.",
      imageUrl: step2Img
    },
    {
      id: 4,
      phase: "Stage 05",
      title: "Weaving on the Pit Loom",
      description: "The long bundles of thread are stretched tight onto a traditional wooden pit loom built over a small hole in the ground. The master weaver sits over the pit to work the wood pedals with his feet while sliding a wooden shuttle smoothly back and forth with his hands. Working in total rhythm, they weave only two meters a day to make sure your saree is completely flawless.",
      imageUrl: step3Img
    }
  ];

  // SMOOTH SCROLL HANDLER INTERFACE
  const scrollToStage = (stageId) => {
    setActiveStage(stageId);
    const targetElement = document.getElementById(`process-stage-${stageId}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // Positions the component comfortably in the middle of the user's screen
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 bg-tassar-cream min-h-screen pb-28 text-tassar-earth font-sans"
    >
      {/* MINIMALIST HEADER BAR */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b border-tassar-earth/20 pb-10">
        <div className="md:col-span-8 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-tassar-madderRed font-bold flex items-center gap-2">
            <FiActivity className="animate-pulse" /> Traditional Craft Steps
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-black tracking-tight">
            How We Make It
          </h1>
          <p className="text-sm md:text-base text-neutral-700 font-normal leading-relaxed max-w-xl pt-2">
            See how our artisan families create pure wild silk textiles by hand. No machines, no toxic waste—just incredible human skill passed down through generations.
          </p>
        </div>

        {/* Quick Click Interactive Selector Hub */}
        <div className="md:col-span-4 flex flex-wrap gap-2 md:justify-end">
          {stages.map((stg) => (
            <button
              key={stg.id}
              onClick={() => scrollToStage(stg.id)}
              className={`px-3 py-1.5 text-xs font-bold font-mono tracking-wider border transition-all duration-300 ${activeStage === stg.id ? 'bg-tassar-earth text-tassar-cream border-tassar-earth shadow-sm' : 'bg-white text-black border-tassar-raw/30 hover:border-black'}`}
            >
              0{stg.id + 1}
            </button>
          ))}
        </div>
      </header>

      {/* RE-ENGINEERED CONTENT GRIDS LAYOUT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* LEFT COLUMN: ACTIVE INTERACTIVE RADAR STATUS PANEL */}
        <aside className="lg:col-span-4 space-y-4 hidden lg:block sticky top-32 text-left bg-white border border-tassar-raw/40 p-6 shadow-sm">
          <span className="text-[10px] font-mono tracking-widest text-tassar-madderRed uppercase font-bold block border-b pb-2 mb-4">
            Workshop Tracking Log
          </span>
          <div className="space-y-1">
            {stages.map((stg) => (
              <button
                key={stg.id}
                onClick={() => scrollToStage(stg.id)}
                className={`w-full text-left p-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-all duration-300 group ${activeStage === stg.id ? 'bg-tassar-cream text-black font-black border-l-4 border-tassar-earth' : 'text-neutral-500 hover:text-black hover:bg-tassar-cream/30'}`}
              >
                <span>0{stg.id + 1}. {stg.title.split('.')[1] || stg.title}</span>
                <FiArrowRight className={`opacity-0 transition-opacity duration-300 ${activeStage === stg.id ? 'opacity-100 text-tassar-earth' : 'group-hover:opacity-50'}`} />
              </button>
            ))}
          </div>
          <div className="pt-6 border-t border-dashed border-tassar-raw/30 text-[11px] text-neutral-500 leading-normal font-serif italic">
            "Every step relies entirely on human hands, natural elements, and legacy knowledge."
          </div>
        </aside>

        {/* RIGHT COLUMN: BIG ASYMMETRIC VISUAL AND TEXT BLUEPRINTS */}
        <section className="lg:col-span-8 space-y-24">
          {stages.map((stage, idx) => (
            <motion.div
              id={`process-stage-${stage.id}`}
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
              onViewportEnter={() => setActiveStage(stage.id)}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-tassar-raw/30 md:border-none p-5 md:p-0 shadow-sm md:shadow-nonescroll-mt-12"
            >

              {/* Image Frame Column (Alternating on Desktop for High-End Editorial Feel) */}
              <div className={`md:col-span-5 w-full bg-neutral-100 border border-tassar-raw/40 overflow-hidden shadow-md group ${
                                  idx % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                } ${
                                  stage.id === 4 ? 'h-auto max-h-[500px]' : 'aspect-[4/3]'
                                }`}>
                {stage.imageUrl ? (
                  <img
                    src={stage.imageUrl}
                    alt={stage.title}
                    className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-tassar-cream/30">
                    [Image Placeholder]
                  </div>
                )}
              </div>

              {/* Story Description Text Column */}
              <div className={`md:col-span-7 text-left space-y-3 ${idx % 2 === 0 ? 'md:order-2 md:pl-4' : 'md:order-1 md:pr-4'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 bg-tassar-earth text-tassar-cream font-bold shadow-sm">
                    {stage.phase}
                  </span>
                  <div className="h-[1px] flex-grow bg-tassar-raw/20" />
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-black tracking-tight pt-1">
                  {stage.title}
                </h2>

                <p className="text-sm md:text-base text-black font-normal leading-relaxed font-sans">
                  {stage.description}
                </p>

                {stage.summary && (
                  <div className="text-[11px] uppercase font-mono tracking-wider text-tassar-madderRed font-bold bg-tassar-cream/40 p-2 border-l border-tassar-madderRed inline-block mt-2">
                    ✦ Key Goal: {stage.summary}
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </section>

      </main>
    </motion.div>
  );
}