import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [shippingForm, setShippingForm] = useState({ name: '', phone: '', address: '' });

  // =========================================================================
  // PRODUCTION ADMINISTRATIVE ROUTING NODE
  // =========================================================================
  const ADMIN_WHATSAPP_NUMBER = '919603903021'; // Your exact target cluster smartphone lines

  const handleFormChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || isSending) return;

    setIsSending(true);
    const generatedId = `#TW-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. COMMITS DATA ENVELOPE SECURELY TO THE SUPABASE ARCHIVE
      const { error } = await supabase.from('orders').insert([{
        order_id: generatedId,
        customer_name: shippingForm.name,
        customer_phone: shippingForm.phone,
        customer_address: shippingForm.address,
        items: cartItems.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
        total_amount: getCartTotal()
      }]);

      if (error) throw new Error(error.message);

      // 2. COMPILES FULL-FLEDGED INVENTORY ROWS WITH ATTACHED IMAGE STORAGE LINKS
      const itemsListText = cartItems.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        // Extracts the full live Supabase URL string path to append text preview visuals
        const imageAssetUrl = (item.images && item.images[0])
          ? `\n   🖼️ Product Image: ${item.images[0]}`
          : '\n   🖼️ Product Image: [No Image Available]';

        return `${idx + 1}. ${item.name}\n   Quantity: ${item.quantity}\n   Price: ₹${item.price.toLocaleString('en-IN')} each\n   Subtotal: ₹${itemTotal.toLocaleString('en-IN')}${imageAssetUrl}`;
      }).join('\n\n');

      // 3. SECURE HIGH-END TEXT INVOICE FORMATTING
      const whatsappText = `✦ TASSARWEAVERS - NEW HANDLOOM INVOICE ✦\n` +
                           `====================================\n\n` +
                           `📦 ORDER METADATA:\n` +
                           `• Order ID: ${generatedId}\n` +
                           `• Timestamp: ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN')}\n\n` +
                           `👤 CUSTOMER DETAILS:\n` +
                           `• Full Name: ${shippingForm.name}\n` +
                           `• Contact Line: ${shippingForm.phone}\n` +
                           `• Shipping Destination:\n  ${shippingForm.address}\n\n` +
                           `🧵 SELECTED PRODUCTS PROFILE:\n` +
                           `------------------------------------\n` +
                           `${itemsListText}\n` +
                           `------------------------------------\n\n` +
                           `💳 FINANCIAL SUMMARY:\n` +
                           `• Delivery Charges: FREE [Cooperative Promo]\n` +
                           `• GRAND TOTAL DUE: ₹${getCartTotal().toLocaleString('en-IN')}\n\n` +
                           `====================================\n` +
                           `Please secure stock clearance and authorize warp sorting profiles!`;

      // 4. TRANSFERS INVOICE PACKET VIA DIRECT NATIVE LINK OUTLET
      const encodedMessage = encodeURIComponent(whatsappText);
      const whatsappApiUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

      window.open(whatsappApiUrl, '_blank');

      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error("Checkout transaction run aborted:", err.message);
      alert("System cloud synchronization error. Please check your network parameters and try again.");
    } finally {
      setIsSending(false);
    }
  };

  // RENDER SELECTION B: ORDER COMPLETED SUCCESS PANEL
  if (orderComplete) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 px-6 text-center max-w-md mx-auto min-h-screen flex flex-col justify-center pb-24 text-tassar-earth">
        <div className="w-16 h-16 rounded-full bg-tassar-earth text-tassar-cream flex items-center justify-center text-2xl mx-auto mb-6 shadow-md"><FiCheckCircle /></div>
        <h2 className="font-display text-3xl font-bold text-black mb-3">Order Invoice Formed!</h2>
        <p className="text-sm text-neutral-700 font-normal leading-relaxed mb-8">Your details are verified and logged on our server panel. Please finalize transmission on your WhatsApp app frame to complete processing with our loom cluster masters.</p>
        <Link to="/shop" className="bg-tassar-earth text-tassar-cream py-3.5 px-6 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors">Return to Marketplace</Link>
      </motion.div>
    );
  }

  // RENDER SELECTION A: ACTIVE BASKET OVERVIEW LOGS
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen bg-tassar-cream pb-24 text-tassar-earth">
      <div className="mb-10 text-left border-b border-tassar-earth/30 pb-5">
        <span className="text-xs uppercase tracking-[0.2em] text-tassar-madderRed font-bold block">✦ YOUR WEAVE SELECTS</span>
        <h1 className="text-4xl font-display font-bold mt-1 text-black">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white border border-tassar-raw/40 p-16 text-center max-w-xl mx-auto shadow-sm">
          <FiShoppingBag className="text-4xl text-tassar-raw mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-black mb-2">Your Cart is Empty</h3>
          <p className="text-sm text-black font-normal mb-8">Explore the workshop output to collect your custom runs.</p>
          <Link to="/shop" className="bg-tassar-earth text-tassar-cream py-3 px-6 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors">Return to Marketplace</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ITEM MATRIX ITEMS */}
          <div className="lg:col-span-7 bg-white border border-tassar-raw/40 p-5 shadow-sm space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-tassar-raw/20 pb-4 last:border-b-0 last:pb-0 gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-16 h-16 bg-tassar-cream border border-tassar-raw/30 flex items-center justify-center overflow-hidden shrink-0">
                    {item.images && item.images[0] ? <img src={item.images[0]} className="w-full h-full object-contain" /> : <FiShoppingBag className="text-tassar-raw/60" />}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-black">{item.name}</h4>
                    <span className="text-[10px] uppercase tracking-wide bg-tassar-cream text-tassar-earth px-1.5 py-0.5 font-bold border border-tassar-raw/20 inline-block mt-1">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="flex items-center border border-tassar-raw/60 bg-tassar-cream/30">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-black hover:bg-white transition-colors"><FiMinus className="text-xs" /></button>
                    <span className="px-3 font-mono text-sm font-bold text-black">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-black hover:bg-white transition-colors"><FiPlus className="text-xs" /></button>
                  </div>

                  <div className="text-right font-mono min-w-[90px]">
                    <p className="text-sm font-bold text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-neutral-500 font-normal">₹{Number(item.price).toLocaleString('en-IN')} each</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-tassar-madderRed p-1 transition-colors"><FiTrash2 className="text-sm" /></button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT CONFIGURATOR MODULE */}
          <div className="lg:col-span-5 bg-white border border-tassar-raw/40 p-5 shadow-sm text-left space-y-6">
            <h3 className="font-display text-lg font-bold text-black border-b border-tassar-raw/20 pb-2">Order Summary</h3>
            <div className="flex justify-between items-center text-sm"><span className="text-black font-normal">Subtotal Amount</span><span className="font-mono font-bold text-black text-base">₹{getCartTotal().toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between items-center text-xs text-neutral-600 border-b border-tassar-raw/20 pb-4"><span>Standard Delivery</span><span className="font-mono text-emerald-700 font-bold">FREE</span></div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Fulfillment Information</h4>
              <input type="text" name="name" value={shippingForm.name} onChange={handleFormChange} placeholder="Shipping Full Name" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-3 text-xs font-bold text-black outline-none focus:bg-white focus:border-tassar-earth rounded-none" required />
              <input type="tel" name="phone" value={shippingForm.phone} onChange={handleFormChange} placeholder="Delivery Phone Line" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-3 text-xs font-bold text-black outline-none focus:bg-white focus:border-tassar-earth rounded-none" required />
              <textarea name="address" value={shippingForm.address} onChange={handleFormChange} rows="2" placeholder="Full Delivery Address" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-3 text-xs font-bold text-black outline-none focus:bg-white focus:border-tassar-earth resize-none rounded-none" required />

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-tassar-earth text-tassar-cream py-4 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors duration-300 flex items-center justify-center gap-2 mt-2 shadow-sm disabled:bg-neutral-400 disabled:cursor-not-allowed rounded-none"
              >
                {isSending ? "Processing Invoice..." : "Generate Invoice & Send WhatsApp"} <FiArrowRight />
              </button>
            </form>
          </div>

        </div>
      )}
    </motion.div>
  );
}
