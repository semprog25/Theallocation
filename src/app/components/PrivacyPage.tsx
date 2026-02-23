import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8">
        <Link to="/" className="font-serif tracking-[0.3em] text-warm-white" style={{ fontSize: '0.75rem' }}>
          THE ALLOCATION
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-warm-gray/50 hover:text-warm-white transition-colors"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 px-8 md:px-16 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-8 h-px bg-gold/40 mb-10" />

          <h1 className="font-serif text-warm-white mb-3" style={{ fontSize: '2rem' }}>
            Privacy Policy
          </h1>
          <p className="text-warm-gray/40 font-sans mb-16" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            Last updated: February 23, 2026
          </p>

          <div className="space-y-12">
            <Section title="1. Our Commitment">
              The Allocation is built on a foundation of discretion. We recognize that our members value privacy 
              as highly as the allocations themselves. This Privacy Policy outlines how we collect, use, protect, 
              and — in limited circumstances — share your personal information. We operate under the principle of 
              minimal data collection: we gather only what is essential to deliver the service.
            </Section>

            <Section title="2. Information We Collect">
              <span className="block mb-3">We collect the following categories of information:</span>
              <span className="block mb-2"><span className="text-warm-white/60">Identity Data</span> — Full name, professional title, and industry affiliation as provided during application.</span>
              <span className="block mb-2"><span className="text-warm-white/60">Contact Data</span> — Email address, phone number, and preferred communication channel.</span>
              <span className="block mb-2"><span className="text-warm-white/60">Verification Data</span> — Referral codes, LinkedIn profile references, and financial eligibility indicators submitted during the vetting process.</span>
              <span className="block mb-2"><span className="text-warm-white/60">Transaction Data</span> — Bid history, successful allocations, payment confirmations, and settlement records.</span>
              <span className="block"><span className="text-warm-white/60">Technical Data</span> — Device identifiers, IP addresses, browser type, session duration, and access timestamps collected automatically for security purposes.</span>
            </Section>

            <Section title="3. How We Use Your Information">
              Your information is used exclusively for: membership verification and onboarding; delivery of allocation 
              notifications and auction access; transaction processing and settlement; platform security, fraud prevention, 
              and abuse detection; compliance with legal and regulatory obligations; and aggregate, anonymized analytics to 
              improve the allocation experience. We do not use your data for marketing purposes, nor do we sell, rent, or 
              trade member information to third parties under any circumstances.
            </Section>

            <Section title="4. Data Protection">
              All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. Our infrastructure 
              operates within SOC 2 Type II certified environments. Access to member data is restricted to authorized 
              personnel on a strict need-to-know basis, governed by multi-factor authentication and comprehensive audit 
              logging. We conduct regular penetration testing and security audits through independent third-party firms.
            </Section>

            <Section title="5. Data Retention">
              Active member data is retained for the duration of membership. Upon membership termination — whether voluntary 
              or involuntary — personal data is retained for a period of 90 days to facilitate any outstanding transactions 
              or disputes, after which it is permanently and irreversibly deleted from all systems, including backups. 
              Transaction records required for regulatory compliance may be retained in anonymized form.
            </Section>

            <Section title="6. Third-Party Sharing">
              We do not share member data with third parties except in the following limited circumstances: when required 
              by law, regulation, or valid legal process; with payment processors necessary to complete transactions (limited 
              to transaction-specific data only); and with security providers engaged to protect the Platform. All third-party 
              providers are bound by confidentiality agreements no less restrictive than this Policy.
            </Section>

            <Section title="7. Your Rights">
              Members have the right to: access a complete record of all personal data held; request correction of inaccurate 
              information; request deletion of personal data (subject to retention obligations); withdraw consent for optional 
              data processing activities; and receive a portable copy of personal data in a structured, machine-readable format. 
              To exercise any of these rights, contact your designated membership concierge.
            </Section>

            <Section title="8. Cookies & Tracking">
              The Platform uses only essential, first-party cookies required for session management, authentication, and 
              security. We do not employ third-party tracking cookies, advertising pixels, or behavioral analytics tools. 
              No data is shared with advertising networks or data brokers.
            </Section>

            <Section title="9. International Transfers">
              Member data may be processed in jurisdictions outside your country of residence. In such cases, we ensure that 
              appropriate safeguards are in place, including standard contractual clauses and adequacy assessments consistent 
              with applicable data protection frameworks.
            </Section>

            <Section title="10. Policy Updates">
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. Members 
              will be notified of material changes through the Platform's secure messaging system no fewer than 30 days prior 
              to the effective date. Continued use of the Platform constitutes acceptance of the updated Policy.
            </Section>
          </div>

          <div className="mt-20 pt-10 border-t border-border/20">
            <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', lineHeight: 1.8, letterSpacing: '0.02em' }}>
              For privacy inquiries, data access requests, or concerns, contact our Data Protection Officer 
              at privacy@theallocation.com.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-warm-white mb-4" style={{ fontSize: '0.95rem' }}>
        {title}
      </h3>
      <div className="text-warm-gray/50 font-sans" style={{ fontSize: '0.8rem', lineHeight: 1.9, letterSpacing: '0.01em' }}>
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-8 md:px-16 py-8 border-t border-border/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-warm-gray/30 font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
          &copy; 2026 The Allocation. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link to="/terms" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Terms
          </Link>
          <Link to="/privacy" className="text-warm-white/50 font-sans hover:text-warm-white transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Privacy
          </Link>
          <Link to="/confidentiality" className="text-warm-gray/30 font-sans hover:text-warm-gray/50 transition-colors" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
            Confidentiality
          </Link>
        </div>
      </div>
    </footer>
  );
}
