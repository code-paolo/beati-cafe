'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Coffee, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCart();
  const { user, openLogin, openSignup, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Menu', href: '/menu' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  const cartItemCount = getTotalItems();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Coffee className="h-8 w-8 text-amber-700 group-hover:text-amber-800 transition-colors" />
            <span className="text-2xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors">
              Beati Cafe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-full">
                  <User className="h-4 w-4 text-amber-700" />
                  <span className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <Button
                  onClick={openLogin}
                  variant="ghost"
                  className="text-gray-700 hover:text-amber-700 font-semibold"
                >
                  Log In
                </Button>
                <Button
                  onClick={openSignup}
                  className="bg-amber-700 hover:bg-amber-800 text-white font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-amber-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white/95 backdrop-blur-md rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors text-left px-4 ${
                    isActive(link.href)
                      ? 'text-amber-700'
                      : 'text-gray-700 hover:text-amber-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  openCart();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:text-amber-700 transition-colors"
              >
                <span className="font-medium">Cart</span>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>

              <div className="border-t border-gray-200 my-2"></div>

              {/* Mobile Auth */}
              {user ? (
                <div className="px-4 space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg">
                    <User className="h-5 w-5 text-amber-700" />
                    <span className="font-semibold text-gray-900">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-4 space-y-3">
                  <Button
                    onClick={() => {
                      openLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-semibold"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      openSignup();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold shadow-sm hover:shadow-md transition-all"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
