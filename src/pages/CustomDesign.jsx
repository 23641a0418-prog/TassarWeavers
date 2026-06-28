import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUploadCloud, FiCheck, FiInfo, FiSliders, FiCalendar, FiCompass, FiLayers, FiActivity, FiUser } from 'react-icons/fi';
import { supabase } from '../supabaseClient';

export default function CustomDesign() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [designSpecs, setDesignSpecs] = useState({
    name: '',
    phone: '',
    description: '',
    colors: '',
    budget: 15000,
    timeline: ''
  });

  const [attachedFile, setAttachedFile] = useState(null);

  const handleInputChange = (e) => {
    setDesignSpecs({ ...designSpecs, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleCustomFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let uploadedImageUrl = 'No image attached';

    try {
      // 1. If a file is attached, upload it directly to Supabase Storage
      if (attachedFile) {
        // Create a unique file name to avoid collisions
        const fileExt = attachedFile.name.split('.').pop();
        const fileName = `custom-${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload binary to your public bucket (e.g., 'product-images')
        const { error: uploadError } = await supabase.storage
          .from('product-media')
          .upload(filePath, attachedFile);

        if (uploadError) throw uploadError;

        // Get the public CDN URL of the uploaded image
        const { data } = supabase.storage
          .from('product-media')
          .getPublicUrl(filePath);

        uploadedImageUrl = data.publicUrl;
      }

      // 2. Construct the clean WhatsApp message incorporating the live image link
      const whatsappMessage = `🧵 *TassarWeavers - Custom Design Proposal* 🧵\n\n` +
        `👤 *Name:* ${designSpecs.name}\n` +
        `📞 *Phone:* ${designSpecs.phone}\n` +
        `🎨 *Colors:* ${designSpecs.colors}\n` +
        `💰 *Budget Baseline:* ₹${Number(designSpecs.budget).toLocaleString('en-IN')}\n` +
        `📅 *Delivery Date:* ${designSpecs.timeline}\n\n` +
        `🖼️ *Design Image Link:* ${uploadedImageUrl}\n\n` +
        `📝 *Design Requirements:* \n${designSpecs.description}`;

      // 3. Safely encode URL message payload string
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // 4. Define target workspace contact number
      const whatsappNumber = "919505610080";

      // 5. Fire native browser redirect routing
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

      // 6. Complete wizard tracking view sequence
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error handling custom design proposal:', error.message);
      alert('Failed to upload image sketch template. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen bg-tassar-cream pb-24"
    >
      {/* SECTION HEADER OVERVIEW */}
      <div className="mb-12 text-left border-b border-tassar-earth/30 pb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-tassar-madderRed font-bold block">✦ BESPOKE WEAVING CONSULTATION</span>
        <h1 className="text-4xl md:text-6xl font-display text-tassar-earth font-medium mt-1">Custom Design</h1>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          /* THE RICH TWO-COLUMN INTERACTIVE STUDIO INTERFACE */
          <motion.div
            key="custom-workspace-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >

            {/* COLUMN 1: THE ARTISAN WORKSHOP GUIDE BOX */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-tassar-earth text-tassar-cream p-6 border border-tassar-earth shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-tassar-raw font-mono block mb-2">The Creation Pipeline</span>
                  <h3 className="font-display text-xl text-white mb-4">Loom Blueprinting Stages</h3>
                </div>

                <div className="space-y-6 mt-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-xs text-tassar-deepGold font-mono font-bold">1</div>
                    <div>
                      <h4 className="text-sm font-medium text-white flex items-center gap-2"><FiCompass /> Blueprint Mapping</h4>
                      <p className="text-xs text-tassar-cream/80 font-light mt-1 leading-relaxed">Our cluster heads analyze your custom colors and drawing configurations to trace warp arrangements.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-xs text-tassar-deepGold font-mono font-bold">2</div>
                    <div>
                      <h4 className="text-sm font-medium text-white flex items-center gap-2"><FiLayers /> Yarn Setup</h4>
                      <p className="text-xs text-tassar-cream/80 font-light mt-1 leading-relaxed">Wild organic silk is collected, hand-reeled, and set up on a raw wooden pit loom dedicated to your project run.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-xs text-tassar-deepGold font-mono font-bold">3</div>
                    <div>
                      <h4 className="text-sm font-medium text-white flex items-center gap-2"><FiActivity /> Shuttle Interlace</h4>
                      <p className="text-xs text-tassar-cream/80 font-light mt-1 leading-relaxed">The weaving process begins at a standard pace of 2 to 3 meters a day to guarantee precise quality control standards.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-[10px] text-tassar-raw tracking-wider font-mono uppercase">
                  ✦ Direct Community Engagement Model
                </div>
              </div>

              {/* DARK STIPULATION NOTIFICATION FRAME */}
              <div className="p-5 bg-white border border-tassar-raw/60 flex items-start gap-3 shadow-sm">
                <FiInfo className="text-tassar-madderRed text-lg shrink-0 mt-0.5" />
                <p className="text-xs text-tassar-earth font-normal leading-relaxed">
                  <strong>Artisan Guild Protocol:</strong> Because custom pit-loom processing requires separate dye configurations, our community lead coordinator will personally voice-call your contact phone line to verify your design blueprint before locking active operations.
                </p>
              </div>
            </div>


            {/* COLUMN 2: THE HIGH-CONTRAST INTAKE CONFIGURATION CARD */}
            <form onSubmit={handleCustomFormSubmit} className="lg:col-span-8 space-y-6 bg-white border border-tassar-raw/40 p-6 md:p-8 shadow-md">

              {/* SECTION HEADER A */}
              <div className="border-b border-tassar-raw/30 pb-3 flex items-center gap-2 text-tassar-earth">
                <FiUser className="text-tassar-deepGold" />
                <h3 className="font-display text-lg font-bold text-tassar-earth tracking-wide">1. Contact Identification</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2">Your Full Name</label>
                  <input
                    type="text" name="name" value={designSpecs.name} onChange={handleInputChange}
                    className="w-full bg-tassar-cream/20 border border-tassar-raw/60 p-3 text-sm font-medium text-tassar-earth outline-none focus:border-tassar-earth focus:bg-white transition-all rounded-none"
                    placeholder="please enter your name" required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2">Contact Phone Number</label>
                  <input
                    type="tel" name="phone" value={designSpecs.phone} onChange={handleInputChange}
                    className="w-full bg-tassar-cream/20 border border-tassar-raw/60 p-3 text-sm font-medium text-tassar-earth outline-none focus:border-tassar-earth focus:bg-white transition-all rounded-none"
                    placeholder="e.g., +91 98765 43210" required
                  />
                </div>
              </div>

              {/* SECTION HEADER B */}
              <div className="border-b border-tassar-raw/30 pt-4 pb-3 flex items-center gap-2 text-tassar-earth">
                <FiCompass className="text-tassar-deepGold" />
                <h3 className="font-display text-lg font-bold text-tassar-earth tracking-wide">2. Project Specifications</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2">Design Requirements & Parameters</label>
                <textarea
                  name="description" rows="4" value={designSpecs.description} onChange={handleInputChange}
                  className="w-full bg-tassar-cream/20 border border-tassar-raw/60 p-3 text-sm font-medium text-tassar-earth outline-none focus:border-tassar-earth focus:bg-white transition-all resize-none leading-relaxed rounded-none"
                  placeholder="Describe your design patterns, layout choices, or specific zari borders you want implemented..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2">Preferred Color Configuration</label>
                <input
                  type="text" name="colors" value={designSpecs.colors} onChange={handleInputChange}
                  className="w-full bg-tassar-cream/20 border border-tassar-raw/60 p-3 text-sm font-medium text-tassar-earth outline-none focus:border-tassar-earth focus:bg-white transition-all rounded-none"
                  placeholder="e.g., Natural unrefined amber body with deep charcoal borders"
                  required
                />
              </div>

              {/* BUDGET SLIDER & TIMELINE DUAL WIDGET BOX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-tassar-cream/30 border border-tassar-raw/30 p-5 shadow-inner">

                {/* Target Budget Element */}
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-tassar-earth flex items-center gap-1.5">
                      <FiSliders className="text-tassar-deepGold" /> Budget Baseline
                    </label>
                    <span className="font-mono text-sm font-bold text-tassar-madderRed bg-white px-2 py-0.5 border border-tassar-raw/30">
                      ₹{Number(designSpecs.budget).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range" name="budget" min="3000" max="50000" step="500"
                    value={designSpecs.budget} onChange={handleInputChange}
                    className="w-full accent-tassar-earth h-1.5 bg-tassar-raw/40 cursor-pointer"
                  />
                  <span className="text-[10px] text-tassar-earth font-normal mt-2 leading-tight">Wage requirements vary based on material costs and total weaving hours.</span>
                </div>

                {/* Target Delivery Date Element */}
                <div className="flex flex-col justify-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2 flex items-center gap-1.5">
                    <FiCalendar className="text-tassar-deepGold" /> Needed Delivery Date
                  </label>
                  <input
                    type="date" name="timeline" value={designSpecs.timeline} onChange={handleInputChange}
                    className="w-full bg-white border border-tassar-raw/60 p-2.5 text-sm font-medium text-tassar-earth outline-none focus:border-tassar-earth rounded-none"
                    required
                  />
                </div>

              </div>

              {/* MOBILE-OPTIMIZED REFERENCE DRAWING IMAGE UPLOADER */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tassar-earth mb-2">Motif Reference Sketch or Photograph</label>

                <div className="w-full bg-tassar-cream/20 border-2 border-dashed border-tassar-raw/50 p-8 flex flex-col items-center justify-center text-center relative hover:border-tassar-earth hover:bg-white transition-all duration-300 shadow-sm">
                  <input
                    type="file" accept="image/*" id="motif-file-input"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    disabled={isUploading}
                  />

                  <div className="p-3 rounded-full bg-white text-tassar-deepGold text-2xl mb-3 border border-tassar-raw/30 shadow-sm">
                    <FiUploadCloud />
                  </div>

                  {attachedFile ? (
                    <div>
                      <p className="text-sm font-mono font-bold text-tassar-earth bg-tassar-cream px-3 py-1 border border-tassar-raw/30">{attachedFile.name}</p>
                      <p className="text-xs text-tassar-madderRed font-medium mt-1">Tap container to change your image document</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-tassar-earth font-semibold">Click to upload drawing or snap a photo using your camera</p>
                      <p className="text-[11px] text-tassar-earth font-medium mt-0.5 font-mono">Accepts high-resolution PNG, JPG, and JPEG files</p>
                    </div>
                  )}
                </div>
              </div>

              {/* MASTER SUBMIT GATE ACTION TRIGGER */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full mt-4 bg-tassar-earth text-tassar-cream py-4 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors duration-300 shadow-md disabled:bg-tassar-raw/60"
              >
                {isUploading ? 'UPLOADING SKETCH TO GALLERY...' : 'SUBMIT CUSTOM DESIGN PROPOSAL'}
              </button>

            </form>
          </motion.div>
        ) : (
          /* THE INTENT-DRIVEN WORKSPACE SUCCESS SCREEN CONSOLE VIEW */
          <motion.div
            key="custom-success-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-tassar-raw/40 p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-md max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-tassar-earth text-tassar-cream flex items-center justify-center text-xl mb-5 shadow-xl shadow-tassar-earth/10">
              <FiCheck />
            </div>

            <h2 className="font-display text-2xl md:text-3xl text-tassar-earth font-bold mb-3">Proposal Registered</h2>

            <p className="text-sm text-tassar-earth font-normal leading-relaxed max-w-md mx-auto">
              Thank you! Your custom design configurations and drawing files have been logged into the cluster archive. Our master coordinator will evaluate the loom technicalities and call your phone line within a few hours to establish structural workflow parameters.
            </p>

            <div className="mt-10 pt-6 border-t border-tassar-raw/20 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { setIsSubmitted(false); setAttachedFile(null); }}
                className="text-xs font-bold tracking-widest uppercase text-tassar-earth hover:text-tassar-madderRed transition-colors py-2 px-4"
              >
                SUBMIT ANOTHER PROPOSAL
              </button>

              <Link to="/">
                <button className="bg-tassar-earth text-tassar-cream py-3 px-6 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors duration-300">
                  RETURN TO HOME
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}