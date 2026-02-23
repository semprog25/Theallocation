import { Link } from "react-router";
import { motion } from "motion/react";
import { Shield, Lock, Eye } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8">
        <div className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </div>
        <Link
          to="/login"
          className="text-warm-gray hover:text-warm-white transition-colors tracking-[0.15em]"
          style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}
        >
          Member Login
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-3xl"
        >
          <div className="w-12 h-px bg-gold mx-auto mb-16" />

          <h1
            className="font-serif text-warm-white mb-8 tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Access Is Allocated.
          </h1>

          <p
            className="text-warm-gray max-w-lg mx-auto mb-16 font-sans"
            style={{ fontSize: '0.95rem', lineHeight: 1.8, letterSpacing: '0.02em' }}
          >
            A private distribution architecture for excess luxury inventory.
          </p>

          <Link
            to="/apply"
            className="inline-block border border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/70 transition-all duration-500 px-12 py-4 tracking-[0.2em]"
            style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}
          >
            Request Access
          </Link>

          <p
            className="text-warm-gray/40 mt-8 font-sans"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Membership by invitation or application only
          </p>
        </motion.div>
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="px-8 md:px-16 py-16 border-t border-border/30"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="text-center">
            <Shield className="w-4 h-4 text-gold/50 mx-auto mb-4" />
            <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Verified Members Only
            </p>
          </div>
          <div className="text-center">
            <Lock className="w-4 h-4 text-gold/50 mx-auto mb-4" />
            <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              NDA Protected
            </p>
          </div>
          <div className="text-center">
            <Eye className="w-4 h-4 text-gold/50 mx-auto mb-4" />
            <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Discreet Distribution
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-8 border-t border-border/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            &copy; 2026 The Allocation. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/terms" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Terms
            </Link>
            <Link to="/privacy" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Privacy
            </Link>
            <Link to="/confidentiality" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Confidentiality
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}