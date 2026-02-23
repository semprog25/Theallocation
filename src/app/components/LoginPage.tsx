import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, ShieldCheck } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ndaAgreed, setNdaAgreed] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ndaAgreed) {
      setStep("2fa");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8">
        <Link to="/" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {step === "credentials" ? (
            <>
              <div className="text-center mb-12">
                <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-4 h-4 text-gold/60" />
                </div>
                <h2 className="font-serif text-warm-white mb-2" style={{ fontSize: '1.5rem' }}>
                  Secure Login
                </h2>
                <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                  Members portal access
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-charcoal border border-border/40 focus:border-gold/40 px-4 py-3 text-warm-white outline-none transition-colors font-sans rounded-sm"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-warm-gray/60" style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-charcoal border border-border/40 focus:border-gold/40 px-4 py-3 text-warm-white outline-none transition-colors font-sans rounded-sm"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                {/* NDA Checkbox */}
                <div className="pt-4 border-t border-border/20">
                  <label className="flex items-start gap-3 cursor-pointer" style={{ textTransform: 'none' }}>
                    <div className="mt-0.5">
                      <input
                        type="checkbox"
                        checked={ndaAgreed}
                        onChange={(e) => setNdaAgreed(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-all ${ndaAgreed ? 'border-gold bg-gold/10' : 'border-border/60'}`}>
                        {ndaAgreed && <div className="w-2 h-2 bg-gold rounded-sm" />}
                      </div>
                    </div>
                    <span className="text-warm-gray/60 font-sans" style={{ fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.01em' }}>
                      I acknowledge the Non-Disclosure Agreement and confirm that all allocation information 
                      accessed through this portal is strictly confidential.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!ndaAgreed}
                  className={`w-full border py-4 tracking-[0.2em] transition-all duration-500 ${
                    ndaAgreed
                      ? 'border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/70'
                      : 'border-border/20 text-warm-gray/30 cursor-not-allowed'
                  }`}
                  style={{ fontSize: '0.7rem' }}
                >
                  Continue
                </button>

                {/* Temporary skip for testing */}
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full mt-3 py-3 text-warm-gray/30 hover:text-warm-gray/50 transition-colors font-sans tracking-[0.1em] border border-dashed border-border/20 hover:border-border/40 rounded-sm"
                  style={{ fontSize: '0.6rem' }}
                >
                  SKIP — TESTING ONLY
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-4 h-4 text-gold/60" />
                </div>
                <h2 className="font-serif text-warm-white mb-2" style={{ fontSize: '1.5rem' }}>
                  Two-Factor Verification
                </h2>
                <p className="text-warm-gray/50 font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                  Enter the code sent to your device
                </p>
              </div>

              <form onSubmit={handleVerify}>
                <div className="flex justify-center gap-3 mb-10">
                  {otpCode.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-11 h-13 bg-charcoal border border-border/40 focus:border-gold/40 text-center text-warm-white outline-none transition-colors font-sans rounded-sm"
                      style={{ fontSize: '1.1rem', letterSpacing: '0' }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full border border-gold/40 text-gold hover:bg-gold/5 hover:border-gold/70 transition-all duration-500 py-4 tracking-[0.2em]"
                  style={{ fontSize: '0.7rem' }}
                >
                  Verify & Enter
                </button>

                <p className="text-center mt-6">
                  <button
                    type="button"
                    className="text-warm-gray/40 hover:text-warm-gray/60 transition-colors font-sans tracking-normal"
                    style={{ fontSize: '0.72rem', textTransform: 'none' }}
                  >
                    Resend code
                  </button>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-6 text-center">
        <p className="text-warm-gray/20 font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
          256-bit encryption &middot; SOC 2 compliant &middot; Zero-knowledge architecture
        </p>
      </footer>
    </div>
  );
}