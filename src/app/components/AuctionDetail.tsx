import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Users, Shield, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const lotData: Record<string, {
  brand: string;
  lotNumber: string;
  category: string;
  image: string;
  currentBid: number;
  endTime: Date;
  bidders: number;
  description: string;
  details: { label: string; value: string }[];
  bidHistory: { amount: number; time: string; bidder: string }[];
  increment: number;
}> = {
  "1": {
    brand: "Maison H.",
    lotNumber: "ALC-2026-0847",
    category: "Horlogerie",
    image: "https://images.unsplash.com/photo-1652897979790-3e6ece97c8ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxODYzNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 18500,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    bidders: 7,
    description: "Exceptional timepiece from the maison's private reserve. Unworn, complete with original documentation and presentation case. This allocation represents excess inventory from a regional redistribution.",
    details: [
      { label: "Reference", value: "MH-4521-RG" },
      { label: "Material", value: "18K Rose Gold" },
      { label: "Movement", value: "Automatic, in-house calibre" },
      { label: "Condition", value: "Unworn, sealed" },
      { label: "Year", value: "2025" },
      { label: "Region", value: "European allocation" },
    ],
    bidHistory: [
      { amount: 18500, time: "2h ago", bidder: "Member ••••47" },
      { amount: 17000, time: "5h ago", bidder: "Member ••••12" },
      { amount: 16000, time: "8h ago", bidder: "Member ••••89" },
      { amount: 15000, time: "12h ago", bidder: "Member ••••47" },
      { amount: 14500, time: "18h ago", bidder: "Member ••••33" },
    ],
    increment: 500,
  },
  "2": {
    brand: "Atelier V.",
    lotNumber: "ALC-2026-0848",
    category: "Maroquinerie",
    image: "https://images.unsplash.com/photo-1631555362948-c5a4a8f01589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwc3R1ZGlvJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MTg2Mzc1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 12400,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    bidders: 12,
    description: "Hand-crafted piece from the atelier's most sought-after collection. Full-grain leather, hand-stitched construction. This item is part of a controlled allocation from the brand's European distribution center.",
    details: [
      { label: "Reference", value: "AV-BRK-35-N" },
      { label: "Material", value: "Togo Leather, Noir" },
      { label: "Dimensions", value: '35cm' },
      { label: "Hardware", value: "Palladium" },
      { label: "Condition", value: "New, with documentation" },
      { label: "Region", value: "EMEA allocation" },
    ],
    bidHistory: [
      { amount: 12400, time: "1h ago", bidder: "Member ••••22" },
      { amount: 11800, time: "3h ago", bidder: "Member ••••55" },
      { amount: 11000, time: "6h ago", bidder: "Member ••••22" },
      { amount: 10500, time: "10h ago", bidder: "Member ••••91" },
    ],
    increment: 200,
  },
  "3": {
    brand: "Joaillerie D.",
    lotNumber: "ALC-2026-0849",
    category: "Haute Joaillerie",
    image: "https://images.unsplash.com/photo-1669738202871-1997517de7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwamV3ZWxyeSUyMHN0dWRpbyUyMGRhcmt8ZW58MXx8fHwxNzcxODYzNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 42000,
    endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
    bidders: 4,
    description: "An exceptional piece from the house's haute joaillerie collection. Featuring exceptional stones with full certification. This allocation stems from a private redistribution event.",
    details: [
      { label: "Reference", value: "JD-HJ-2025-112" },
      { label: "Material", value: "Platinum 950" },
      { label: "Stone", value: "D-color, VVS1, 3.2ct" },
      { label: "Certification", value: "GIA certified" },
      { label: "Condition", value: "Unworn, original case" },
      { label: "Region", value: "Global allocation" },
    ],
    bidHistory: [
      { amount: 42000, time: "4h ago", bidder: "Member ••••08" },
      { amount: 40000, time: "10h ago", bidder: "Member ••••63" },
      { amount: 38000, time: "16h ago", bidder: "Member ••••08" },
    ],
    increment: 1000,
  },
};

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  function getTimeLeft(target: Date) {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// Default lot for IDs not in the data
const defaultLot = lotData["1"];

export function AuctionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lot = lotData[id || "1"] || defaultLot;
  const timeLeft = useCountdown(lot.endTime);
  const [bidAmount, setBidAmount] = useState(lot.currentBid + lot.increment);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  const formatTime = () => {
    return `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;
  };

  const handleBid = () => {
    setBidSubmitted(true);
    setTimeout(() => setBidSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-border/20">
        <Link to="/dashboard" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-warm-gray/50 hover:text-warm-white transition-colors flex items-center gap-2"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Allocations
        </button>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-charcoal border border-border/20 overflow-hidden">
              <div className="aspect-square">
                <ImageWithFallback
                  src={lot.image}
                  alt={`Lot ${lot.lotNumber}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-warm-gray/30">
              <Shield className="w-3 h-3" />
              <span className="font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Authenticated &middot; Documentation verified
              </span>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-8">
              <p className="text-warm-gray/40 font-sans mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {lot.brand} &middot; {lot.category}
              </p>
              <h1 className="font-serif text-warm-white mb-2" style={{ fontSize: '1.5rem' }}>
                Lot {lot.lotNumber}
              </h1>
              <p className="text-warm-gray/60 font-sans" style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
                {lot.description}
              </p>
            </div>

            {/* Lot Details */}
            <div className="mb-8 border-t border-border/20 pt-6">
              <p className="text-warm-gray/40 font-sans mb-4" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Lot Details
              </p>
              <div className="space-y-3">
                {lot.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between items-center">
                    <span className="text-warm-gray/40 font-sans" style={{ fontSize: '0.78rem' }}>
                      {detail.label}
                    </span>
                    <span className="text-warm-white/80 font-sans" style={{ fontSize: '0.78rem' }}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve Price */}
            <div className="mb-8 bg-charcoal border border-border/20 p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-warm-gray/40 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Reserve Price
                </span>
                <span className="text-warm-gray/30 font-sans" style={{ fontSize: '0.7rem' }}>
                  ••••••
                </span>
              </div>
              <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem' }}>
                Reserve price is not disclosed until auction close.
              </p>
            </div>

            {/* Timer & Current Bid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="bg-charcoal border border-border/20 p-5">
                <p className="text-warm-gray/40 font-sans mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Time Remaining
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold/50" />
                  <span className="font-mono text-warm-white" style={{ fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                    {formatTime()}
                  </span>
                </div>
              </div>
              <div className="bg-charcoal border border-border/20 p-5">
                <p className="text-warm-gray/40 font-sans mb-2" style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Current Bid
                </p>
                <p className="font-serif text-warm-white" style={{ fontSize: '1.3rem' }}>
                  ${lot.currentBid.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-8 flex items-center gap-2 text-warm-gray/30">
              <Users className="w-3 h-3" />
              <span className="font-sans" style={{ fontSize: '0.7rem' }}>
                {lot.bidders} qualified bidders
              </span>
            </div>

            {/* Bid Controls */}
            <div className="border-t border-border/20 pt-8">
              <p className="text-warm-gray/40 font-sans mb-4" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Place Bid &middot; Increment: ${lot.increment.toLocaleString()}
              </p>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setBidAmount((prev) => Math.max(lot.currentBid + lot.increment, prev - lot.increment))}
                  className="w-12 h-12 border border-border/30 text-warm-gray/60 hover:border-gold/30 hover:text-gold transition-all flex items-center justify-center font-sans"
                  style={{ fontSize: '1.1rem' }}
                >
                  −
                </button>
                <div className="flex-1 bg-charcoal border border-border/30 flex items-center px-5">
                  <span className="text-warm-gray/40 font-sans mr-1" style={{ fontSize: '0.9rem' }}>$</span>
                  <span className="text-warm-white font-serif" style={{ fontSize: '1.2rem' }}>
                    {bidAmount.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setBidAmount((prev) => prev + lot.increment)}
                  className="w-12 h-12 border border-border/30 text-warm-gray/60 hover:border-gold/30 hover:text-gold transition-all flex items-center justify-center font-sans"
                  style={{ fontSize: '1.1rem' }}
                >
                  +
                </button>
              </div>

              {bidSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full border border-gold/30 bg-gold/5 text-gold py-4 flex items-center justify-center gap-2 tracking-[0.15em]"
                  style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Bid Submitted
                </motion.div>
              ) : (
                <button
                  onClick={handleBid}
                  className="w-full border border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/70 transition-all duration-500 py-4 tracking-[0.2em]"
                  style={{ fontSize: '0.7rem' }}
                >
                  Submit Bid
                </button>
              )}

              <p className="text-warm-gray/25 font-sans mt-3 text-center" style={{ fontSize: '0.6rem', lineHeight: 1.6 }}>
                Bids are binding. By submitting, you agree to the auction terms.
              </p>
            </div>

            {/* Bid History */}
            <div className="mt-10 border-t border-border/20 pt-8">
              <p className="text-warm-gray/40 font-sans mb-4" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Bid History
              </p>
              <div className="space-y-3">
                {lot.bidHistory.map((bid, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                    <div className="flex items-center gap-4">
                      <span className="text-warm-white/70 font-sans" style={{ fontSize: '0.82rem' }}>
                        ${bid.amount.toLocaleString()}
                      </span>
                      <span className="text-warm-gray/30 font-sans" style={{ fontSize: '0.7rem' }}>
                        {bid.bidder}
                      </span>
                    </div>
                    <span className="text-warm-gray/25 font-sans" style={{ fontSize: '0.7rem' }}>
                      {bid.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}