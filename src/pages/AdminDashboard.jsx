import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlusCircle, FiTrash2, FiEdit2, FiCheck, FiX, FiBox, FiCheckCircle, FiXCircle, FiList, FiTrendingUp, FiUploadCloud, FiImage, FiHome, FiShoppingBag, FiLock, FiLogOut, FiArrowLeft, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const getLiveCatalog = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error reading catalog from Supabase:", error.message);
    return [];
  }
  return data;
};

export const getHomeLayoutSettings = async () => {
  const { data, error } = await supabase
    .from('home_layout')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error("Error reading home layout from Supabase:", error.message);
    return null;
  }
  return data;
};

export const uploadImageToCloud = async (file) => {
  if (!file) return null;
  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from('product-media')
    .upload(filePath, file);

  if (error) {
    console.error("Cloud Asset Storage Error:", error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-media')
    .getPublicUrl(filePath);

  return publicUrl;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [homeLayout, setHomeLayout] = useState(null);

  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [isSubmittingArrival, setIsSubmittingArrival] = useState(false);
  const [isSubmittingCurated, setIsSubmittingCurated] = useState(false);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Sarees', desc: '', images: [] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', category: '', desc: '', images: [], inStock: true });

  const [newArrivalInput, setNewArrivalInput] = useState({ name: '', targetProductId: '', image: '', fileObj: null });
  const [newCuratedInput, setNewCuratedInput] = useState({ name: '', targetCategory: 'Sarees', image: '', fileObj: null });

  const allowedCategories = ["Sarees", "Plain Cloth", "Shawls", "Dhoti & Pancha"];

  useEffect(() => {
    const checkActiveSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        loadDashboardData();
      }
    };
    checkActiveSession();
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    const liveItems = await getLiveCatalog();
    setProducts(liveItems);

    const liveHome = await getHomeLayoutSettings();
    setHomeLayout(liveHome);

    const { data: liveOrders, error: orderErr } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!orderErr && liveOrders) {
      const formattedOrders = liveOrders.map(o => ({
        id: o.id,
        orderId: o.order_id,
        date: new Date(o.created_at).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        customer: { name: o.customer_name, phone: o.customer_phone, address: o.customer_address },
        items: o.items,
        totalAmount: o.total_amount
      }));
      setOrders(formattedOrders);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmailInput,
      password: passwordInput,
    });

    if (error) {
      setAuthError(true);
      setPasswordInput('');
    } else {
      setIsAuthenticated(true);
      setAuthError(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    const cleanPrice = parseFloat(newProduct.price);
    if (!newProduct.name || isNaN(cleanPrice) || isSubmittingProduct) return;

    setIsSubmittingProduct(true);
    const uploadedUrls = [];

    for (const file of selectedFiles) {
      const url = await uploadImageToCloud(file);
      if (url) uploadedUrls.push(url);
    }

    const { error } = await supabase.from('products').insert([{
      name: newProduct.name,
      price: cleanPrice,
      category: newProduct.category,
      description: newProduct.desc,
      images: uploadedUrls,
      in_stock: true
    }]);

    setIsSubmittingProduct(false);
    if (!error) {
      setNewProduct({ name: '', price: '', category: 'Sarees', desc: '', images: [] });
      setSelectedFiles([]);
      loadDashboardData();
    }
  };

  const handleToggleStock = async (product) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);

    if (!error) loadDashboardData();
  };

  const startEditingClick = (product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      desc: product.description || '',
      images: product.images || [],
      inStock: product.in_stock
    });
  };

  const handleSaveEditSubmit = async (productId) => {
    const { error } = await supabase
      .from('products')
      .update({
        name: editFormData.name,
        price: parseFloat(editFormData.price),
        category: editFormData.category,
        description: editFormData.desc, // Unified description pipeline alignment mapping
        in_stock: editFormData.inStock
      })
      .eq('id', productId);

    if (!error) {
      setEditingId(null);
      loadDashboardData();
    }
  };

  const handleRemoveProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) loadDashboardData();
  };

  const handleClearOrder = async (orderTableId) => {
    const { error } = await supabase.from('orders').delete().eq('id', orderTableId);
    if (!error) loadDashboardData();
  };

  const handleAddArrivalSlot = async (e) => {
    e.preventDefault();
    if (!newArrivalInput.name || isSubmittingArrival) return;

    setIsSubmittingArrival(true);
    let publicImageUrl = '';

    if (newArrivalInput.fileObj) {
      publicImageUrl = await uploadImageToCloud(newArrivalInput.fileObj);
    }

    const slotPayload = {
      id: Date.now(),
      name: newArrivalInput.name,
      targetProductId: newArrivalInput.targetProductId,
      image: publicImageUrl
    };

    const updatedSlots = [...(homeLayout.new_arrival_slots || []), slotPayload];
    const { error } = await supabase
      .from('home_layout')
      .update({ new_arrival_slots: updatedSlots })
      .eq('id', 1);

    setIsSubmittingArrival(false);
    if (!error) {
      setNewArrivalInput({ name: '', targetProductId: '', image: '', fileObj: null });
      loadDashboardData();
    }
  };

  const handleAddCuratedSlot = async (e) => {
    e.preventDefault();
    if (!newCuratedInput.name || isSubmittingCurated) return;

    setIsSubmittingCurated(true);
    let publicImageUrl = '';

    if (newCuratedInput.fileObj) {
      publicImageUrl = await uploadImageToCloud(newCuratedInput.fileObj);
    }

    const slotPayload = {
      id: Date.now(),
      name: newCuratedInput.name,
      targetCategory: newCuratedInput.targetCategory,
      image: publicImageUrl
    };

    const updatedSlots = [...(homeLayout.curated_slots || []), slotPayload];
    const { error } = await supabase
      .from('home_layout')
      .update({ curated_slots: updatedSlots })
      .eq('id', 1);

    setIsSubmittingCurated(false);
    if (!error) {
      setNewCuratedInput({ name: '', targetCategory: 'Sarees', image: '', fileObj: null });
      loadDashboardData();
    }
  };

  const handleRemoveArrivalSlot = async (id) => {
    const filtered = homeLayout.new_arrival_slots.filter(s => s.id !== id);
    const { error } = await supabase.from('home_layout').update({ new_arrival_slots: filtered }).eq('id', 1);
    if (!error) loadDashboardData();
  };

  const handleRemoveCuratedSlot = async (id) => {
    const filtered = homeLayout.curated_slots.filter(s => s.id !== id);
    const { error } = await supabase.from('home_layout').update({ curated_slots: filtered }).eq('id', 1);
    if (!error) loadDashboardData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-tassar-cream flex flex-col justify-center items-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-tassar-raw/40 p-8 shadow-xl max-w-md w-full text-left space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-tassar-earth text-tassar-cream rounded-full flex items-center justify-center text-xl mx-auto shadow-sm"><FiLock /></div>
            <h2 className="font-display text-2xl font-bold text-black pt-1">Administrative Access</h2>
            <p className="text-xs text-neutral-600">Enter your secure credentials to unlock write capabilities.</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Admin Email</label>
              <input type="email" value={adminEmailInput} onChange={(e) => setAdminEmailInput(e.target.value)} placeholder="enter credentials" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-3 text-xs font-bold text-black outline-none focus:bg-white focus:border-tassar-earth rounded-none mb-3" required />

              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Console Key</label>
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="••••••••" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-3 text-xs font-bold text-black outline-none focus:bg-white focus:border-tassar-earth rounded-none" required />
              {authError && <span className="text-[11px] text-tassar-madderRed font-bold mt-1 block">✦ Invalid administrator account verification keys.</span>}
            </div>
            <button type="submit" className="w-full bg-tassar-earth text-tassar-cream py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors duration-300">VERIFY LOGINS</button>
          </form>
          <div className="border-t border-tassar-raw/20 pt-4 text-center"><Link to="/shop" className="text-xs font-bold tracking-wider uppercase text-black/60 hover:text-black inline-flex items-center gap-2"><FiArrowLeft /> Return to Store</Link></div>
        </motion.div>
      </div>
    );
  }

  if (!homeLayout) return <div className="min-h-screen bg-tassar-cream pt-32 text-center text-xs font-mono">Syncing cloud layout settings...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-8 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen bg-tassar-cream pb-24 text-tassar-earth">

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-tassar-earth/20 pb-4">
        <div className="text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-tassar-madderRed font-bold block">✦ CLOUD RUN TIMELINE</span>
          <h1 className="text-4xl font-display font-bold mt-1 text-black">Admin Suite</h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Link to="/" className="px-4 py-2 bg-white text-black font-bold text-xs border border-tassar-raw/40 hover:bg-tassar-cream transition-colors flex items-center gap-2 rounded-none"><FiArrowLeft /> View Live Site</Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-tassar-madderRed text-white font-bold text-xs hover:bg-black transition-colors flex items-center gap-2 rounded-none shadow-sm"><FiLogOut /> Secure Exit</button>
        </div>
      </div>

      <div className="flex flex-wrap border-b border-tassar-raw/60 mb-8 bg-white shadow-sm p-1 gap-1">
        <button onClick={() => setActiveTab('overview')} className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all ${activeTab === 'overview' ? 'bg-tassar-earth text-tassar-cream font-black' : 'text-black hover:bg-tassar-cream/30'}`}><FiTrendingUp /> Overview</button>
        <button onClick={() => setActiveTab('manage')} className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all ${activeTab === 'manage' ? 'bg-tassar-earth text-tassar-cream font-black' : 'text-black hover:bg-tassar-cream/30'}`}><FiList /> Manage Shop</button>
        <button onClick={() => setActiveTab('homeLayout')} className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all ${activeTab === 'homeLayout' ? 'bg-tassar-earth text-tassar-cream font-black' : 'text-black hover:bg-tassar-cream/30'}`}><FiHome /> Home Customizer</button>
        <button onClick={() => setActiveTab('orders')} className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all relative ${activeTab === 'orders' ? 'bg-tassar-earth text-tassar-cream font-black' : 'text-black hover:bg-tassar-cream/30'}`}><FiShoppingBag /> Client Orders {orders.length > 0 && <span className="ml-1 bg-tassar-madderRed text-white text-[9px] font-mono px-1.5 py-0.5 rounded-full">{orders.length}</span>}</button>
      </div>

      <AnimatePresence mode="wait">

        {activeTab === 'overview' && (
          <motion.div key="ov-tab" className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-tassar-earth text-tassar-cream p-6 shadow-sm border border-tassar-earth"><span className="text-[10px] font-mono tracking-widest uppercase text-tassar-raw">Total Cloud Products</span><p className="text-4xl font-display font-bold text-white mt-2 flex items-center gap-2"><FiBox /> {products.length}</p></div>
              <div className="bg-white border border-tassar-raw/60 p-6 shadow-sm"><span className="text-[10px] font-mono tracking-widest uppercase text-tassar-earth/70">Loom Active Items</span><p className="text-4xl font-display font-bold text-black mt-2 flex items-center gap-2"><FiCheckCircle className="text-emerald-600" /> {products.filter(p => p.in_stock).length}</p></div>
              <div className="bg-white border border-tassar-raw/60 p-6 shadow-sm"><span className="text-[10px] font-mono tracking-widest uppercase text-tassar-earth/70">Pending Bookings Queue</span><p className="text-4xl font-display font-bold text-tassar-madderRed mt-2 flex items-center gap-2"><FiShoppingBag /> {orders.length}</p></div>
            </div>
          </motion.div>
        )}

        {activeTab === 'manage' && (
          <motion.div key="mg-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleAddProductSubmit} className="lg:col-span-4 bg-white border border-tassar-raw/40 p-5 shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-2 text-black font-bold pb-2 border-b border-tassar-raw/20"><FiPlusCircle className="text-tassar-deepGold" /> <h3 className="font-display text-base uppercase tracking-wider">Publish Product</h3></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Product Title</label><input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs font-bold text-black outline-none" required /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Price (₹)</label><input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs font-bold text-black font-mono outline-none" required /></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Display Category</label><select name="category" value={newProduct.category} onChange={handleInputChange} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs font-bold text-black outline-none cursor-pointer">{allowedCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Fabric Specifications</label><textarea name="desc" rows="4" value={newProduct.desc} onChange={handleInputChange} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs font-bold text-black outline-none resize-none" placeholder="Describe weave patterns, layout profiles..." required /></div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">Upload Product Photos (Multi-Select)</label>
                <div className="w-full bg-tassar-cream/20 border border-dashed border-tassar-raw/50 p-4 text-center relative hover:bg-white transition-all">
                  <input type="file" accept="image/*" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="text-black font-medium text-xs flex flex-col items-center gap-1"><FiUploadCloud className="text-lg text-tassar-deepGold" /><span>{selectedFiles.length > 0 ? `${selectedFiles.length} Selected` : 'Choose photos'}</span></div>
                </div>
              </div>
              <button type="submit" disabled={isSubmittingProduct} className="w-full bg-tassar-earth text-tassar-cream py-3 text-xs font-bold tracking-widest uppercase hover:bg-tassar-madderRed transition-colors shadow-sm disabled:bg-neutral-400">{isSubmittingProduct ? "PUBLISHING TO CLOUD..." : "PUBLISH LIVE"}</button>
            </form>

            <div className="lg:col-span-8 bg-white border border-tassar-raw/40 p-5 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-tassar-raw/40 text-[10px] font-mono tracking-wider uppercase text-black font-bold bg-tassar-cream/50"><th className="p-3">Product Media & Profile</th><th className="p-3">Category</th><th className="p-3 text-right">Price Matrix</th><th className="p-3 text-center">Stock</th><th className="p-3 text-right">Action Gates</th></tr>
                </thead>
                <tbody className="divide-y divide-tassar-raw/20 text-xs">
                  {products.map((product) => {
                    const isEditing = editingId === product.id;
                    return (
                      <tr key={product.id} className="hover:bg-tassar-cream/10 transition-colors">
                        <td className="p-3 space-y-2">
                          {isEditing ? (
                            <div className="space-y-1 w-full max-w-xs">
                              <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="bg-tassar-cream/50 border border-tassar-earth p-1.5 font-bold text-black text-xs w-full outline-none" />
                              <textarea value={editFormData.desc} onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })} className="bg-tassar-cream/50 border border-tassar-earth p-1.5 text-black text-xs w-full outline-none resize-none" rows="3" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-tassar-cream border border-tassar-raw/40 shrink-0 flex items-center justify-center overflow-hidden font-mono text-[9px] font-bold text-tassar-earth">{product.images && product.images[0] ? <img src={product.images[0]} className="w-full h-full object-cover" /> : '[0]'}</div>
                              <div className="text-left">
                                <span className="font-bold text-black block truncate max-w-[140px]">{product.name}</span>
                                <span className="text-[10px] text-neutral-600 block max-w-[140px] truncate mt-0.5">{product.description || 'No description added'}</span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-3">{isEditing ? <select value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} className="bg-tassar-cream/50 border border-tassar-earth p-1 text-xs font-bold text-black outline-none">{allowedCategories.map(c => <option key={c} value={c}>{c}</option>)}</select> : <span className="text-[9px] font-bold uppercase bg-tassar-cream text-tassar-earth px-2 py-0.5 border border-tassar-raw/30">{product.category}</span>}</td>
                        <td className="p-3 text-right">{isEditing ? <input type="number" value={editFormData.price} onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })} className="bg-tassar-cream/50 border border-tassar-earth p-1.5 font-bold text-black font-mono text-xs w-16 text-right outline-none" /> : <span className="font-mono font-bold text-black">₹{Number(product.price).toLocaleString('en-IN')}</span>}</td>
                        <td className="p-3 text-center"><button type="button" onClick={() => isEditing ? setEditFormData({ ...editFormData, inStock: !editFormData.inStock }) : handleToggleStock(product)} className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide inline-flex items-center gap-0.5 border shadow-sm ${(isEditing ? editFormData.inStock : product.in_stock) ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-rose-50 text-rose-700 border-rose-300'}`}>{(isEditing ? editFormData.inStock : product.in_stock) ? <><FiCheckCircle /> IN</> : <><FiXCircle /> OUT</>}</button></td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {isEditing ? (
                              <><button onClick={() => handleSaveEditSubmit(product.id)} className="p-1 text-emerald-600 border border-emerald-200"><FiCheck /></button><button onClick={() => setEditingId(null)} className="p-1 text-neutral-500 border border-neutral-200"><FiX /></button></>
                            ) : (
                              <><button onClick={() => startEditingClick(product)} className="p-1 text-black hover:text-tassar-deepGold"><FiEdit2 /></button><button onClick={() => handleRemoveProduct(product.id)} className="p-1 text-black hover:text-tassar-madderRed"><FiTrash2 /></button></>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'homeLayout' && (
          <motion.div key="hl-tab" className="space-y-12 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <form onSubmit={handleAddArrivalSlot} className="lg:col-span-4 bg-white border border-tassar-raw/40 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-tassar-raw/20 pb-2 text-black font-bold"><FiPlusCircle className="text-tassar-madderRed" /><h3 className="font-display uppercase tracking-wider text-sm">Add New Arrival Card</h3></div>
                <div><label className="block text-xs font-bold text-black mb-1">Card Title / Short Specification</label><input type="text" value={newArrivalInput.name} onChange={(e) => setNewArrivalInput({ ...newArrivalInput, name: e.target.value })} placeholder="e.g., Silk Amber drape" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs text-black font-bold outline-none" required /></div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Target Redirect Destination Item</label>
                  <select value={newArrivalInput.targetProductId} onChange={(e) => setNewArrivalInput({ ...newArrivalInput, targetProductId: e.target.value })} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs text-black font-bold outline-none cursor-pointer" required>
                    <option value="">-- Bind to active product --</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Card Photo File</label>
                  <div className="w-full bg-tassar-cream/20 border border-dashed border-tassar-raw/50 p-4 text-center relative hover:bg-white transition-all">
                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setNewArrivalInput({ ...newArrivalInput, fileObj: e.target.files[0] }); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="text-xs font-medium text-black flex items-center justify-center gap-1">{newArrivalInput.fileObj ? <><FiImage className="text-emerald-600" /> Photo Selected</> : <><FiUploadCloud className="text-tassar-deepGold" /> Upload Cover</>}</div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmittingArrival} className="w-full bg-tassar-earth text-tassar-cream py-3 text-xs font-bold uppercase tracking-widest hover:bg-tassar-madderRed transition-colors shadow-sm">{isSubmittingArrival ? 'PUSHING TO STORAGE...' : 'INJECT TO NEW ARRIVALS'}</button>
              </form>

              <div className="lg:col-span-8 bg-white border border-tassar-raw/40 p-5 shadow-sm">
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider mb-4 border-b pb-2 text-black flex items-center gap-2"><FiList /> Active Cloud New Arrivals Queue ({homeLayout.new_arrival_slots?.length || 0} Items)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {(!homeLayout.new_arrival_slots || homeLayout.new_arrival_slots.length === 0) ? (
                    <p className="text-sm font-serif italic p-8 text-neutral-400 col-span-2 text-center">No arrivals cards loaded.</p>
                  ) : (
                    homeLayout.new_arrival_slots.map((slot) => (
                      <div key={slot.id} className="flex items-center gap-3 bg-tassar-cream/30 border p-3 justify-between">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-12 h-12 bg-white border overflow-hidden shrink-0 flex items-center justify-center">{slot.image ? <img src={slot.image} className="w-full h-full object-cover" /> : <FiImage className="text-neutral-300" />}</div>
                          <div><h5 className="font-bold text-black text-xs truncate max-w-[160px]">{slot.name}</h5><span className="text-[10px] font-mono block text-neutral-500">ID Link: {slot.targetProductId}</span></div>
                        </div>
                        <button onClick={() => handleRemoveArrivalSlot(slot.id)} className="text-black hover:text-tassar-madderRed p-2"><FiTrash2 /></button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
              <form onSubmit={handleAddCuratedSlot} className="lg:col-span-4 bg-white border border-tassar-raw/40 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-tassar-raw/20 pb-2 text-black font-bold"><FiPlusCircle className="text-tassar-deepGold" /><h3 className="font-display uppercase tracking-wider text-sm">Add Curated Category Card</h3></div>
                <div><label className="block text-xs font-bold text-black mb-1">Card Header Category Name</label><input type="text" value={newCuratedInput.name} onChange={(e) => setNewCuratedInput({ ...newCuratedInput, name: e.target.value })} placeholder="e.g., Heritage Dupattas" className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs text-black font-bold outline-none" required /></div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Target Redirect Filter Category</label>
                  <select value={newCuratedInput.targetCategory} onChange={(e) => setNewCuratedInput({ ...newCuratedInput, targetCategory: e.target.value })} className="w-full bg-tassar-cream/30 border border-tassar-raw/60 p-2.5 text-xs text-black font-bold outline-none cursor-pointer" required>
                    {allowedCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Card Background Cover Photo</label>
                  <div className="w-full bg-tassar-cream/20 border border-dashed border-tassar-raw/50 p-4 text-center relative hover:bg-white transition-all">
                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setNewCuratedInput({ ...newCuratedInput, fileObj: e.target.files[0] }); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="text-xs font-medium text-black flex items-center justify-center gap-1">{newCuratedInput.fileObj ? <><FiImage className="text-emerald-600" /> Photo Selected</> : <><FiUploadCloud className="text-tassar-deepGold" /> Upload Cover</>}</div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmittingCurated} className="w-full bg-tassar-earth text-tassar-cream py-3 text-xs font-bold uppercase tracking-widest hover:bg-tassar-madderRed transition-colors shadow-sm">{isSubmittingCurated ? 'PUSHING TO STORAGE...' : 'INJECT TO CURATED LABELS'}</button>
              </form>

              <div className="lg:col-span-8 bg-white border border-tassar-raw/40 p-5 shadow-sm">
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider mb-4 border-b pb-2 text-black flex items-center gap-2"><FiTag /> Active Curated Category Queue ({homeLayout.curated_slots?.length || 0} Cards)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {(!homeLayout.curated_slots || homeLayout.curated_slots.length === 0) ? (
                    <p className="text-sm font-serif italic p-8 text-neutral-400 col-span-2 text-center">No curated modules configured.</p>
                  ) : (
                    homeLayout.curated_slots.map((slot) => (
                      <div key={slot.id} className="flex items-center gap-3 bg-tassar-cream/30 border p-3 justify-between">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-12 h-12 bg-white border overflow-hidden shrink-0 flex items-center justify-center">{slot.image ? <img src={slot.image} className="w-full h-full object-cover" /> : <FiImage className="text-neutral-300" />}</div>
                          <div><h5 className="font-bold text-black text-xs truncate max-w-[160px]">{slot.name}</h5><span className="text-[10px] font-mono block text-tassar-earth/70 uppercase tracking-wide">Category: {slot.targetCategory}</span></div>
                        </div>
                        <button onClick={() => handleRemoveCuratedSlot(slot.id)} className="text-black hover:text-tassar-madderRed p-2"><FiTrash2 /></button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div key="or-tab" className="space-y-4 text-left">
            {orders.length === 0 ? (
              <div className="bg-white border border-tassar-raw/40 p-12 text-center italic text-sm font-serif">No customer checkout transactions are registered in the queue.</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white border border-tassar-raw/40 p-5 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-2"><span className="text-xs font-mono font-bold bg-tassar-earth text-tassar-cream px-2 py-0.5">{order.orderId}</span><span className="text-[11px] text-neutral-500 font-medium">{order.date}</span></div>
                    <h4 className="font-display text-base font-bold text-black pt-1">{order.customer.name}</h4>
                    <p className="text-xs text-black font-semibold">Phone: {order.customer.phone}</p><p className="text-[11px] text-neutral-700 leading-tight">Addr: {order.customer.address}</p>
                  </div>
                  <div className="md:col-span-5 divide-y divide-neutral-100 max-h-24 overflow-y-auto pr-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="py-1 flex justify-between items-center text-xs text-black font-medium"><span>{item.name} <strong>x{item.quantity}</strong></span><span className="font-mono text-neutral-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span></div>
                    ))}
                  </div>
                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right"><span className="text-[10px] text-neutral-500 block font-mono uppercase">Total Paid</span><span className="font-mono text-lg font-black text-black">₹{order.totalAmount.toLocaleString('en-IN')}</span></div>
                    <button onClick={() => handleClearOrder(order.id)} className="p-2 text-black hover:text-rose-700 border border-neutral-200 hover:bg-neutral-50"><FiCheck className="text-base" /></button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}