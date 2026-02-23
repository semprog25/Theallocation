import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogOut, Bell, User, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Allocation {
  id: string;
  brand: string;
  lotNumber: string;
  category: string;
  image: string;
  currentBid: number;
  endTime: Date;
  bidders: number;
  status: "active" | "closing" | "upcoming";
}

const allocations: Allocation[] = [
  {
    id: "1",
    brand: "Maison H.",
    lotNumber: "ALC-2026-0847",
    category: "Horlogerie",
    image: "https://images.unsplash.com/photo-1652897979790-3e6ece97c8ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxODYzNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 18500,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    bidders: 7,
    status: "active",
  },
  {
    id: "2",
    brand: "Atelier V.",
    lotNumber: "ALC-2026-0848",
    category: "Maroquinerie",
    image: "https://images.unsplash.com/photo-1631555362948-c5a4a8f01589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwc3R1ZGlvJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MTg2Mzc1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 12400,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    bidders: 12,
    status: "closing",
  },
  {
    id: "3",
    brand: "Joaillerie D.",
    lotNumber: "ALC-2026-0849",
    category: "Haute Joaillerie",
    image: "https://images.unsplash.com/photo-1669738202871-1997517de7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwamV3ZWxyeSUyMHN0dWRpbyUyMGRhcmt8ZW58MXx8fHwxNzcxODYzNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 42000,
    endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
    bidders: 4,
    status: "active",
  },
  {
    id: "4",
    brand: "Domaine R.",
    lotNumber: "ALC-2026-0850",
    category: "Vins & Spiritueux",
    image: "https://images.unsplash.com/photo-1759971408697-a0ae9a906e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5lJTIwYm90dGxlJTIwc3R1ZGlvJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxODYzNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 8200,
    endTime: new Date(Date.now() + 36 * 60 * 60 * 1000),
    bidders: 9,
    status: "active",
  },
  {
    id: "5",
    brand: "Pelletteria M.",
    lotNumber: "ALC-2026-0851",
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1644258676710-ffb99d7d7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwZ29vZHMlMjBzdHVkaW8lMjBwcm9kdWN0fGVufDF8fHx8MTc3MTg2Mzc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 6800,
    endTime: new Date(Date.now() + 60 * 60 * 60 * 1000),
    bidders: 5,
    status: "upcoming",
  },
  {
    id: "6",
    brand: "Optique L.",
    lotNumber: "ALC-2026-0852",
    category: "Lunetterie",
    image: "https://images.unsplash.com/photo-1691141573071-e71dc8ec2876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdW5nbGFzc2VzJTIwc3R1ZGlvJTIwcHJvZHVjdCUyMGRhcmt8ZW58MXx8fHwxNzcxODYzNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentBid: 3200,
    endTime: new Date(Date.now() + 55 * 60 * 60 * 1000),
    bidders: 8,
    status: "active",
  },
];

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

function AllocationCard({ allocation, index }: { allocation: Allocation; index: number }) {
  const timeLeft = useCountdown(allocation.endTime);
  const navigate = useNavigate();

  const formatTime = () => {
    return `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/auction/${allocation.id}`)}
    >
      <div className="bg-charcoal border border-border/30 hover:border-gold/20 transition-all duration-500 overflow-hidden">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-background relative">
          <ImageWithFallback
            src={allocation.image}
            alt={`Lot ${allocation.lotNumber}`}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
          />
          {allocation.status === "closing" && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#8B2E2E]/80 text-warm-white/80 px-2.5 py-1 font-sans" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Closing Soon
              </span>
            </div>
          )}
          {allocation.status === "upcoming" && (
            <div className="absolute top-3 right-3">
              <span className="bg-charcoal/80 text-warm-gray border border-border/30 px-2.5 py-1 font-sans" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Upcoming
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {allocation.brand}
              </p>
              <p className="text-warm-white/60 font-sans mt-1" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                {allocation.lotNumber}
              </p>
            </div>
            <span className="text-warm-gray/30 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {allocation.category}
            </span>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-border/20">
            <div>
              <p className="text-warm-gray/40 font-sans" style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Current Bid
              </p>
              <p className="text-warm-white font-serif mt-1" style={{ fontSize: '1.2rem' }}>
                ${allocation.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-warm-gray/40">
                <Clock className="w-3 h-3" />
                <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                  {formatTime()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/auction/${allocation.id}`);
            }}
            className="w-full mt-4 border border-border/30 text-warm-gray/60 hover:border-gold/30 hover:text-gold transition-all duration-500 py-2.5 tracking-[0.15em]"
            style={{ fontSize: '0.6rem' }}
          >
            Enter Auction
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function MemberDashboard() {
  const [filter, setFilter] = useState<"all" | "active" | "closing" | "upcoming">("all");
  const navigate = useNavigate();

  const filtered = filter === "all" ? allocations : allocations.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-border/20">
        <Link to="/dashboard" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-warm-gray/40 hover:text-warm-gray transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gold rounded-full" />
          </button>
          <button className="text-warm-gray/40 hover:text-warm-gray transition-colors">
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-warm-gray/40 hover:text-warm-gray transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-warm-gray/40 font-sans mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              February 2026 &middot; Session IV
            </p>
            <h1 className="font-serif text-warm-white" style={{ fontSize: '1.75rem' }}>
              Current Allocations
            </h1>
          </div>
          <div className="flex gap-1">
            {(["all", "active", "closing", "upcoming"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 font-sans transition-all duration-300 ${
                  filter === f
                    ? "text-gold border-b border-gold"
                    : "text-warm-gray/40 hover:text-warm-gray/60"
                }`}
                style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((allocation, i) => (
            <AllocationCard key={allocation.id} allocation={allocation} index={i} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-border/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray/20 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
            All allocations subject to NDA &middot; Redistribution prohibited
          </p>
          <Link
            to="/admin"
            className="text-warm-gray/20 hover:text-warm-gray/40 transition-colors font-sans"
            style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Brand Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}