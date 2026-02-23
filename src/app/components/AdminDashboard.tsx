import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  Eye,
  Users,
  DollarSign,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const performanceData = [
  { month: "Sep", revenue: 320000, bids: 89 },
  { month: "Oct", revenue: 480000, bids: 134 },
  { month: "Nov", revenue: 560000, bids: 156 },
  { month: "Dec", revenue: 720000, bids: 201 },
  { month: "Jan", revenue: 640000, bids: 178 },
  { month: "Feb", revenue: 890000, bids: 245 },
];

interface LotControl {
  id: string;
  lotNumber: string;
  category: string;
  reservePrice: number;
  currentBid: number;
  bidders: number;
  regions: { name: string; enabled: boolean }[];
  status: "active" | "paused" | "completed";
}

const initialLots: LotControl[] = [
  {
    id: "1",
    lotNumber: "ALC-2026-0847",
    category: "Horlogerie",
    reservePrice: 22000,
    currentBid: 18500,
    bidders: 7,
    regions: [
      { name: "North America", enabled: true },
      { name: "Europe", enabled: true },
      { name: "Asia Pacific", enabled: false },
      { name: "Middle East", enabled: true },
    ],
    status: "active",
  },
  {
    id: "2",
    lotNumber: "ALC-2026-0848",
    category: "Maroquinerie",
    reservePrice: 14000,
    currentBid: 12400,
    bidders: 12,
    regions: [
      { name: "North America", enabled: true },
      { name: "Europe", enabled: true },
      { name: "Asia Pacific", enabled: true },
      { name: "Middle East", enabled: false },
    ],
    status: "active",
  },
  {
    id: "3",
    lotNumber: "ALC-2026-0849",
    category: "Haute Joaillerie",
    reservePrice: 55000,
    currentBid: 42000,
    bidders: 4,
    regions: [
      { name: "North America", enabled: true },
      { name: "Europe", enabled: false },
      { name: "Asia Pacific", enabled: false },
      { name: "Middle East", enabled: true },
    ],
    status: "active",
  },
  {
    id: "4",
    lotNumber: "ALC-2026-0850",
    category: "Vins & Spiritueux",
    reservePrice: 10000,
    currentBid: 8200,
    bidders: 9,
    regions: [
      { name: "North America", enabled: false },
      { name: "Europe", enabled: true },
      { name: "Asia Pacific", enabled: false },
      { name: "Middle East", enabled: false },
    ],
    status: "paused",
  },
];

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  index,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  index: number;
}) {
  const isPositive = change.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-charcoal border border-border/20 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-4 h-4 text-gold/40" />
        <span
          className={`font-sans flex items-center gap-0.5 ${isPositive ? "text-green-600/60" : "text-red-500/60"}`}
          style={{ fontSize: "0.65rem" }}
        >
          {isPositive ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
          {change}
        </span>
      </div>
      <p
        className="font-serif text-warm-white mb-1"
        style={{ fontSize: "1.5rem" }}
      >
        {value}
      </p>
      <p
        className="text-warm-gray/40 font-sans"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export function AdminDashboard() {
  const [lots, setLots] = useState(initialLots);
  const [expandedLot, setExpandedLot] = useState<string | null>(null);

  const toggleRegion = (lotId: string, regionName: string) => {
    setLots((prev) =>
      prev.map((lot) => {
        if (lot.id === lotId) {
          return {
            ...lot,
            regions: lot.regions.map((r) =>
              r.name === regionName ? { ...r, enabled: !r.enabled } : r
            ),
          };
        }
        return lot;
      })
    );
  };

  const updateReservePrice = (lotId: string, newPrice: number) => {
    setLots((prev) =>
      prev.map((lot) =>
        lot.id === lotId ? { ...lot, reservePrice: newPrice } : lot
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-border/20">
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="font-serif tracking-[0.3em] text-warm-white"
            style={{ fontSize: "0.75rem" }}
          >
            THE ALLOCATION
          </Link>
          <span
            className="text-gold/40 font-sans"
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Brand Control
          </span>
        </div>
        <Link
          to="/dashboard"
          className="text-warm-gray/50 hover:text-warm-white transition-colors flex items-center gap-2"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <ArrowLeft className="w-3 h-3" />
          Member View
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-warm-gray/40 font-sans mb-2"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Brand Partner Dashboard
          </p>
          <h1
            className="font-serif text-warm-white"
            style={{ fontSize: "1.75rem" }}
          >
            Distribution Control
          </h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <MetricCard
            label="Total Revenue"
            value="$3.61M"
            change="+12.4%"
            icon={DollarSign}
            index={0}
          />
          <MetricCard
            label="Active Bidders"
            value="32"
            change="+8.1%"
            icon={Users}
            index={1}
          />
          <MetricCard
            label="Avg. Bid / Lot"
            value="$14.8K"
            change="+5.2%"
            icon={TrendingUp}
            index={2}
          />
          <MetricCard
            label="Lot Views"
            value="1,247"
            change="-2.1%"
            icon={Eye}
            index={3}
          />
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-charcoal border border-border/20 p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-warm-gray/40 font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Performance Overview
            </p>
            <p
              className="text-warm-gray/30 font-sans"
              style={{ fontSize: "0.65rem" }}
            >
              Last 6 months
            </p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B8956A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#B8956A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A847855", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A847855", fontSize: 10 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161616",
                    border: "1px solid #2A2A2A",
                    borderRadius: "2px",
                    fontSize: "0.72rem",
                    color: "#F5F0EB",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#B8956A"
                  strokeWidth={1.5}
                  fill="url(#goldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Lot Controls */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-warm-gray/40 font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Active Lots &middot; Control Panel
            </p>
          </div>

          <div className="space-y-3">
            {lots.map((lot, index) => (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.06 }}
                className="bg-charcoal border border-border/20 overflow-hidden"
              >
                {/* Lot Header */}
                <div
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-charcoal-light/30 transition-colors"
                  onClick={() =>
                    setExpandedLot(expandedLot === lot.id ? null : lot.id)
                  }
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <p
                        className="text-warm-white font-sans"
                        style={{ fontSize: "0.82rem" }}
                      >
                        {lot.lotNumber}
                      </p>
                      <p
                        className="text-warm-gray/40 font-sans"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {lot.category}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 font-sans ${
                        lot.status === "active"
                          ? "bg-green-900/20 text-green-600/60 border border-green-900/20"
                          : lot.status === "paused"
                            ? "bg-yellow-900/20 text-yellow-600/60 border border-yellow-900/20"
                            : "bg-charcoal-light text-warm-gray/40 border border-border/20"
                      }`}
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {lot.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right hidden md:block">
                      <p
                        className="text-warm-gray/30 font-sans"
                        style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.08em" }}
                      >
                        Current Bid
                      </p>
                      <p
                        className="text-warm-white font-serif"
                        style={{ fontSize: "1rem" }}
                      >
                        ${lot.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right hidden md:block">
                      <p
                        className="text-warm-gray/30 font-sans"
                        style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.08em" }}
                      >
                        Bidders
                      </p>
                      <p
                        className="text-warm-white/60 font-sans"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {lot.bidders}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-warm-gray/30 transition-transform ${expandedLot === lot.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Expanded Controls */}
                {expandedLot === lot.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/20 p-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Reserve Price Control */}
                      <div>
                        <p
                          className="text-warm-gray/40 font-sans mb-4"
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Reserve Price Control
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateReservePrice(
                                lot.id,
                                Math.max(0, lot.reservePrice - 1000)
                              )
                            }
                            className="w-10 h-10 border border-border/30 text-warm-gray/60 hover:border-gold/30 hover:text-gold transition-all flex items-center justify-center"
                            style={{ fontSize: "1rem" }}
                          >
                            −
                          </button>
                          <div className="flex-1 bg-background border border-border/20 px-4 py-2.5 flex items-center">
                            <span
                              className="text-warm-gray/40 mr-1"
                              style={{ fontSize: "0.85rem" }}
                            >
                              $
                            </span>
                            <span
                              className="text-warm-white font-serif"
                              style={{ fontSize: "1.1rem" }}
                            >
                              {lot.reservePrice.toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateReservePrice(
                                lot.id,
                                lot.reservePrice + 1000
                              )
                            }
                            className="w-10 h-10 border border-border/30 text-warm-gray/60 hover:border-gold/30 hover:text-gold transition-all flex items-center justify-center"
                            style={{ fontSize: "1rem" }}
                          >
                            +
                          </button>
                        </div>
                        <p
                          className="text-warm-gray/25 font-sans mt-2"
                          style={{ fontSize: "0.6rem" }}
                        >
                          {lot.currentBid >= lot.reservePrice
                            ? "Reserve met"
                            : `${(((lot.reservePrice - lot.currentBid) / lot.reservePrice) * 100).toFixed(1)}% below reserve`}
                        </p>
                      </div>

                      {/* Regional Access */}
                      <div>
                        <p
                          className="text-warm-gray/40 font-sans mb-4 flex items-center gap-2"
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          <Globe className="w-3 h-3" />
                          Regional Access
                        </p>
                        <div className="space-y-2.5">
                          {lot.regions.map((region) => (
                            <div
                              key={region.name}
                              className="flex items-center justify-between"
                            >
                              <span
                                className="text-warm-gray/50 font-sans"
                                style={{ fontSize: "0.78rem" }}
                              >
                                {region.name}
                              </span>
                              <button
                                onClick={() =>
                                  toggleRegion(lot.id, region.name)
                                }
                                className={`w-9 h-5 rounded-full transition-all duration-300 relative ${
                                  region.enabled
                                    ? "bg-gold/30"
                                    : "bg-border/40"
                                }`}
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 absolute top-0.5 ${
                                    region.enabled
                                      ? "bg-gold left-[1.125rem]"
                                      : "bg-warm-gray/40 left-0.5"
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-border/20">
        <p
          className="text-warm-gray/20 font-sans text-center"
          style={{ fontSize: "0.6rem", letterSpacing: "0.05em" }}
        >
          Brand Partner Portal &middot; Confidential &middot; All data subject
          to NDA
        </p>
      </footer>
    </div>
  );
}