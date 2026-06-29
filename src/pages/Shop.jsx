import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiCheckCircle, FiXCircle, FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getLiveCatalog } from './AdminDashboard';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [catalog, setCatalog] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const [carouselIndices, setCarouselIndices] = useState({});
  const [highlightedId, setHighlightedId] = useState(null);

  const allowedCategories = ["Sarees", "Plain Cloth", "Shawls", "Dhoti Pancha"];

  useEffect(() => {
    const syncDatabaseCatalog = async () => {
      const cloudCatalogData = await getLiveCatalog();
      setCatalog(cloudCatalogData);
    };
    syncDatabaseCatalog();
  }, []);

  useEffect(() => {
    if (routerLocation.state?.autoFilterCategory) {
      const incomingCat = routerLocation.state.autoFilterCategory;
      setSelectedCategory(incomingCat === "Dhoti & Pancha" ? "Dhoti Pancha" : incomingCat);
    }
  }, [routerLocation.state?.autoFilterCategory]);

  useEffect(() => {
    if (routerLocation.state?.highlightProductId && catalog.length > 0) {
      const targetId = routerLocation.state.highlightProductId;
      setHighlightedId(targetId);
      const matchedItem = catalog.find(p => String(p.id) === String(targetId));
      if (matchedItem) setSelectedCategory(matchedItem.category);
    }
  }, [routerLocation.state?.highlightProductId, catalog]);

  useEffect(() => {
    if (highlightedId && catalog.length > 0) {
      setTimeout(() => {
        const itemDomElement = document.getElementById(`product-node-${highlightedId}`);
        if (itemDomElement) itemDomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightedId, selectedCategory, catalog]);

  const filteredProducts = selectedCategory === 'All' ? catalog : catalog.filter(p => p.category === selectedCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 bg-mart-stone min-h-screen pb-24 text-mart-dark">
      <header className="max-w-6xl mx-auto px-6 mb-10 border-b border-mart-soft pb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-mart-emerald font-bold block">✦ DIRECT FROM THE LOOM</span>
        <h1 className="text-4xl font-display font-bold mt-1 text-mart-dark">Artisan Marketplace</h1>
        <p className="text-base text-mart-dark/70 font-sans mt-2 max-w-xl">Browse authentic creations from our local community weaving hubs.</p>
      </header>

      {/* FILTER RIBBON */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-row overflow-x-auto gap-3 border-b border-mart-soft pb-2 scrollbar-hide">
          <button onClick={() => { setSelectedCategory('All'); setHighlightedId(null); }} className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${selectedCategory === 'All' ? 'bg-mart-dark text-mart-stone' : 'text-mart-dark hover:bg-mart-soft'}`}>
            All ({catalog.length})
          </button>
          {allowedCategories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setHighlightedId(null); }} className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${selectedCategory === cat ? 'bg-mart-dark text-mart-stone' : 'text-mart-dark hover:bg-mart-soft'}`}>
              {cat === "Dhoti Pancha" ? "Dhoti & Pancha" : cat} ({catalog.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* HORIZONTAL PRODUCT SCROLL CONTAINER */}
      <main className="max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-mart-soft p-16 text-center">
              <FiShoppingBag className="text-3xl text-mart-soft mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-mart-dark">No Items Available</h3>
            </div>
          ) : (
            <motion.div key="grid-active" className="flex flex-row overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x">
              {filteredProducts.map((product) => (
                <div key={product.id} id={`product-node-${product.id}`} onClick={() => navigate(`/product/${product.id}`)}
                  className={`flex-shrink-0 w-80 bg-white p-4 shadow-sm border cursor-pointer hover:shadow-lg transition-all snap-center ${highlightedId === product.id ? 'border-mart-emerald ring-2 ring-mart-emerald/20' : 'border-mart-soft'}`}>
                  
                  <div className="w-full aspect-[4/3] bg-mart-stone border border-mart-soft relative flex items-center justify-center mb-4">
                    {product.images?.length > 0 ? <img src={product.images[carouselIndices[product.id] || 0]} className="w-full h-full object-cover" alt={product.name} /> : <FiImage className="text-2xl text-mart-soft" />}
                  </div>

                  <h3 className="font-display text-xl font-bold text-mart-dark truncate">{product.name}</h3>
                  <p className="text-sm text-mart-dark/60 font-sans line-clamp-2 mt-1 mb-4">{product.description}</p>
                  <p className="font-mono text-lg font-black text-mart-dark mb-4">₹{Number(product.price).toLocaleString('en-IN')}</p>

                  <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} disabled={!product.in_stock}
                    className={`w-full py-3 text-xs font-bold tracking-widest uppercase transition-all ${product.in_stock ? 'bg-mart-dark text-mart-stone hover:bg-mart-emerald' : 'bg-mart-soft text-mart-dark/50 cursor-not-allowed'}`}>
                    {product.in_stock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
                  }
