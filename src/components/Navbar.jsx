import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const totalCartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Process', path: '/process' },
    { name: 'Our Story', path: '/story' },
    { name: 'Custom Design', path: '/custom-design' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-mart-stone/90 backdrop-blur-md z-50 border-b border-mart-soft/50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* BRAND TEXT LOGO LINK */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-display text-xl font-bold tracking-[0.15em] text-mart-dark hover:text-mart-emerald transition-colors">
              SIDDESHWARA <span className="text-mart-emerald font-light">HWS</span>
            </Link>
          </div>

          {/* DESKTOP CENTER NAVIGATION LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-widest transition-colors font-bold ${
                  isActivePath(link.path)
                    ? 'text-mart-emerald font-black'
                    : 'text-mart-dark hover:text-mart-emerald'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE UTILITIES BAR */}
          <div className="hidden md:flex items-center">
            <Link
              to="/cart"
              className="relative p-2.5 text-mart-dark hover:text-mart-emerald transition-colors border border-transparent hover:border-mart-emerald/20 bg-white shadow-sm rounded-none"
              title="Open Shopping Basket"
            >
              <FiShoppingBag className="text-lg" />

              {totalCartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-mart-emerald text-white text-[10px] font-mono font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-mart-stone shadow-sm">
                  {totalCartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE RESPONSIVE HAMBURGER MENU */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative p-2 text-mart-dark">
              <FiShoppingBag className="text-xl" />
              {totalCartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-mart-emerald text-white text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-mart-dark hover:text-mart-emerald focus:outline-none"
            >
              {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-mart-stone border-b border-mart-soft/30 shadow-inner px-4 pt-2 pb-6 space-y-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 text-sm tracking-widest uppercase font-bold text-left border-b border-mart-soft last:border-0 ${
                isActivePath(link.path) ? 'text-mart-emerald bg-mart-soft/40 pl-5' : 'text-mart-dark'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
                }
              
