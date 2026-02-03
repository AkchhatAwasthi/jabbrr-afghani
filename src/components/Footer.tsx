import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
// logo import removed
const logoImage = "/jabbrr_logo.png";
import { useSettings } from '@/hooks/useSettings';
import QRCodeComponent from './QRCode';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import { Button } from '@/components/ui/button';

interface FooterProps {
  isAdminRoute?: boolean;
  isKitchenRoute?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAdminRoute = false, isKitchenRoute = false }) => {
  if (isAdminRoute || isKitchenRoute) {
    return null;
  }

  const { settings, loading } = useSettings();

  const contactInfo = {
    phone: settings?.store_phone || '+91 9996616153',
    email: settings?.store_email || 'contact@jabbrrafghani.com',
    address: settings?.store_address || 'Shop number 5, Patel Nagar,\nHansi road, Patiala chowk,\nJIND (Haryana) 126102',
    storeName: 'Jabbrr Afghani'
  };

  return (
    <footer className="bg-background text-foreground pt-0 mt-0 border-t border-border">
      {/* Newsletter Section - Dark Background for Contrast */}
      <div className="bg-card py-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-orange-avenue text-foreground mb-2 font-normal tracking-wide">Join the Inner Circle</h3>
              <p className="text-muted-foreground font-orange-avenue font-normal tracking-wide text-xs">Subscribe to receive exclusive offers and updates on our latest menu items.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-background/50 text-foreground placeholder:text-muted-foreground border border-border w-full md:w-80 rounded-none outline-none focus:border-primary transition-colors"
              />
              <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-none whitespace-nowrap uppercase tracking-widest text-[10px] font-orange-avenue font-normal">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Jabbrr Afghani Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-normal tracking-widest text-foreground uppercase font-orange-avenue">Jabbrr Afghani</h3>
                <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-orange-avenue">Rolls & Biryani</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed font-orange-avenue font-normal">
              Your premier destination for premium rolls and biryani. We bring the authentic taste with a modern twist, delivered fresh to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-base font-orange-avenue font-normal text-foreground">Explore</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Home</Link>
              <Link to="/menu" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Our Menu</Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Our Story</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Contact Us</Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-base font-orange-avenue font-normal text-foreground">Collections</h4>
            <div className="space-y-3">
              <Link to="/menu?category=rolls" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Signature Rolls</Link>
              <Link to="/menu?category=biryani" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Royal Biryani</Link>
              <Link to="/menu?category=combos" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Value Combos</Link>
              <Link to="/menu?category=beverages" className="block text-muted-foreground hover:text-primary transition-colors text-xs font-orange-avenue font-normal tracking-wide">Beverages</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-base font-orange-avenue font-normal text-foreground">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-foreground group-hover:text-primary" />
                </div>
                <span className="text-muted-foreground text-xs group-hover:text-primary transition-colors font-orange-avenue font-normal">
                  {loading ? '...' : contactInfo.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-foreground group-hover:text-primary" />
                </div>
                <span className="text-muted-foreground text-xs group-hover:text-primary transition-colors font-orange-avenue font-normal">
                  {loading ? '...' : contactInfo.email}
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-foreground group-hover:text-primary" />
                </div>
                <span className="text-muted-foreground text-xs leading-relaxed group-hover:text-primary transition-colors font-orange-avenue font-normal">
                  {loading ? '...' : contactInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-0 bg-background">
          <MarqueeAnimation
            direction="left"
            baseVelocity={-0.5}
            className="text-foreground py-6 text-xs font-orange-avenue font-normal tracking-[0.3em] uppercase opacity-80"
          >
            Authentic Taste • Premium Quality • Fresh Ingredients • Crafted with Love •
          </MarqueeAnimation>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <p className="text-muted-foreground/70 text-xs font-orange-avenue font-normal">
              © 2025 Jabbrr Afghani. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground/70 hover:text-primary text-xs transition-colors font-orange-avenue font-normal">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground/70 hover:text-primary text-xs transition-colors font-orange-avenue font-normal">Terms of Service</Link>
              <QRCodeComponent />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;