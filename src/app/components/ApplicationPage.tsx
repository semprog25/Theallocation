import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";

export function ApplicationPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    industry: "",
    location: "",
    netWorthRange: "",
    referralCode: "",
    linkedIn: "",
    statement: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="flex items-center justify-between px-8 md:px-16 py-8">
          <Link to="/" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
            THE ALLOCATION
          </Link>
        </nav>
        <div className="flex-1 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-md"
          >
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-8">
              <Check className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-serif text-warm-white mb-4" style={{ fontSize: '1.75rem' }}>
              Application Received
            </h2>
            <p className="text-warm-gray font-sans mb-8" style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
              Your application is under review. Approved candidates will receive 
              an allocation notice within 5–7 business days.
            </p>
            <p className="text-warm-gray/40 font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Do not follow up. We will contact you.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8">
        <Link to="/" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="text-warm-gray hover:text-warm-white transition-colors flex items-center gap-2"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      </nav>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-px bg-gold mb-12" />
          
          <h1 className="font-serif text-warm-white mb-3" style={{ fontSize: '2rem' }}>
            Request Membership
          </h1>
          <p className="text-warm-gray font-sans mb-12" style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
            Membership is limited. All applications are manually reviewed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                  style={{ fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                  style={{ fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                style={{ fontSize: '0.9rem' }}
              />
            </div>

            {/* Industry & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Industry
                </label>
                <select
                  value={form.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans appearance-none cursor-pointer"
                  style={{ fontSize: '0.9rem' }}
                  required
                >
                  <option value="" className="bg-charcoal">Select</option>
                  <option value="finance" className="bg-charcoal">Finance & Investment</option>
                  <option value="legal" className="bg-charcoal">Legal</option>
                  <option value="technology" className="bg-charcoal">Technology</option>
                  <option value="real-estate" className="bg-charcoal">Real Estate</option>
                  <option value="entertainment" className="bg-charcoal">Entertainment</option>
                  <option value="healthcare" className="bg-charcoal">Healthcare</option>
                  <option value="family-office" className="bg-charcoal">Family Office</option>
                  <option value="other" className="bg-charcoal">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Net Worth & Referral */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Net Worth Range <span className="text-warm-gray/30">(Optional)</span>
                </label>
                <select
                  value={form.netWorthRange}
                  onChange={(e) => handleChange("netWorthRange", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans appearance-none cursor-pointer"
                  style={{ fontSize: '0.9rem' }}
                >
                  <option value="" className="bg-charcoal">Prefer not to say</option>
                  <option value="1-5m" className="bg-charcoal">$1M – $5M</option>
                  <option value="5-25m" className="bg-charcoal">$5M – $25M</option>
                  <option value="25-100m" className="bg-charcoal">$25M – $100M</option>
                  <option value="100m+" className="bg-charcoal">$100M+</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                  Referral Code
                </label>
                <input
                  type="text"
                  value={form.referralCode}
                  onChange={(e) => handleChange("referralCode", e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="If applicable"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={form.linkedIn}
                onChange={(e) => handleChange("linkedIn", e.target.value)}
                className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans"
                style={{ fontSize: '0.9rem' }}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            {/* Statement */}
            <div>
              <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                Brief Statement <span className="text-warm-gray/30">(Optional)</span>
              </label>
              <textarea
                value={form.statement}
                onChange={(e) => handleChange("statement", e.target.value)}
                rows={3}
                className="w-full bg-transparent border-b border-border/60 focus:border-gold/60 pb-3 text-warm-white outline-none transition-colors font-sans resize-none"
                style={{ fontSize: '0.9rem' }}
                placeholder="Why you are seeking access"
              />
            </div>

            {/* Disclaimer */}
            <div className="pt-4 border-t border-border/20">
              <p className="text-warm-gray/40 font-sans mb-8" style={{ fontSize: '0.7rem', lineHeight: 1.7 }}>
                By submitting this application, you acknowledge that membership is subject to approval at our sole discretion. 
                All information provided will be treated with strict confidentiality.
              </p>

              <button
                type="submit"
                className="w-full border border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/70 transition-all duration-500 py-4 tracking-[0.2em]"
                style={{ fontSize: '0.7rem' }}
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}