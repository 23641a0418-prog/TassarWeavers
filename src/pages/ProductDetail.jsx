import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiShoppingBag, FiCheck, FiShield, FiTruck, FiRefreshCw, FiChevronRight } from 'react-icons/fi';
import { getLiveCatalog } from './AdminDashboard';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedPopup, setAddedPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const catalogData = await getLiveCatalog();
      const matched = catalogData.find(p => String(p.id) === String(id));
      setProduct(matched);
      setLoading(false);
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCartAction = () => {
    if (!product || !product.in_stock) return;
    addToCart(product);
    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tassar-cream">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-tassar-earth border-t-transparent animate-spin" />
          <p className="text-xs uppercase tracking-widest font-mono text-tassar-earth font-bold">Loading Artisan Creation...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-tassar-cream px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-black mb-2">Creation Not Found</h2>
        <p className="text-sm text-neutral-600 mb-6 max-w-sm">The product profile you are trying to view might have been moved or archived.</p>
        <button onClick={() => navigate('/shop')} className="bg-tassar-earth text-tassar-cream px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-tassar-madderRed transition-colors">
          Return to Marketplace
        </button>
      </div>
    );
  }

  const imagesArray = product.images || [];
  const hasImages = imagesArray.length > 0;
  const checkInStock = product.in_stock === true;

  const technicalSpecifications = [
    { label: "Collection Classification", value: product.category },
    { label: "Material Composition", value: "100% Pure Organic Hand-Reeled Tassar Silk" },
    { label: "Loom Operation", value: "Traditional Wooden Pit-Loom Framework" },
    { label: "Dyeing Process Matrix", value: "Organic Plant Extracts & Mineral Mordants" },
    { label: "Standard Dimensions", value: product.category === "Sarees" ? "5.5 Meters + 80cm Integrated Blouse Piece" : "Standard Traditional Full Length Cut" },
    { label: "Yarn Density Core", value: "80s High-Count Premium Twisted Structural Warp" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 bg-tassar-cream min-h-screen pb-32 text-black antialiased">

      {/* NOTIFICATION TOAST OVERLAY LAYER */}
      <AnimatePresence>
        {addedPopup && (
          <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className="fixed top-28 left-1/2 z-50 bg-black text-white px-6 py-3 shadow-2xl flex items-center gap-3 border border-white/10 min-w-[280px]">
            <div className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs"><FiCheck /></div>
            <p className="text-xs font-bold tracking-wider uppercase">Added To Your Collection Cart</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* BACK NAVIGATION STRIP */}
        <button onClick={() => navigate('/shop')} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-tassar-earth hover:text-tassar-madderRed transition-colors mb-8">
          <FiArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        {/* COMPONENT LAYOUT MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* LEFT CONTAINER VIEWPORT: LUXURY MEDIA SUITE */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            <div className="w-full aspect-[4/3] bg-white border border-tassar-raw/30 relative shadow-sm overflow-hidden group flex items-center justify-center">
              {hasImages ? (
                <img src={imagesArray[activeImageIdx]} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" />
              ) : (
                <div className="text-neutral-300 font-mono text-xs uppercase tracking-widest">No Media Available</div>
              )}

              {!checkInStock && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="border-2 border-tassar-madderRed text-tassar-madderRed px-6 py-2 text-xs font-black tracking-widest uppercase rotate-[-6deg]">SOLD OUT FROM LOOM</span>
                </div>
              )}
            </div>

            {/* MULTI THUMBNAIL MATRIX */}
            {imagesArray.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {imagesArray.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 bg-white border transition-all overflow-hidden shrink-0 shadow-sm relative ${
                      activeImageIdx === idx ? 'border-tassar-madderRed ring-2 ring-tassar-madderRed/10 scale-95' : 'border-tassar-raw/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT CONTAINER VIEWPORT: PREMIUM PRODUCT IDENTITY META */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-8 text-left">

            {/* BRANDING NODE HEADER */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tassar-madderRed">
                <span>Authentic Weave</span>
                <FiChevronRight />
                <span className="text-tassar-earth">{product.category}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">{product.name}</h1>

              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-mono text-3xl font-black text-black">₹{Number(product.price).toLocaleString('en-IN')}</span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-bold uppercase tracking-wider">Inclusive of local cluster wages</span>
              </div>
            </div>

            {/* PRODUCT DESCRIPTION ACCORDION CONTAINER */}
            <div className="bg-white border border-tassar-raw/40 p-5 shadow-sm space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-tassar-earth border-b border-tassar-raw/20 pb-2">Artisan Heritage & Narrative</h3>
              {/* Renders dynamic description text cleanly from Supabase mapping */}
              <p className="text-sm leading-relaxed text-neutral-800 font-normal whitespace-pre-line pt-1">
                {product.description || "This exceptional masterpiece represents generations of handloom perfection, meticulously crafted by local cluster weavers utilizing raw traditional techniques."}
              </p>
            </div>

            {/* TECHNICAL ACCORDION PROFILE CHART */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-tassar-earth">Product Specifications</h3>
              <div className="border border-tassar-raw/40 bg-white shadow-sm divide-y divide-tassar-raw/20">
                {technicalSpecifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 p-3.5 gap-1 sm:gap-4 items-center text-xs">
                    <div className="sm:col-span-4 font-bold text-tassar-earth uppercase tracking-wide">{spec.label}</div>
                    <div className="sm:col-span-8 text-neutral-900 font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRUST METRIC BADGES STRIP */}
            <div className="grid grid-cols-3 gap-2 bg-white/60 border border-tassar-raw/30 p-3.5 text-center">
              <div className="flex flex-col items-center space-y-1 text-tassar-earth"><FiShield className="text-base text-tassar-deepGold" /><span className="text-[9px] font-bold uppercase tracking-wider">100% Handloom</span></div>
              <div className="flex flex-col items-center space-y-1 text-tassar-earth"><FiTruck className="text-base text-tassar-deepGold" /><span className="text-[9px] font-bold uppercase tracking-wider">Free Shipping</span></div>
              <div className="flex flex-col items-center space-y-1 text-tassar-earth"><FiRefreshCw className="text-base text-tassar-deepGold" /><span className="text-[9px] font-bold uppercase tracking-wider">Artisan Certified</span></div>
            </div>

            {/* DESKTOP SECURE TRANSACTION LAUNCH RIG */}
            <div className="hidden lg:block pt-2">
              <button
                onClick={handleAddToCartAction}
                disabled={!checkInStock}
                className={`w-full py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-3 rounded-none ${
                  checkInStock
                    ? 'bg-tassar-earth text-tassar-cream hover:bg-tassar-madderRed hover:shadow-lg'
                    : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed shadow-none'
                }`}
              >
                <FiShoppingBag className="text-sm" />
                {checkInStock ? "Add Artisan Creation to Cart" : "Loom Configuration Unavailable"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE PERSISTENT FLOATING STICKY ACTION CONSOLE FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-tassar-raw/30 p-4 z-40 shadow-[0_-4px_14px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase font-bold text-tassar-earth tracking-widest">Price Matrix</span>
          <span className="font-mono text-xl font-black text-black">₹{Number(product.price).toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleAddToCartAction}
          disabled={!checkInStock}
          className={`px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 grow justify-center rounded-none shadow-sm ${
            checkInStock
              ? 'bg-tassar-earth text-tassar-cream active:bg-tassar-madderRed'
              : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
          }`}
        >
          <FiShoppingBag /> {checkInStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>

    </motion.div>
  );
}